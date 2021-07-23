<template>
  <div class="hello">
    <div class="container mrgnbtm">
          <b-tabs  content-class="mt-4">
            <!-- <b-tab title="Banco geral Bio-Online" active><BioOnlineSearch  /></b-tab> -->
            <b-tab title="Wikiaves"><WikiavesSearch  /></b-tab>
            <b-tab title="Ebird"><EbirdSearch /></b-tab>
            <b-tab title="INaturalist"><InaturalistSearch  /></b-tab>
            <!-- <b-tab title="Fontes combinadas" ><MixedSearch  /></b-tab> -->
          </b-tabs>
    </div>
  </div>
</template>

<script>
// import BioOnlineSearch from './BioOnline/BioOnlineSearch.vue'
import WikiavesSearch from './Wikiaves/WikiavesSearch.vue'
import EbirdSearch from './Ebird/EbirdSearch.vue'
import InaturalistSearch from './Inaturalist/InaturalistSearch.vue'
// import MixedSearch from './Mixed/MixedSearch.vue'


export default {
  components: {
    // BioOnlineSearch,
    WikiavesSearch, EbirdSearch, InaturalistSearch, 
    // MixedSearch
  },
  data() {
      return {
      }
  }
}
</script>