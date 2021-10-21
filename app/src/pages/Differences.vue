<template>
  <div class="hello">
    <div class="container mrgnbtm">
          <b-tabs  content-class="mt-4">
            <b-tab title="Wikiaves"><Wikiaves  /></b-tab>
            <b-tab title="Ebird"><Ebird /></b-tab>
            <b-tab title="INaturalist"><Inaturalist  /></b-tab>
          </b-tabs>
    </div>
  </div>
</template>

<script>
import Wikiaves from '../components/Difference/Wikiaves.vue'
import Ebird from '../components/Difference/Ebird.vue'
import Inaturalist from '../components/Difference/Inaturalist.vue'


export default {
  components: {
    Wikiaves, Ebird, Inaturalist
  },
  data() {
      return {
      }
  }
}
</script>