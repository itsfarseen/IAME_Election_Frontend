<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">{{ profile.name }}</h1>
          <h2 class="subtitle is-3">{{ profile.email }}</h2>
          <br>
          <b-button size="is-large" type="is-primary" tag="router-link" to="/admin">Administration</b-button>
          <b-button size="is-large" type="is-success" tag="router-link" to="/results">Results</b-button>
          <b-button
            size="is-large"
            type="is-danger"
            @click="deleteConfirmation = true"
          >Delete All Votes</b-button>
          <b-button size="is-large" type="is-warning" @click="logout">Logout</b-button>
        </div>
        <b-notification
          has-icon
          :active.sync="deletingVotes"
          type="is-danger"
        >Deleting all votes polled..</b-notification>
        <b-notification has-icon :active.sync="deletedVotes" auto-close>All votes deleted.</b-notification>
      </div>
    </section>
    <b-modal :active.sync="deleteConfirmation" class="card" has-modal-card>
      <div class="card">
        <div class="notification is-danger">
          <p class="subtitle is-3">Delete all votes</p>
        </div>
        <div class="card-content">
          <div class="content">
            <p>This will delete all the votes recorded so far in your account.</p>
            <p>Do you wish to continue?</p>
          </div>
        </div>
        <footer class="card-footer notification">
            <b-button icon-right="delete" type="is-danger" @click="deleteAllVotes">Delete</b-button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  meta: {
    requiresLogin: true
  },
  data() {
    return {
      profile: {},
      deletingVotes: false,
      deletedVotes: false,
      deleteConfirmation: false
    }
  },
  async asyncData({ app }) {
    try {
      const _profile = await app.$api.profile()
      return {
        profile: _profile.data
      }
    } catch (error) {
      console.log('loggedIn: ' + app.$api.isLoggedIn)
      if (!app.$api.isLoggedIn) app.router.push('/login')
      else throw error
    }
  },
  methods: {
    async logout() {
      await this.$api.logout()
      this.$router.push('/')
    },
    async deleteAllVotes() {
      this.deleteConfirmation=false
      this.deletingVotes = true
      await this.$api.deleteAllVotes()
      this.deletingVotes = false
      this.deletedVotes = true
    }
  }
}
</script>
