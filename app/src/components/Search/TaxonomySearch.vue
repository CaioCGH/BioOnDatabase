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
      <b-button @click="search()" class="search mr-2" :disabled="loading">
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
  components: {},
  data() {
    return {
      namesOnLeaves: [],
      pristineTaxonomyLevels: [
        {
          name: "Filo",
          options: [{ value: "Filo", text: "Filo", disabled: true }],
          chosenName: "Filo",
        },
        {
          name: "Classe",
          options: [{ value: "Classe", text: "Classe", disabled: true }],
          chosenName: "Classe",
        },
        {
          name: "Ordem",
          options: [{ value: "Ordem", text: "Ordem", disabled: true }],
          chosenName: "Ordem",
        },
        {
          name: "Família",
          options: [{ value: "Família", text: "Família", disabled: true }],
          chosenName: "Família",
        },
        {
          name: "Gênero",
          options: [{ value: "Gênero", text: "Gênero", disabled: true }],
          chosenName: "Gênero",
        },
        {
          name: "Espécie",
          options: [{ value: "Espécie", text: "Espécie", disabled: true }],
          chosenName: "Espécie",
        },
      ],
      taxonomyLevels: [],
      loadingGlobalTree: true,
      loading: false,
    };
  },
  methods: {
    clearForms() {
      this.feed();
      this.taxonomyLevels = JSON.parse(
        JSON.stringify(this.pristineTaxonomyLevels)
      );
    },
    update(chosenName, name) {
      this.$store.state.globalTree = Tree.findNode(
        chosenName,
        this.$store.state.globalTree
      );
      for (let i = 0; i < this.taxonomyLevels.length; i++) {
        if (this.taxonomyLevels[i].name == name) {
          for (let j = i + 1; j < this.taxonomyLevels.length; j++) {
            this.taxonomyLevels[j].options = [
              {
                value: this.taxonomyLevels[j].name,
                text: this.taxonomyLevels[j].name,
                disabled: true,
              },
            ];

            var nodes = Tree.findNodesOfLevel(
              this.taxonomyLevels[j].name,
              this.$store.state.globalTree
            );

            var options = nodes.map((x) => ({
              value: x.name,
              text: x.name,
              disabled: false,
            }));
            this.taxonomyLevels[j].options.push(...options);
          }
        }
      }
      this.namesOnLeaves = Tree.findScientificNamesOnLeaves(
        this.$store.state.globalTree
      );
    },
    feed() {
      getTaxonomyTree().then((value) => {
        this.$store.state.globalTree = value;
        for (let i = 0; i < this.taxonomyLevels.length; i++) {
          var options = Tree.findNodesOfLevel(
            this.taxonomyLevels[i].name,
            value
          ).map((x) => ({
            value: x.name,
            text: x.name,
            disabled: false,
          }));
          this.taxonomyLevels[i].options.push(...options);
        }
      });
    },
    search() {
      this.loading = true;
      var chosenLocalities = ["Tudo"];
      // for (let i = 0; i < this.localitiesWrapper.length; i++) {
      //   chosenLocalities.push(this.localitiesWrapper[i].chosenLocality);
      // }
      var thisSearchFilters = [];
      for (let i = 0; i < this.pristineTaxonomyLevels.length; i++) {
        console.log("ha", this.taxonomyLevels[i]);
        console.log(
          "ha",
          this.taxonomyLevels[i].name,
          this.taxonomyLevels[i].chosenName
        );
        if (this.taxonomyLevels[i].name !== this.taxonomyLevels[i].chosenName) {
          // const filterFieldName = "Taxonomia." + this.taxonomyLevels[i].name;
          const filter = {
            selectedKey: "Taxonomia." + this.taxonomyLevels[i].name,
            selectedValue: this.taxonomyLevels[i].chosenName,
          };
          // filter[selectedValue] = this.taxonomyLevels[i].chosenName;
          thisSearchFilters.push(filter);
        }
      }
      console.log(thisSearchFilters);
      const payload = {
        localities: chosenLocalities,
        filters: thisSearchFilters,
        filterCompositionType: "AND",
      };
      bioOnlineSearchAnimalsInLocalities(payload).then((value) => {
        value.forEach(
          (a) =>
            (a["Número de Localidades com Registro"] =
              a["Observações Registradas"].length)
        );

        this.$store.state.animalRows = value.sort((a, b) => {
          return a["Index"] - b["Index"];
        });
        this.result = true;
        this.loading = false;
        this.$store.state.hasSearched = true;
      });
    },
  },
  created() {
    this.taxonomyLevels = JSON.parse(
      JSON.stringify(this.pristineTaxonomyLevels)
    );
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