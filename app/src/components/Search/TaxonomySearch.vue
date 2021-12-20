<template>
  <div>
    <h3>Busca por Espécie</h3>
    <b-form-group
      id="input-group-1"
      label-for="input-1"
      v-for="taxonomyLevel in taxonomyLevels"
      :key="taxonomyLevel.id"
    >
      <b-form-select
        id="input-1"
        :placeholder="taxonomyLevel.name"
        :options="taxonomyLevel.options"
        v-model="taxonomyLevel.chosenName"
        @change="update(taxonomyLevel.chosenName, taxonomyLevel.name)"
      ></b-form-select>
    </b-form-group>
    <div class="mb-4 mt-2">
      <b-button class="clear mr-2" @click="clearForms()">
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
        class="search mr-2"
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
import { bioOnlineSearchAnimalsInLocalities } from "../BioOnline/BioOnlineService";
import { getTaxonomyTree } from "../BioOnline/BioOnlineService";

import Tree from "../BioOnline/TreeUtils";

export default {
  data() {
    return {
      taxonomyLevels: [
        {
          name: "Filo",
          options: [],
        },
        {
          name: "Classe",
          options: [],
        },
        {
          name: "Ordem",
          options: [],
        },
        {
          name: "Família",
          options: [],
        },
        {
          name: "Gênero",
          options: [],
        },
        {
          name: "Espécie",
          options: [],
        },
      ],
      loadingGlobalTree: true,
      tree: {},
      loading: false,
    };
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
        filterCompositionType: this.$store.state.filterCompositionType,
      };
      bioOnlineSearchAnimalsInLocalities(payload).then((value) => {
        console.log(value[0]);
        value.forEach(
          (a) =>
            (a["Número de Localidades com Registro"] =
              a["Observações Registradas"].length)
        );

        this.animalRows = value.sort((a, b) => {
          return a["Index"] - b["Index"];
        });
        this.result = true;
        this.loading = false;
        this.$store.state.hasSearched = true;
      });
    },
    update(chosenName, name) {
      for (let i = 0; i < this.taxonomyLevels.length; i++) {
        if (this.taxonomyLevels[i].name == name) {
          for (let j = i; j < this.taxonomyLevels.length; j++) {
            var newRoot;
            // newRoot = Tree.findNodesOfLevelAndName(
            //   this.taxonomyLevels[j].name,
            //   chosenName,
            //   this.tree
            // )[0];
            console.log("newRoot", newRoot);
            // if(newRoot)throw "stop"
            this.taxonomyLevels[j].options = Tree.findNodesOfLevel(
              this.taxonomyLevels[j].name,
              newRoot ? newRoot : this.tree
            ).map((x) => x.name);
          }
        }
      }
    },
    feed() {
      getTaxonomyTree().then((value) => {
        this.tree = value;
        for (let i = 0; i < this.taxonomyLevels.length; i++) {
          this.taxonomyLevels[i].options = Tree.findNodesOfLevel(
            this.taxonomyLevels[i].name,
            this.tree
          ).map((x) => x.name);
          //   console.log(this.taxonomyLevels[i].options);
        }
      });
    },
  },
  created() {
    this.feed();
  },
  computed: {
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