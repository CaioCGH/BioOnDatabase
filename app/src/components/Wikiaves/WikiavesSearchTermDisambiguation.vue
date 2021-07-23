<template>
    <div class="container">
        <h2 v-if="wikiavesSearchTermResult.length === 1"> {{ wikiavesSearchTermResult.length }} resultado</h2>
        <h2 v-else >{{ Object.keys(wikiavesSearchTermResult).length }} resultados</h2>
        <div v-for="result in wikiavesSearchTermResult" :key="result.id"> 
            <ResultCard :result="result"/>
        </div>
    </div>
</template>
<script>

import  ResultCard  from './ResultCard.vue'



export default {
    props: ['wikiavesSearchTermResult'],
    components:{
    ResultCard
  },
  data() {
    return {
      wikiavesSearchTerm: '',
      animalData : {}, 
      hasSearched: false,
      loading: false
    }
  }
}
</script>