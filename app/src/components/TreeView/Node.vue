<template>
  <div no-body class="p-0 m-0">
    <b-card  no-body class="pl-3 pr-1 pt-1 pb-1">
        <b-row>
            <b-col lg="4" class="pb-2">
      {{ dataNode.levelName }}: {{ dataNode.name }}<br> Número de espécies:
      {{ dataNode.numberOfLeaves }}
      </b-col>
            <b-col lg="4" class="pb-2">
      <b-button :pressed.sync="showChildren" class="sm">
        {{ showChildren ? "Esconder" : "Mostrar" }} filhos
      </b-button>
      </b-col>
      </b-row>
      <div v-if="showChildren">
        <div v-for="child in dataNode.children" :key="child.id">
          <tree-node :dataNode="child" />
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import TreeNode from "./Node.vue";
export default {
  name: 'tree-node',
  props: ["dataNode"],
  components: {
    'tree-node': TreeNode,
  },
  data() {
    return {
      showChildren: false
    }
  },
  methods: {
  },
};
</script>
