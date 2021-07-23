<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-brand><router-link to="/">FaunaSP</router-link></b-navbar-brand>

        <b-navbar-nav>
          <!-- <b-nav-text><router-link to="/map">Mapa</router-link></b-nav-textS> -->
          <b-nav-item v-if="showSpecies"><router-link to="/species">Espécies</router-link></b-nav-item>
          <b-nav-item><router-link to="/about">Sobre</router-link></b-nav-item>
        </b-navbar-nav >


        <b-navbar-nav class="ml-auto" align="right">
          <b-nav-item v-if="currentUser">{{ currentUser.username}}</b-nav-item>
          <b-nav-item v-if="currentUser"><router-link to="/profile">Perfil</router-link></b-nav-item>
          <b-nav-item v-if="!currentUser"><router-link to="/login">Entrar</router-link></b-nav-item>
          <b-nav-item v-else @click="logOut()">Sair</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
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