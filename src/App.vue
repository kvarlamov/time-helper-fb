<template>
  <div id="app">
    <div class="rotate-wrapper">
      <h1 class="rotate">Time helper</h1>
    </div>
    
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

.rotate-wrapper{
      width: 50px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    background-color: blue;
    }
    .rotate {
        position: absolute;
        bottom: 0;
        left: 0;
        margin-left: -30px;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 3px;      
        color: #fff;
        padding: 5px 10px;
        margin: 0 0 10px 0;
        line-height: 24px;
        transform-origin: left top;
        transform: rotate(-90deg);
        /* Legacy vendor prefixes that you probably don't need... */
        /* Safari */
        -webkit-transform: rotate(-90deg);
        /* Firefox */
        -moz-transform: rotate(-90deg);
        /* IE */
        -ms-transform: rotate(-90deg);
        /* Opera */
        -o-transform: rotate(-90deg);
        /* Internet Explorer */
        filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
    }
    
</style>
