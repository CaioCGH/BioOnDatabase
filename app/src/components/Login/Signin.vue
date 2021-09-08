<template>
  <div class="col-md-12">
    <div class="card card-container">
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model="user.username"
            type="text"
            class="form-control"
            name="username"
          />
          <div
            v-if="user.username.length < 1 && attemptedLogin == true"
            class="alert alert-danger"
            role="alert"
          >
            Username is required!
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            name="password"
          />
          <div
            v-if="user.password.length < 1 && attemptedLogin == true"
            class="alert alert-danger"
            role="alert"
          >
            Password is required!
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from "../../models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", "", ""),
      loading: false,
      message: "",
      attemptedLogin: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;

      if (this.user.username && this.user.password) {
        console.log("dispaching login");
        this.$store.dispatch("auth/login", this.user).then(
          (data) => {
            if(data.accessToken){
              console.log("login done", data);
              this.$router.push("/profile");
            }else{
              this.loading = false;
              this.message =
                (data.response && data.response.data) ||
                data.message ||
              data.toString();
            }
          }
        );
      }
    },
  },
};
</script>