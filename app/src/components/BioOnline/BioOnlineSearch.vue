<template>
  <div class="container">
    <SearchSourcesDescription :description="description"/>
    <BioOnlineReturnedElementsSelection />
    <ResultFormatSelector />
    <b-tabs   content-class="mt-4">
        <b-tab title="Busca espécie" active><BioOnlineSpeciesSearch/><SelectDataFormat /></b-tab>
        <b-tab title="Busca local" ><BioOnlineLocalitySearch /></b-tab>
    </b-tabs>
    <AnimalRows />
    <BioOnlineTableRows  />
  </div>
</template>

<script>


import BioOnlineSpeciesSearch from './BioOnlineSpeciesSearch.vue'
import BioOnlineLocalitySearch from './BioOnlineLocalitySearch.vue'
import SearchSourcesDescription from '../SearchSourcesDescription.vue'
import AnimalRows from './AnimalRows.vue'
import BioOnlineTableRows from './BioOnlineTableRows.vue'
import BioOnlineReturnedElementsSelection from './BioOnlineReturnedElementsSelection.vue'
import ResultFormatSelector from './ResultFormatSelector.vue'
import SelectDataFormat from "./SelectDataFormat.vue";



export default {
  name: 'SearchAnimal',
  components:{
      BioOnlineSpeciesSearch,
      BioOnlineLocalitySearch,
      SearchSourcesDescription,
      BioOnlineReturnedElementsSelection,
      AnimalRows,
      BioOnlineTableRows,
      ResultFormatSelector,
          SelectDataFormat,

  },
  data(){
    return{
      description: "A <a href=\"https://www.prefeitura.sp.gov.br/cidade/secretarias/meio_ambiente/\">Secretaria Municipal do Verde e do Meio Ambiente</a>, com o objetivo de subsidiar e dar diretrizes às ações ambientais no âmbito do município de São Paulo desenvolve projetos de levantamento da biodiversidade em diversas áreas do seu território. O conhecimento sobre a flora e a fauna silvestres é o ponto de partida para definir áreas prioritárias para a conservação e a elaboração dos planos de manejos das áreas verdes, bem como para dar subsídio às tomadas de decisão relativas ao manejo da fauna silvestre, às análises de estudos e relatórios de impacto ambiental (EIA/RIMA), aos programas e ações de educação ambiental.",
    }
  },
  methods:{
    
  }
}
</script>