<template>
  <div v-if="displayType === 'display_tree' && animalRows.length > 0">
    <Node :dataNode="dataTree" />
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
      console.log("this.$store.animalRows", this.$store.state.animalRows);
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
  }
};
</script>