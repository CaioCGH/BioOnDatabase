<template>
  <div v-if="displayType === 'display_tree'">
      <div class="container" v-if="animalRows.length > 0 || hasSearched">

      <h3 v-if="animalRows.length == 1">{{ animalRows.length }} resultado</h3>
      <h3 v-else>{{ animalRows.length }} resultados</h3>
    <Node :dataNode="dataTree" />
  </div>
  </div>
</template>

<script>
import  Node from "../TreeView/Node.vue";
import {  createTree } from "./TreeUtils";

export default {
  components: {
    Node
  },
  data() {
    return {
      dataTree: {}
    };
  },
  created() {
    this.createTree();
  },
  methods: {
    createTree() {
      var data = this.$store.state.animalRows;
      this.dataTree = createTree(data);
    }
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
  }
};
</script>