<template>
  <div v-if="displayType === 'display_table'">
        <div class="container" v-if="animalRows.length > 0 || hasSearched">

      <h3 v-if="animalRows.length == 1">{{ animalRows.length }} resultado</h3>
      <h3 v-else>{{ animalRows.length }} resultados</h3>
      <b-table
        striped
        hover
        :items="animalRowsInnerProperties(rows)"
        :fields="selectedArrayToTable"
      >
      
      <template v-slot:cell()="data">
        <span v-b-tooltip.hover :title="getTooltip(data.field.key,data.value)">{{ data.value}}</span>
      </template>
      
      
      </b-table>
    </div>
  </div>
</template>
<script>
  import {flattenSpecies } from './FilterUtils';
export default {
  
  
  props: ['rows'],
  data() {
    return {
    };
  },
  methods: {
    getTooltip(column, cell){
      if(this.$store.state.CONCERN_CATEGORIES.includes(column)){
        let tooltipText = this.$store.state.tooltipDict["Categorias de Ameaça"][cell];
        if(tooltipText){
          return tooltipText;
        }else{
          return "";
        }
      }
      var innerDict = this.$store.state.tooltipDict[column];
      if(innerDict){
        let tooltipText = this.$store.state.tooltipDict[column][cell];
        if(tooltipText){
          return tooltipText;
        }else{
          return "";
        }
      }else{
        return "";
      }
    },
    flattenObject(obj){
      const flattened = {}

      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          Object.assign(flattened, this.flattenObject(obj[key]))
        } else {
          flattened[key] = obj[key]
        }
      })
      return flattened
    },
    animalRowsInnerProperties(rows) {
      var flatRows = [];
      for(let i = 0; i < rows.length; i++){
        const flatten = flattenSpecies(rows[i]);
        flatRows.push(flatten);
      }
      return flatRows;
    },
  },
  computed: {
    displayType: {
      get() {
        return this.$store.state.displayType;
      },
    },
    animalRows: {
      get() {
        return this.$store.state.animalRows;
      },
    },
    selectedArrayToTable: {
      get() {
        return this.$store.state.selectedArrayToTable;
      },
    },
    selectedArrayToCards: {
      get() {
        return this.$store.state.selectedArrayToCards;
      },
    },
    localitiesWrapper: {
      get() {
        return this.$store.state.localitiesWrapper;
      },
    },
    hasSearched: {
      get() {
        return this.$store.state.hasSearched;
      },
    },
    tooltipDict: {
      get() {
        return this.$store.state.tooltipDict;
      },
    },
  },
};
</script>