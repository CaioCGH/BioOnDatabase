<template>
  <div>
    <h3>Busca por Informações Biológicas e Estado de Conservação</h3>
    <form
      v-for="localityWrapper in localitiesWrapper"
      :key="localityWrapper.id"
    >
      <b-form-select
        v-model="localityWrapper.chosenLocality"
        :options="localities"
        @change="update"
      ></b-form-select>
    </form>
    <div class="mb-4 mt-2">
      <b-button
        @click="localitiesWrapper.push({ chosenLocality: '' })"
        class="clear mr-2 mb-2"
      >
        <span>Adicionar local</span>
      </b-button>
      <b-button
        @click="
          localitiesWrapper.pop();
          update();
        "
        class="clear mr-2 mb-2"
      >
      <b-spinner
          v-show="loading"
          small
          variant="primary"
          label="Spinning"
        ></b-spinner>
        <span v-show="loading">Aguarde, carregando</span>
        <span v-show="!loading">Remover local</span>
      </b-button>
    </div>
    <div class="mb-4 mt-2">
      

      <!-- <b-button
        v-b-modal="'modalId'"
        class="clear mr-2 mb-2"
        :disabled="
          localitiesWrapper.length < 1 ||
          localitiesWrapper[0].chosenLocality == ''
        "
      >
        <span v-show="!loading">Baixar lista</span>
        <b-spinner
          v-show="loading"
          small
          variant="primary"
          label="Spinning"
        ></b-spinner>
        <span v-show="loading">Aguarde, carregando</span>
      </b-button> -->

      <b-button @click="clearForms()" class="clear mr-2 mb-2">
        <span v-show="!loading">Limpar campos</span>
        <b-spinner
          v-show="loading"
          small
          variant="primary"
          label="Spinning"
        ></b-spinner>
        <span v-show="loading">Aguarde, carregando</span>
      </b-button>
      <b-button
        @click="bioOnlineSearchAnimalsInLocalities()"
        class="search mr-2 mb-2"
        :disabled="
          localitiesWrapper.length < 1 ||
          localitiesWrapper[0].chosenLocality == ''
        "
      >
        <span v-show="!loading">Pesquisar</span>
        <b-spinner
          v-show="loading"
          small
          variant="primary"
          label="Spinning"
        ></b-spinner>
        <span v-show="loading">Aguarde, carregando</span>
      </b-button>
    </div>
  </div>
</template>

<script>
import {
  bioOnlineSearchAnimalsInLocalities,
  getBioOnlineLocalities,
  downLoadList,
} from "../BioOnline/BioOnlineService";

export default {
  components: {},
  data() {
    return {
      localities: [{ value: "", text: "Localidade" }],
      result: false,
      loading: false,
      loadingDownload: false,
      loadingRefresh: false,
      timesOpened: 0,
      afterAWhile: false
    };
  },
  created() {
    this.feedBioOnlineLocalities();
  },
  methods: {
    bioOnlineSearchAnimalsInLocalities() {
      this.loading = true;
      var chosenLocalities = [];
      for (let i = 0; i < this.localitiesWrapper.length; i++) {
        chosenLocalities.push(this.localitiesWrapper[i].chosenLocality);
      }
      const payload = {
        localities: chosenLocalities,
        filters: this.$store.state.selectedFilters,
        filterCompositionType: this.$store.state.filterCompositionType
      };
      bioOnlineSearchAnimalsInLocalities(payload).then((value) => {
        console.log(value[0]);
        value.forEach(a => a["Número de Localidades com Registro"] = a["Observações Registradas"].length)

        this.animalRows = value
        .sort((a,b) => {
        return a['Index'] - b['Index']});
        this.result = true;
        this.loading = false;
        this.$store.state.hasSearched=true;
      });
    },
    downLoadList() {
      this.loadingDownload = true;

      const payload = {
        genus: this.chosenGenus.trim(),
        species: this.chosenSpecies.trim(),
        commonName: this.chosenCommonName.trim(),
      };
      downLoadList(payload).then((value) => {
        value;
        this.result = true;
        this.loading = false;
      });
    },
    feedBioOnlineLocalities() {
      this.loadingRefresh = true;
      
      getBioOnlineLocalities().then((value) => {
        this.localities.push(...value);
        this.loadingRefresh = false;
        this.afterAWhile = false;
      });
      setTimeout(() => {
        if(this.localities.length < 10 ){
          this.afterAWhile = true;
        }
      }, 5000);
    },
    clearForms() {
      this.$store.state.localitiesWrapper = [{ chosenLocality: "" }];
      this.$store.commit("updateAnimalRows", []);
    },
    update() {
      this.$store.commit("updateSelectedArrayOnLocalities", this.localities);
    },
  },
  computed: {
    displayType: {
      get() {
        return this.$store.state.displayType;
      },
      set(value) {
        this.$store.commit("updateDisplayType", value);
      },
    },
    animalRows: {
      get() {
        return this.$store.state.animalRows;
      },
      set(value) {
        this.$store.commit("updateAnimalRows", value);
      },
    },
    localitiesWrapper: {
      get() {
        return this.$store.state.localitiesWrapper;
      },
      set(value) {
        this.$store.commit("updateLocalitiesWrapper", value);
      },
    },
  },
};
</script>

<style>
p {
  font-size: 130% !important;
  color: dimgray;
}

h3 {
  color: peru !important;
  font-weight: bold;
}

.list-group .list-group-item {
  background-color: blanchedalmond;
  border: 0px;
}

.number {
  color: peru !important;
  font-weight: bold;
  font-size: 100%;
}
/* .list-group .list-group-item:hover {
  background-color: red;
} */

.search {
  background-color: peru !important;
  color: dimgray;
  border-color: peru;
}
.clear {
  background-color: blanchedalmond !important;
  color: dimgray;
  border-color: peru;
}
</style>