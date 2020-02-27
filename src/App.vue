<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Show-Off</b-navbar-brand>
      <b-collapse is-nav id="nav-collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/show-off-page">Show-Off-Page</b-nav-item>
          <b-nav-item href="#" @click.prevent="login"
                      v-if="!activeUser">Login</b-nav-item>
          <b-nav-item href="#" @click.prevent="logout"
                      v-else>Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      activeUser: null
    }
  },
  watch: {
    '$route': 'refreshActiveUser'
  },
  methods: {
    login () {
      this.$auth.loginRedirect()
    },
    async refreshActiveUser () {
      this.activeUser = await this.$auth.getUser()
    },
    async logout () {
      await this.$auth.logout()
      await this.refreshActiveUser()
      this.$router.push('/')
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
