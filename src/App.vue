<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <span> | </span>
      <router-link to="/settings">Settings</router-link>
      <span> | </span>
      <router-link to="/about">About</router-link>
      <span> | </span>
      <button @click="logOut">LogOut</button>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  methods: {
    logOut() {
      this.$store.dispatch('logoutUser').then(() => {        
        this.$router.push('/logOn')
        });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto; 
  width: 60%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.target-table-tr:hover {
        background: yellow;
    }
.style2{
        display: flex;
        margin: 10px 0;
    }
</style>
