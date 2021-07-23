<template>
<div>
        <form>
            <div >
                <div class="w-25">
                    <b-form-select v-model="chosenGenus" :options="genera"  @change="update"></b-form-select>
                    <b-form-select v-model="chosenSpecies" :options="speciesList" @change="update"></b-form-select>
                    Ou
                    <b-form-select v-model="chosenCommonName" :options="commonNames"></b-form-select>
                </div>
                    <b-spinner
          v-show="loadingSelectables"
          small
          variant="primary"
          label="Spinning"
        ></b-spinner>
            </div>

          <div class="mb-4 mt-2">
            <b-button
            @click='searchAnimal()'
            variant="primary" class="mr-2" 
            :disabled="chosenGenus == '' && chosenCommonName == ''">
                <span v-show="!loading">Pesquisar</span>
                <b-spinner v-show="loading" small variant="primary" label="Spinning"></b-spinner>
                <span v-show="loading">Aguarde, carregando</span>
            </b-button>
            
            <b-button
            @click='clearForms()'
            variant="outline-secondary" class="mr-2">
                <span v-show="!loading">Limpar campos</span>
            </b-button>
            </div>
        </form>
    </div>
</template>

<script>
import { searchAnimal, getGeneraSpeciesCommonName } from "./BioOnlineService";

export default {
  components: {
  },
  data() {
    return {
      genus: null,
      species: null,
      commonName: null,
      result: false,
      loading: false,
      loadingDownload: false,
      loadingSelectables: true,
      chosenGenus: "",
      chosenSpecies: "",
      chosenCommonName: "",
      generaSpeciesDict: {},
      genera: [{ value: "", text: "Gênero" }],
      speciesList: [{ value: "", text: "Espécie" }],
      commonNames: [{ value: "", text: "Nome comum" }],
    };
  },
  created() {
    this.feedGeneraSpeciesCommonNameDropdown();
  },
  methods: {
    searchAnimal() {
      this.loading = true;

      const payload = {
        genus: this.chosenGenus.trim(),
        species: this.chosenSpecies.trim(),
        commonName: this.chosenCommonName.trim(),
      };
      searchAnimal(payload).then((value) => {
        this.$store.state.animalRows = value;
        this.result = true;
        this.loading = false;
      });
    },
    feedGeneraSpeciesCommonNameDropdown() {
      getGeneraSpeciesCommonName().then((value) => {
        console.log(value);
        this.generaSpeciesDict = value.generaSpeciesDict;

        const genera = Object.keys(value.generaSpeciesDict);
        for (let i = 0; i < genera.length; i++) {
          this.genera.push({ text: genera[i], value: genera[i]  });
        }
        for (let i = 0; i < value.commonNames.length; i++) {
          this.commonNames.push({ text: value.commonNames[i], value: value.commonNames[i] });
        }

        this.loadingSelectables = false;
      });
    },
    update() {
      this.speciesList = this.generaSpeciesDict[this.chosenGenus];
      this.chosenSpecies = this.speciesList[0];
    },
    clearForms() {
      this.chosenGenus = "";
      this.chosenSpecies = "";
      this.chosenCommonName = "";
      this.speciesList =  [{ value: "", text: "Espécie" }];
      this.$store.state.animalRows = [];
    },
  },
};
</script>