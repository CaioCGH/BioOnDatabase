<template>
  <div>
    <b-navbar  toggleable="sm" type="light" variant="light">
      <!-- <b-navbar-brand><router-link to="/"><b>FaunaSampa</b></router-link></b-navbar-brand> -->

        <b-navbar-nav>
          <!-- <b-nav-text><router-link to="/map">Mapa</router-link></b-nav-textS> -->
          <b-nav-item><router-link  active-class="active" to="/">FaunaSampa</router-link></b-nav-item>
          <b-nav-item><router-link  active-class="active" to="/explore">Explorar</router-link></b-nav-item>
          <b-nav-item><router-link  active-class="active" to="/about">Sobre</router-link></b-nav-item>


          <b-nav-item v-if="showSpecies"><router-link to="/species">Espécies</router-link></b-nav-item>
          <b-nav-item v-if="showSpecies"><router-link to="/localities">Localidades</router-link></b-nav-item>
          <b-nav-item v-if="showSpecies"><router-link to="/observers">Observadores</router-link></b-nav-item>
          <b-nav-item v-if="showSpecies"><router-link to="/differences">Diferenças</router-link></b-nav-item>
         
          <!-- <b-nav-item><router-link to="/other-sources">Outras fontes</router-link></b-nav-item> -->
          <!-- <b-nav-item><router-link to="/about">Sobre</router-link></b-nav-item> -->
        </b-navbar-nav >


        <b-navbar-nav class="ml-auto" align="right">
          <b-nav-item v-if="currentUser">{{ currentUser.username}}</b-nav-item>
          <b-nav-item v-if="currentUser"><router-link to="/profile">Perfil</router-link></b-nav-item>
          <b-nav-item v-if="!currentUser"><router-link to="/login">Entrar</router-link></b-nav-item>
          <b-nav-item v-else @click="logOut()">Sair</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
    <hr/>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showSpecies() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout').then(() =>{
      }).catch(e => {
        console.log("erro:", e);
      });
      this.$router.push('/');
    }
  }
};
</script>

<style>


/* .navbar{
 background-color: blanchedalmond;
} */

 .navbar{
    background-color: blanchedalmond!important;
    font-family: 'Montserrat'!important;
    font-size: 150%;
    color: red !important;
 }

 .navbar.navbar.navbar a{
   color: peru !important;
 }

/* .b-navbar-brand.b-navbar-brand.b-navbar-brand.b-navbar-brand a{
  font-weight: bold;
} */
hr {
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 5%;
  margin-right: 5%;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 1);
}

.router-link-exact-active{
font-weight: 700;
}
</style>