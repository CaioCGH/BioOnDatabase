<template>
  <div id="app" >
        <Navbar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'



export default {
  components: {
      Navbar,
        Footer
  }
}
</script>

<style>
  @import './assets/styles/global.css';
</style>