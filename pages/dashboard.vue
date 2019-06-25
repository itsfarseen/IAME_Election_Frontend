<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">
            {{ profile.name }}
          </h1>
          <h2 class="subtitle is-3">
            {{ profile.email }}
          </h2>
          <br>
          <b-button size="is-large" type="is-primary" tag="router-link" to="/admin">
            Administration
          </b-button>
          <b-button size="is-large" type="is-success" tag="router-link" to="/results">
            Results
          </b-button>
          <b-button size="is-large" type="is-warning" @click="logout">
            Logout
          </b-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  meta: {
    requiresLogin: true
  },
  data() {
    return {
      profile: {}
    }
  },
  async asyncData({ app }) {
    try {
      const _profile = await app.$api.profile()
      return {
        profile: _profile.data
      }
    } catch (error) {
      console.log(error)
      console.log('loggedIn: ' + app.$api.isLoggedIn)
      if (!app.$api.isLoggedIn) app.router.push('/login')
      else throw error
    }
  },
  methods: {
    logout() {
      this.$api.logout()
      this.$router.push('/')
    }
  }
}
</script>
