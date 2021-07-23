<template>
  <div class="container">
    <SearchSourcesDescription :description="description"/>
    <BioOnlineReturnedElementsSelection />
    <b-tabs   content-class="mt-4">
        <b-tab title="Busca espécie" active><MixedSpeciesSearch/></b-tab>
        <b-tab title="Busca local" disabled><BioOnlineLocalitySearch /></b-tab>
    </b-tabs>
    <MixedAnimalRows />
  </div>
</template>

<script>


import BioOnlineLocalitySearch from '../BioOnline/BioOnlineLocalitySearch.vue'
import BioOnlineReturnedElementsSelection from '../BioOnline/BioOnlineReturnedElementsSelection.vue'
import SearchSourcesDescription from '../SearchSourcesDescription.vue' 
import MixedSpeciesSearch from './MixedSpeciesSearch.vue' 
import MixedAnimalRows from './MixedAnimalRows.vue' 


export default {
  components:{
      BioOnlineLocalitySearch,
      SearchSourcesDescription,
      BioOnlineReturnedElementsSelection,
      MixedSpeciesSearch,
      MixedAnimalRows
  },
  data(){
    return{
      description: "Combinamos as diferentes fontes de dados disponíveis num único resultado",
    }
  },
  methods:{
    
  }
}
</script>