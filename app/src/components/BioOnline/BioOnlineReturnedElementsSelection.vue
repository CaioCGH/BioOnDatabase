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
                :options="completeOptions['Básico']"
                :aria-describedby="ariaDescribedby"
                :checked="selectedArrayToCards"
                @change="update(selectedArrayToCards, $event)"
                ></b-form-checkbox-group>
              </b-tab>

            <b-tab v-b-tooltip.hover title="Completo">
              <b-card v-for="category in Object.keys(allSelected)" :key="category.id">
                <b-form-checkbox
                size="lg"
                v-model="allSelected[category]"
                @change="toggleAll(allSelected[category],category)"
                >{{ category }}</b-form-checkbox>
            <b-form-checkbox-group
                :value="selectedArrayToCards"
                :options="completeOptions[category]"
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
      
        completeOptions: [],
        allSelected:{
          "Básico": false,
          "Taxonomia": false,
          "Biologia": false,
          "Categorias de Ameaça": false,
          "Observações registradas": false,
        }
    }
  },
  methods:{
    feedCompleteOptions(){
       getBioOnlineColumns().then(
                (value) => {
                      this.completeOptions = value;
                    })
    },
    toggleAll(checked, category ){
      this.$store.state.selectedArrayToCards = this.$store.state.selectedArrayToCards.filter(n => !this.completeOptions[category].includes(n))
      if(!checked){
        for(var i = 0; i < this.completeOptions[category].length; i++){
          this.$store.state.selectedArrayToCards.push(this.completeOptions[category][i]);
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