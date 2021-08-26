<template>
  <div>
      <h3>Filtro</h3>
          <b-tabs  v-model="selectedTab"  content-class="mt-4">
          <b-form-group>
            <b-spinner
          v-show="loadingColumns"
          small
          variant="primary"
          label="Spinning"
        ></b-spinner>
            <b-tab title="Básico" >
              </b-tab>

            <b-tab v-b-tooltip.hover active title="Completo">
              <b-card v-for="category in Object.keys(filterDict)" :key="category.id">
                <h4>{{ category }}</h4>
                <BioOnlineInnerFilter :innerKeys="Object.keys(filterDict[category])" :innerMap="filterDict[category]" :category="category"/>
              </b-card>
            </b-tab>
          </b-form-group>
          </b-tabs>   
        </div>
</template>

<script>

import { getBioOnlineFilterDict } from './BioOnlineService'
import BioOnlineInnerFilter from './BioOnlineInnerFilter.vue'


export default {
  components:{
    BioOnlineInnerFilter
  },
  data(){
    return{
      selectedTab: null,
      loadingColumns: true,
      cols: 2
    }
  },
  methods:{
    feedCompleteOptions(){
       getBioOnlineFilterDict().then(
                (value) => {
                      this.$store.state.filterDict = value;
                    })
    }
  },
  created(){
    this.feedCompleteOptions();
    this.loadingColumns = false;
  },
  computed:{
    filterDict:{
      get () {
      return this.$store.state.filterDict;
      }
    },
    conservationStatusDict:{
      get () {
      return this.$store.state.conservationStatusDict;
      }
    }
  }
}
</script>
