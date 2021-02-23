<template>
  <div v-if="targetOnFocus">      
      <h1>Target name: {{targetOnFocus.name}}</h1>
      <p>Time: {{targetOnFocus.time}}</p>
      <button>Start</button>
  </div>
</template>

<script>
export default {
    name: 'CurrentTarget',
    props: ['targetOnFocus']
}
</script>

<style>

</style>