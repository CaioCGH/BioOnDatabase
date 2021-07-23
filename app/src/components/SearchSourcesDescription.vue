<template>
  <div>
    <b-button
      :class="visible ? null : 'collapsed'"
      :aria-expanded="visible ? 'true' : 'false'"
      aria-controls="collapse-4"
      @click="visible = !visible"
    >
      <span v-if="visible">Esconder</span>
      <span v-else>Mostrar</span>
    </b-button>
    <b-collapse id="collapse-4" v-model="visible" class="mt-2 mb-2">
      <b-card><span v-html="description"></span></b-card>
    </b-collapse>
  </div>
</template>

<script>

import { BCollapse, BButton, BCard } from "bootstrap-vue";

export default {
  props: ['description'],
  components:{
    BCollapse, BButton, BCard
  },
  data(){
    return{
      visible: true
    }
  }
}
</script>
