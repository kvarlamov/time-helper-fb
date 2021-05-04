<template>
  <div v-if="targetOnFocus">      
      <h1>Target name: {{targetOnFocus.name}}</h1>
      <p>Target time: {{targetOnFocus.time}}</p>
      <p>Elapsed time: {{targetOnFocus.passedTime | timeFormatter}}</p>
      <button @click="removeTarget()">Remove</button>
      <button @click="startTimer($event)">Start</button>
  </div>
</template>

<script>
export default {
    name: 'CurrentTarget',
    props: {
        targetOnFocus: {
            type: Object
        }
    },
    data() {
        return {
            onTimer: false,
            timerId: 0
        }
    },
    methods: {
        startTimer(e) {
                if (!this.onTimer){
                    e.target.innerText = "stop";
                    this.onTimer = true;
                    this.$emit('onStartStopTimer');
                    this.timerId = setInterval(() => {
                        this.targetOnFocus.passedTime++
                        this.$emit('onPassedTimeChange', this.targetOnFocus)
                        }, 1000);
                    
                }
                else {
                    e.target.innerText = "start";
                    this.onTimer = false;
                    clearInterval(this.timerId);
                    this.$emit('onStartStopTimer');
                }
            },
        removeTarget() {
            if (!this.onTimer){
                this.$store.dispatch('removeTarget', this.targetOnFocus.id);
            }
        }
    }
}
</script>

<style>

</style>