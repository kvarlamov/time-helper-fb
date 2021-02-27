<template>
  <div>
      <h1>Settings page</h1>
      <form>
          <div class="style2">
              <label for="interval">Working interval (minutes): </label>
              <input type="text" name="interval" id="interval" v-model="settings.interval">
          </div>
          <div class="style2">
              <label for="shortbreak">Break time (minutes): </label>
              <input type="text" name="shortbreak" id="shortbreak" v-model="settings.shortBreak">
          </div>
          <div class="style2">
              <label for="longbreak">Long Break time (minutes): </label>
              <input type="text" name="longbreak" id="longbreak" v-model="settings.longBreak">
          </div>
          <button @click.prevent="saveSettings">Save settings</button>
      </form>
  </div>
</template>

<script>
export default {
    name: 'Settings',
    data: function(){
      return {
        settings: {
          interval: 25,
          shortBreak: 5,
          longBreak: 15
        }
      }
    },
    methods: {
      saveSettings() {
        
      }
    }
}
</script>

<style>

</style>