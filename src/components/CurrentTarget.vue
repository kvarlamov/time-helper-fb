<template>
  <div v-if="targetOnFocus">      
      <h1>Target name: {{targetOnFocus.name}}</h1>
      <p>Target time: {{targetOnFocus.time}}</p>
      <p>Elapsed time: {{targetOnFocus.timePassed | timeFormatter}}</p>
      <button @click="removeTarget()">Remove</button>
      <button @click="startTimer($event)">Start</button>
      <button @click="edit = !edit">Edit</button>
      <modal v-if="edit" :editing=targetOnFocus @onCloseModal='edit=false'></modal>
  </div>
</template>

<script>
import Modal from './Modal.vue'

export default {
  components: { Modal },
    name: 'CurrentTarget',
    props: {
        targetOnFocus: {
            type: Object
        }
    },
    data() {
        return {
            onTimer: false,
            timerId: 0,
            edit: false
        }
    },
    methods: {
        startTimer(e) {
                if (!this.onTimer){                    
                    e.target.innerText = "stop";
                    this.onTimer = true;
                    this.$emit('onStartStopTimer');
                    this.timerId = setInterval(() => {                        
                        this.targetOnFocus.timePassed++
                        if (this.targetOnFocus.timePassed % 30 == 0) {
                            console.log(this.targetOnFocus.timePassed)
                            this.$store.dispatch('updateTarget', this.targetOnFocus);
                        }
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