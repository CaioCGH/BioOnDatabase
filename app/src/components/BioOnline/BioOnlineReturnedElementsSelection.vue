<template>
  <div class="container">
          <b-tabs  v-model="selectedTab"  content-class="mt-4">
          <b-form-group label="Elementos devolvidos:" v-slot="{ ariaDescribedby }">
            <b-spinner
          v-show="loadingColumns"
          small
          variant="primary"
          label="Spinning"
        ></b-spinner>
            <b-tab title="Básico" active>
              <b-form-checkbox-group
                :value="selectedArrayToCards"
                :options="returnedElementsObject['Básico'].innerOptions"
                :aria-describedby="ariaDescribedby"
                :checked="selectedArrayToCards"
                @change="update(selectedArrayToCards, $event)"
                ></b-form-checkbox-group>
              </b-tab>

            <b-tab v-b-tooltip.hover title="Completo">
              <b-card v-for="category in Object.keys(returnedElementsObject)" :key="category.id">
                <b-form-checkbox
                size="lg"
                v-model="returnedElementsObject[category].selected"
                @change="toggleAll(returnedElementsObject[category].selected,category)"
                >{{ category }}</b-form-checkbox>
            <b-form-checkbox-group
                :value="selectedArrayToCards"
                :options="returnedElementsObject[category].innerOptions"
                :aria-describedby="ariaDescribedby"
                :checked="selectedArrayToCards"
                @change="update(selectedArrayToCards, $event)"
                ></b-form-checkbox-group>
              </b-card>
            </b-tab>
          </b-form-group>
          </b-tabs>   
        </div>
</template>

<script>

import { getBioOnlineColumns } from './BioOnlineService'


export default {
  components:{
  },
  data(){
    return{
      selectedTab: null,
      loadingColumns: true,
      // returnedElementsObject: {}
      returnedElementsObject:  {
            "Básico": { selected: false}, 
            "Taxonomia": { selected: false},
            "Biologia": { selected: false}, 
            "Estado de conservação": { selected: false},
            "Observações registradas": { selected: false},
      }
    }
  },
  methods:{
    feedCompleteOptions(){
       getBioOnlineColumns().then(
                (value) => {
                      this.returnedElementsObject = value;
                    })
    },
    toggleAll(checked, category ){
      this.$store.state.selectedArrayToCards = this.$store.state.selectedArrayToCards.filter(n => !this.returnedElementsObject[category].innerOptions.includes(n))
      if(!checked){
        for(var i = 0; i < this.returnedElementsObject[category].innerOptions.length; i++){
          this.$store.state.selectedArrayToCards.push(this.returnedElementsObject[category].innerOptions[i]);
        }
      }
      this.update("?", this.$store.state.selectedArrayToCards);
    },
    update(item, event){
      this.$store.state.selectedArrayToCards = event;
      let selectionToCards = this.$store.state.selectedArrayToCards;
      let selectionToTable = selectionToCards.filter(e => e != "Observações registradas");
      if(selectionToCards.includes("Observações registradas")){
        selectionToTable.push(...this.$store.state.localitiesWrapper.map(w => w.chosenLocality));
      }
      this.$store.commit("updateSelectedArrayToTable", selectionToTable);
      console.log("updating")
    }
  },
  created(){
    this.feedCompleteOptions();
    this.loadingColumns = false;
  },
  computed:{
    selectedArrayToCards:{
      get () {
      return this.$store.state.selectedArrayToCards;
      },
      set (value) {
        this.$store.commit('updateSelectedArrayToCards', value)
      }
    },
    selectedArrayToTable:{
      get () {
      return this.$store.state.selectedArrayToTable;
      },
      set (value) {
        this.$store.commit('updateSelectedArrayToTable', value)
      }
    }
  }
}
</script>