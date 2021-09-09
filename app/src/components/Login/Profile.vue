<template>
  <div>
    <b-card
      border-variant="primary"
      class="m-5"
    >
      <b-card-header header-bg-variant="primary" header-text-variant="white">
        <h3>
          <strong>{{ currentUser.username }}</strong>
        </h3>
      </b-card-header>
      <b-card-text>
        <!-- <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p> -->
        <p>
          <strong>Email:</strong>
          {{ currentUser.email }}
        </p>
        <strong>Permissões:</strong>
        <ul>
          <li v-for="(role, index) in currentUser.roles" :key="index">
            {{ role }}
          </li>
        </ul>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>