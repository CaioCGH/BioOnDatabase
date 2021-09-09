<template>
  <div class="container">
    <SearchSourcesDescription :description="description"/>
    <b-card-group deck>
    <BioOnlineReturnedElementsSelection />
    <BioOnlineFilter />
    <ResultFormatSelector />
    </b-card-group>
    <b-tabs   content-class="mt-4">
        <b-tab title="Busca espécie" ><BioOnlineSpeciesSearch/><SelectDataFormat /></b-tab>
        <b-tab title="Busca local" active><BioOnlineLocalitySearch /></b-tab>
    </b-tabs>
    <AnimalRows />
    <BioOnlineTableRows  :rows="animalRows" :key="Date.now()"/>
    <TaxonomyTreeSearch  :rows="animalRows" :key="Date.now() + 1"/>
  </div>
</template>

<script>


import BioOnlineSpeciesSearch from './BioOnlineSpeciesSearch.vue'
import BioOnlineLocalitySearch from './BioOnlineLocalitySearch.vue'
import TaxonomyTreeSearch from './TaxonomyTreeSearch.vue'
import SearchSourcesDescription from '../SearchSourcesDescription.vue'
import AnimalRows from './AnimalRows.vue'
import BioOnlineTableRows from './BioOnlineTableRows.vue'
import BioOnlineReturnedElementsSelection from './BioOnlineReturnedElementsSelection.vue'
import ResultFormatSelector from './ResultFormatSelector.vue'
import SelectDataFormat from "./SelectDataFormat.vue";
import BioOnlineFilter from "./BioOnlineFilter.vue";



export default {
  name: 'SearchAnimal',
  components:{
      BioOnlineSpeciesSearch,
      BioOnlineLocalitySearch,
      TaxonomyTreeSearch,
      SearchSourcesDescription,
      BioOnlineReturnedElementsSelection,
      AnimalRows,
      BioOnlineTableRows,
      ResultFormatSelector,
          SelectDataFormat,
          BioOnlineFilter

  },
  data(){
    return{
      description: "A <a href=\"https://www.prefeitura.sp.gov.br/cidade/secretarias/meio_ambiente/\">Secretaria Municipal do Verde e do Meio Ambiente</a>, com o objetivo de subsidiar e dar diretrizes às ações ambientais no âmbito do município de São Paulo desenvolve projetos de levantamento da biodiversidade em diversas áreas do seu território. O conhecimento sobre a flora e a fauna silvestres é o ponto de partida para definir áreas prioritárias para a conservação e a elaboração dos planos de manejos das áreas verdes, bem como para dar subsídio às tomadas de decisão relativas ao manejo da fauna silvestre, às análises de estudos e relatórios de impacto ambiental (EIA/RIMA), aos programas e ações de educação ambiental.",
    }
  },
  methods:{
    
  },
  computed: {
    animalRows: {
      get() {
        return this.$store.state.animalRows;
      }
    }
  }
}
</script>