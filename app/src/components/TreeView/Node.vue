<template>
  <div no-body>
    <b-card no-body  :class="cardClass">
      <b-row>
        <b-col lg="4" class="pb-2">
          <tr>
            <td class="text-muted"> {{ dataNode.levelName }}: </td>
            <td class="text-primary"> {{ dataNode.name }} </td>
          </tr>
          <tr>
            <td class="text-muted"> Número de espécies: </td>
            <td class="text-primary"> {{ dataNode.numberOfLeaves }} </td>
          </tr>
        </b-col>
        <b-col lg="4" class="pb-2">
          <button v-if="dataNode.levelName != 'Subespécie'"
          :class="buttonClass"
          @click="changeButtonStyle()">
            {{ showChildren ? "-" : "+" }}
          </button>
        </b-col>
        <b-col>
          <div v-if="(dataNode.numberOfLeaves < 20 && !showChildren) || dataNode.levelName == 'Subespécie'">
            <div v-for="name in dataNode.leavesScientificNames" :key="name.id">
              <p class="text-primary"> {{ name }} </p>
            </div>
          </div>
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
  name: "tree-node",
  props: ["dataNode"],
  components: {
    "tree-node": TreeNode
  },
  data() {
    return {
      showChildren: false,
      "cardClass": "pl-3 pr-1 pt-1 pb-1",
      buttonClass: "btn btn-primary"
    };
  },
  created(){
    if(this.$props.dataNode.name == ""){
      this.changeButtonStyle();
    }

  },
  methods: {
    findScientificNames(){
      return [];
    },
    changeButtonStyle(){
      this.showChildren = !this.showChildren;
      if(this.showChildren){
        this.buttonClass = "btn btn-secondary";
      }else{
        this.buttonClass = "btn btn-primary"
      }
    }
  },
};
</script>
