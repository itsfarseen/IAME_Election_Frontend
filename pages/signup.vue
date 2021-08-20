<template>
  <div class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-3">
          Create Account
        </h1>
        <h2 class="subtitle is-3">
          Future Leaders Parliament {{new Date().getFullYear()}}
        </h2>
        <div class="columns">
          <form class="column is-one-third" @submit.prevent="signup">
            <b-field label="Name">
              <b-input v-model="creds.name" />
            </b-field>
            <b-field label="Email">
              <b-input v-model="creds.email" />
            </b-field>
            <b-field label="Password">
              <b-input v-model="creds.password" type="password" password-reveal />
            </b-field>
            <b-field label="Confirm Password" :type="{'is-danger': !isPasswordSame}">
              <b-input v-model="repeatPassword" type="password" password-reveal />
            </b-field>
            <button class="button is-primary">
              Signup
            </button>
            <b-notification
              class="login-notification"
              type="is-warning"
              :active.sync="signupFailed"
            >
              {{ errorMessage }}
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
      repeatPassword: '',
      errorMessage: '',
      signupFailed: false,
      creds: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    isPasswordSame() {
      return this.creds.password === this.repeatPassword
    }
  },
  methods: {
    async signup() {
      if (this.creds.name === '') {
        this.errorMessage = "Name can't be empty"
        this.signupFailed = true
        return
      } else if (this.creds.email === '') {
        this.errorMessage = "Name can't be empty"
        this.signupFailed = true
        return
      } else if (this.creds.password === '') {
        this.errorMessage = "Password can't be empty"
        this.signupFailed = true
        return
      } else if (!this.isPasswordSame) {
        this.errorMessage = 'Please reenter your password.'
        this.signupFailed = true
        return
      } else {
        this.errorMessage = ''
        this.signupFailed = false
      }

      const json = await this.$api.signup(this.creds)
      if (json.success) {
        this.signupFailed = false
        await this.$api.login({ email: this.creds.email, password: this.creds.password })
        this.$router.push('/dashboard')
      } else {
        this.errorMessage = 'Server error'
        this.signupFailed = true
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
