<template>
<div v-if="displayType === 'display_table' && animalRows.length > 0">
    <div>
      <h3>{{animalRows.length}} resultados</h3>
    <b-table striped hover :items="animalRows" :fields="selectedArrayToTable"></b-table>
  </div>
  </div>
</template>
<script>

export default {

  data() {
      return {
      }
  },
  methods:{
  },
  computed:{
    displayType: {
      get(){
        return this.$store.state.displayType;
      }
    },
    animalRows: {
      get(){
        return this.$store.state.animalRows;
      }
    },
    selectedArrayToTable: {
      get(){
        return this.$store.state.selectedArrayToTable;
      }
    },
    selectedArrayToCards: {
      get(){
        return this.$store.state.selectedArrayToCards;
      }
    },
    localitiesWrapper: {
      get(){
        return this.$store.state.localitiesWrapper;
      }
    },
  }
}
</script>