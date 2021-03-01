<template>
  <div>
      <h1>Login page</h1>
      <form>
          <div class="style2">
              <label for="email">Email: </label>
              <input type="text" name="email" id="email" v-model="email">
          </div>
          <div class="style2">
              <label for="password">Password: </label>
              <input type="text" name="password" id="password" v-model="password">
          </div>          
          <button @click.prevent="logOn">Login</button>
      </form>
  </div>
</template>

<script>

export default {
    name: 'Registration',
    data: function(){
      return {
        email: '',
        password: '',
        cpassword: ''        
      }
    },
    methods: {
        logOn() {            
            const user = {
                email: this.email,
                password: this.password
            }
            
            this.$store.dispatch('loginUser', user)
            .then(() => {
                console.log('ok')
                this.$router.push('/')    
            })
            .catch(error => console.log("error: " + error));
        }
    }
}
</script>

<style>

</style>