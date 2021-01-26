<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <MainLogic msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MainLogic from '@/components/MainLogic.vue'

export default {
  name: 'Home',
  components: {
    MainLogic
  }
}
</script>
