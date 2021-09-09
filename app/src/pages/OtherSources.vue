<template>
  <div class="hello">
    <div class="container mrgnbtm">
          <b-tabs  content-class="mt-4">
            <b-tab title="Wikiaves"><WikiavesSearch  /></b-tab>
            <b-tab title="Ebird"><EbirdSearch /></b-tab>
            <b-tab title="INaturalist"><InaturalistSearch  /></b-tab>
            <b-tab title="Fontes combinadas" active ><MixedSearch  /></b-tab>
          </b-tabs>
    </div>
  </div>
</template>

<script>
import WikiavesSearch from '../components/Wikiaves/WikiavesSearch.vue'
import EbirdSearch from '../components/Ebird/EbirdSearch.vue'
import InaturalistSearch from '../components/Inaturalist/InaturalistSearch.vue'
import MixedSearch from '../components/Mixed/MixedSearch.vue'


export default {
  components: {
    WikiavesSearch, EbirdSearch, InaturalistSearch, 
    MixedSearch
  },
  data() {
      return {
      }
  }
}
</script>