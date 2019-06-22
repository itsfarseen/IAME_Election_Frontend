<template>
  <div class="container">
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
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.container {
  padding-left: 15px;
  padding-right: 15px;
  margin: auto;
  max-width: 400px;
  margin-top: 30vh;
}
</style>
