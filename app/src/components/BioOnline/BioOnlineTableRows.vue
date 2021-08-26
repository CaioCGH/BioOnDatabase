<template>
  <div v-if="displayType === 'display_table' && animalRows.length > 0">
    <div>
      <h3 v-if="animalRows.length == 1">{{ animalRows.length }} resultado</h3>
      <h3 v-else>{{ animalRows.length }} resultados</h3>
      <b-table
        striped
        hover
        :items="animalRowsInnerProperties(rows)"
        :fields="selectedArrayToTable"
      ></b-table>
    </div>
  </div>
</template>
<script>
export default {
  props: ['rows'],
  data() {
    return {};
  },
  methods: {
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
        const flatten = this.flattenObject(rows[i]);
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
  },
};
</script>