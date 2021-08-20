<template>
  <div class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-3">
          Login
        </h1>
        <h2 class="subtitle is-3">
          Future Leaders Parliament {{new Date().getFullYear()}}
        </h2>
        <div class="columns">
          <form class="column is-one-third" @submit.prevent="login">
            <b-field label="Email">
              <b-input v-model="creds.email" />
            </b-field>
            <b-field label="Password">
              <b-input v-model="creds.password" type="password" password-reveal />
            </b-field>
            <button class="button is-primary">
              Login
            </button>
            <b-notification
              class="login-notification"
              type="is-warning"
              :active.sync="loginFailed"
            >
              Login failed. Please check your credentials.
            </b-notification>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFailed: false,
      creds: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      const json = await this.$api.login(this.creds)
      if (json.success) {
        this.loginFailed = false
        this.$router.push('/dashboard')
      } else {
        this.loginFailed = true
      }
    }
  }
}
</script>

<style scoped>
.login-notification {
  position: absolute;
  margin-top: 1em;
}
</style>
