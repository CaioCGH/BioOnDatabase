<template>
  <div>
    <AboutMain />
    <BioDiversityMain />
    <LocalitiesMain />
  </div>
</template>

<script>

import AboutMain from '../components/Main/AboutMain.vue'
import BioDiversityMain from '../components/Main/BioDiversityMain.vue'
import LocalitiesMain from '../components/Main/LocalitiesMain.vue'



export default {
  components: {
      AboutMain, BioDiversityMain, LocalitiesMain
  }
}
</script>