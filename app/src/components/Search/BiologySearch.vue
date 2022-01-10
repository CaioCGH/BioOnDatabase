<template>
  <div>
    <h3>Busca por Informações Biológicas e Estado de Conservação</h3>
    <div v-for="selector in selectors" :key="selector.id">
      <b-row>
        <b-col>
          <!-- {{localBioFilterKeys}} -->
          <b-form-select
            v-model="selector.selectedKey"
            :options="Object.keys(localBioFilterKeys)"
          ></b-form-select>
        </b-col>
        <b-col>
          <b-form-select
            v-if="selector.selectedKey"
            v-model="selector.selectedValue"
            @change="updateFilterDictOnAdd(selector)"
            :options="localBioFilterKeys[selector.selectedKey]['domain']"
          ></b-form-select>
        </b-col>
      </b-row>
    </div>
    <div class="mb-4 mt-2">
      <b-row>
      <b-button
        @click="selectors.push({ selectedKey: 'Tipologia' })"
        class="clear mr-2 mb-2"
        :disabled="loading"
      >
        <span>Adicionar filtro</span>
      </b-button>
      <b-button
        @click="
          var removed = selectors.pop();
          updateFilterDictOnRemoval(removed);
        "
        class="clear mr-2 mb-2"
        :disabled="loading"
      >
        <span v-show="!loading">Remover filtro</span>
      </b-button>
      </b-row>

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
import { getBioOnlineFilterDict } from "../BioOnline/BioOnlineService";

import Tree from "../BioOnline/TreeUtils";

export default {
  components: {},
  data() {
    return {
      localBioFilterKeys: {
        Tipologia: { selected: [], domain: ["Categoria"] },
      },
      selectors: [{ selectedKey: "Tipologia", selectedValue: "Categoria" }],
      loading: false,
    };
  },
  methods: {
    clearForms() {
      this.feed();
      this.filterList = JSON.parse(JSON.stringify(this.pristinefilterList));
    },
    update(chosenName, name) {
      this.$store.state.globalTree = Tree.findNode(
        chosenName,
        this.$store.state.globalTree
      );
      for (let i = 0; i < this.filterList.length; i++) {
        if (this.filterList[i].name == name) {
          for (let j = i + 1; j < this.filterList.length; j++) {
            this.filterList[j].options = [
              {
                value: this.filterList[j].name,
                text: this.filterList[j].name,
                disabled: true,
              },
            ];

            var nodes = Tree.findNodesOfLevel(
              this.filterList[j].name,
              this.$store.state.globalTree
            );

            var options = nodes.map((x) => ({
              value: x.name,
              text: x.name,
              disabled: false,
            }));
            this.filterList[j].options.push(...options);
          }
        }
      }
      this.namesOnLeaves = Tree.findScientificNamesOnLeaves(
        this.$store.state.globalTree
      );
    },
    search() {
      this.loading = true;
      var chosenLocalities = ["Tudo"];
      // for (let i = 0; i < this.localitiesWrapper.length; i++) {
      //   chosenLocalities.push(this.localitiesWrapper[i].chosenLocality);
      // }
      // var thisSearchFilters = [];
      // for (let i = 0; i < this.pristinefilterList.length; i++) {
      //   if (this.filterList[i].name !== this.filterList[i].chosenName) {
      //     // const filterFieldName = "Taxonomia." + this.filterList[i].name;
      //     const filter = {
      //       selectedKey: "Taxonomia." + this.filterList[i].name,
      //       selectedValue: this.filterList[i].chosenName,
      //     };
      //     // filter[selectedValue] = this.filterList[i].chosenName;
      //   }
      //     thisSearchFilters.push(filter);
      // }
      const payload = {
        localities: chosenLocalities,
        filters: this.$store.state.selectedFilters,
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
    feedCompleteOptions() {
      getBioOnlineFilterDict().then((value) => {
        const bioKeys = Object.keys(value["Biologia"]);
        for (let i = 0; i < bioKeys.length; i++) {
          this.localBioFilterKeys[bioKeys[i]] = value["Biologia"][bioKeys[i]];
           this.localBioFilterKeys[bioKeys[i]]['category'] = "Biologia";
        }
        const consKeys = Object.keys(value["Estado de Conservação"]);
        for (let i = 0; i < consKeys.length; i++) {
          this.localBioFilterKeys[consKeys[i]] =
            value["Estado de Conservação"][consKeys[i]];
            this.localBioFilterKeys[consKeys[i]]['category'] = "Estado de Conservação";

        }

        console.log(this.localBioFilterKeys);
        const stuff = JSON.parse( JSON.stringify(this.localBioFilterKeys));
        this.localBioFilterKeys = stuff;
        this.$store.state.bioFilterKeys = this.localBioFilterKeys;
        // const stuff = Object.keys(this.$store.state.bioFilterKeys)
        //  for (let i = 0; i < stuff.length; i++) {
        //    console.log(this.$store.state.bioFilterKey[stuff[i]], this.$store.state.bioFilterKey[stuff[i]]['domain']);
        //  }
      });
    },
    updateFilterDictOnRemoval(removedSelector) {
      removedSelector;
      this.$store.state.selectedFilters.pop();
    },
    updateFilterDictOnAdd(selector) {
      var newSelector = { selectedKey: this.localBioFilterKeys[selector.selectedKey]['category'] + '.' + selector.selectedKey, selectedValue: selector.selectedValue};
      this.$store.state.selectedFilters.push(newSelector);
    },
  },
  created() {
    this.feedCompleteOptions();
    this.loadingColumns = false;
    // this.filterList = JSON.parse(
    //   JSON.stringify(this.pristinefilterList)
    // );
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
    bioFilterKeys: {
      get() {
        return this.$store.state.bioFilterKeys;
      },
    },
    conservationStatusDict: {
      get() {
        return this.$store.state.conservationStatusDict;
      },
    },
    filterCompositionType: {
      get() {
        return this.$store.state.filterCompositionType;
      },
      set(value) {
        this.$store.commit("updatefilterCompositionType", value);
      },
    },
    selectedFilters: {
      get() {
        return this.$store.state.selectedFilters;
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