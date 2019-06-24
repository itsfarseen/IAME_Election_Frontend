<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">
          Login
        </h1>
        <h2 class="subtitle">
          IAME School Parliament 2019
        </h2>
      </div>
    </section>
    <section class="container">
      <form @submit.prevent>
        <b-field label="User ID">
          <b-input v-model="userid" />
        </b-field>
        <b-field label="Password">
          <b-input v-model="password" type="password" password-reveal />
        </b-field>
        <button class="button is-primary">
          Login
        </button>
      </form>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.container {
  padding-left: 15px;
  padding-right: 15px;
  max-width: 400px;
}
</style>
