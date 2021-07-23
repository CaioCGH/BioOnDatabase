<template>
  <div>
    <form v-for="localityWrapper in localitiesWrapper" :key="localityWrapper.id">
      <b-form-select
        v-model="localityWrapper.chosenLocality"
        :options="localities"
        @change="update"
      ></b-form-select>
    </form>
    <div class="mb-4 mt-2" >
    <b-button
        @click="localitiesWrapper.push({chosenLocality: ''})"
        variant="success"
        class="mr-2"
      >
        <span>Adicionar mais um local</span>
      </b-button>
      <b-button
        @click="localitiesWrapper.pop(); update()"
        variant="danger"
        class="mr-2"
      >
        <span v-show="!loading">Remover local</span>
      </b-button>
</div>
    <div class="mb-4 mt-2" >
      
      <b-button
        @click="bioOnlineSearchAnimalsInLocalities()"
        variant="primary"
        class="mr-2"
        :disabled="localitiesWrapper.length < 1 || localitiesWrapper[0].chosenLocality == ''"
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

      <b-button
        v-b-modal="'modalId'"
        class="mr-2"
        :disabled="localitiesWrapper.length < 1 || localitiesWrapper[0].chosenLocality == ''"
      >
        <span v-show="!loading">Baixar lista</span>
        <b-spinner
          v-show="loadingDownload"
          small
          variant="primary"
          label="Spinning"
        ></b-spinner>
        <span v-show="loading">Aguarde, carregando</span>
      </b-button>

      <b-button @click="clearForms()" variant="outline-secondary" class="mr-2">
        <span v-show="!loading">Limpar campos</span>
      </b-button>
    </div>
  </div>
</template>

<script>
import {
  bioOnlineSearchAnimalsInLocalities,
  getBioOnlineLocalities,
  downLoadList,
} from "./BioOnlineService";


export default {
  components: {
  },
  data() {
    return {
      localities: [{ value: "", text: "Localidade" }],
      result: false,
      loading: false,
      loadingDownload: false,
      timesOpened: 0
    };
  },
  created() {
    this.feedBioOnlineLocalities();
  },
  methods: {
    bioOnlineSearchAnimalsInLocalities() {
      this.loading = true;
      var chosenLocalities = [];
      for(let i = 0; i < this.localitiesWrapper.length; i++){
chosenLocalities.push(this.localitiesWrapper[i].chosenLocality);
      }
      const payload = {
        localities: chosenLocalities,
      };
        console.log("payload")
        console.log(payload)
      bioOnlineSearchAnimalsInLocalities(payload).then((value) => {
        this.animalRows = value;
        this.result = true;
        this.loading = false;
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
        console.log("value");
        value;
        console.log(value);
        this.result = true;
        this.loading = false;
      });
    },
    feedBioOnlineLocalities() {
      getBioOnlineLocalities().then((value) => {
        console.log(value);
        this.localities.push(...value.localities);
      });
    },
    clearForms() {
      this.$store.state.localitiesWrapper = [{chosenLocality: ''}];
      this.$store.commit("updateAnimalRows", []);
    },
    update() {
      this.$store.commit("updateSelectedArrayOnLocalities", this.localities);
      console.log("updating...");
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