<template>
  <div>
      <h1>Registration page</h1>
      <form>
          <div class="style2">
              <label for="email">Email: </label>
              <input type="text" name="email" id="email" v-model="email">
          </div>
          <div class="style2">
              <label for="password">Password: </label>
              <input type="text" name="password" id="password" v-model="password">
          </div>
          <div class="style2">
              <label for="cpassword">Confirm Password: </label>
              <input type="text" name="cpassword" id="cpassword" v-model="cpassword">
          </div>
          <button @click.prevent="registration">Registration</button>
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
        registration() {            
            if (this.password != this.cpassword) {
              alert("Passwords don't matches!!!");
            } else {
                const user = {
                  email: this.email,
                  password: this.password
                }
                
                this.$store.dispatch('registerUser', user)
                .then(() => {
                  console.log('ok')
                  this.$router.push('/')
                })
                .catch(error => console.log("error: " + error));
            }
            
        }
    }
}
</script>

<style>

</style>