<template>
  <div class="container">
        <SearchSourcesDescription :description="description"/>

    <div class="row">
        <p>Observações nos últimos 30 dias.</p>
        <p>Apenas nomes científicos. Tente:</p>
         <div class="col-md-7 mrgnbtm">
        <ul v-for="example in examples" :key="example.id">
          <li @click='pasteToForm(example)'>{{ example }}</li>
        </ul>
        </div>
        <div class="col-md-7 mrgnbtm">
            <form>
                <div class="row">
                    <div class="form-group col-md-9">
                        Nome científico
                        <input type="text" class="form-control" v-model="scientificName" name="wikiavesSearchTerm" aria-describedby="emailHelp" placeholder="buscar no Ebird" />
                        <input v-show="false">
                    </div>
                </div>
                <button type="button" :disabled="scientificName.length == 0" @click='ebirdSearch()' class="btn btn-danger mb-3">
                     <span v-show="!loading">Pesquisar</span>
                    <b-spinner v-show="loading" small variant="primary" label="Spinning"></b-spinner>
                    <span v-show="loading">Aguarde, carregando</span>
                </button>
            </form>
        </div>
        <div v-if="hasSearched && observationDataList.errors  == undefined">
            <EbirdObservations :observationDataList="observationDataList" />
        </div>

        <div v-else-if="observationDataList.errors != undefined && observationDataList.errors.length > 0">
            <div class="card border-primary mb-3 mt-3" >
                <div class="card-body text-primary">
                      Nenhum resultado encontrado para a busca
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>

import { ebirdSearch } from './EbirdService'
import { BSpinner } from 'bootstrap-vue'
import EbirdObservations from './EbirdObservations.vue'
import SearchSourcesDescription from '../SearchSourcesDescription.vue'



export default {
  components:{
      EbirdObservations,SearchSourcesDescription,
      BSpinner
  },
  data() {
    return {
        description: "<a href=\"https://ebird.org/\">eBird</a> is the world’s largest biodiversity-related citizen science project, with more than 100 million bird sightings contributed each year by eBirders around the world. A collaborative enterprise with hundreds of partner organizations, thousands of regional experts, and hundreds of thousands of users, eBird is managed by the Cornell Lab of Ornithology.",
      scientificName: '',
      observationDataList: [],
      hasSearched: false,
      loading: false,
      emptyForm: true,
      examples:['Procnias nudicollis',
          'Cariama cristata',
          'Eudocimus ruber']
    }
  },
    methods: {
        ebirdSearch(){
            this.loading = true;
            console.log(this.scientificName);
            const payload = {
                scientificName: this.scientificName
            }
            ebirdSearch(payload).then(
                (value) => {
                    console.log(value);
                    this.observationDataList = value;
                    this.hasSearched = true;
                    this.loading = false;
                })
        },
        pasteToForm(example){
            this.scientificName = example;
        }
    }
}
</script>