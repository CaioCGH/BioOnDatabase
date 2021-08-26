<template>
  <div>
    <Node :dataNode="taxonomyTree" />
  </div>
</template>
<script>
// import Vue2OrgTree from "vue2-org-tree";
import { getTaxonomyTree} from "../BioOnline/BioOnlineService";
import Node from "./Node.vue";

export default {
  components: {
      Node
    //   Vue2OrgTree
  },
  data() {
    return {
        taxonomyTree: {},
      }
  },
  created() {
    this.feedTaxonomyTree();
  },
  methods: {
    feedTaxonomyTree() {
      getTaxonomyTree().then((value) => {
        this.taxonomyTree = value;
      });
    },
    labelClass (data) {
        data
      return 'bg_node'
    },
    renderContent (h, data) {
      return data.label
    },
    onNodeClick (e, data) {
 e, data;
    },
    onNodeMouseOver (e, data) {
  e, data;
    },
    onNodeMouseOut (e, data) {
  e, data;
    }
  },
};
</script>
