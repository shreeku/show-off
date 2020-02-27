<template>
  <div class="home-page">
    <div>
      <h1 class="display-3">Home Page</h1>
      <p class="lead">This is the Home Page</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-page',
  data () {
    return {
      msg: 'welcome to home page'
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

a {
  color: #35495E;
}
</style>
