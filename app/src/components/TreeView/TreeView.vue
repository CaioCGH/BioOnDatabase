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
        tree: {
        label: 'test株式会社',
        children: [{
          label: '総務部',
          children: [{ label: '人事課' }, { label: '採用課' }]
        }, {
          label: '営業部',
          children: [{ label: '第1課' }, { label: '第2課' }]
        }, {
          label: '経理部'
        }]
      }
    };
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
