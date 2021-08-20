<template>
  <div class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-1">
          {{new Date().getFullYear()}}
        </h1>
        <h2 class="subtitle is-1">
          Future Leaders Parliament
        </h2>
        <b-button size="is-large" type="is-primary" tag="router-link" to="/vote">
          Enter Voting
        </b-button>
        <b-button size="is-large" type="is-secondary" tag="router-link" to="/login">
          School Login
        </b-button>
        <b-button size="is-large" type="is-secondary" tag="router-link" to="/signup">
          School Register
        </b-button>
      </div>
    </div>
  </div>
</template>
