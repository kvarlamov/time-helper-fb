<template>
  <div v-if="targetOnFocus">      
      <h1>Target name: {{targetOnFocus.name}}</h1>
      <p>Target time: {{targetOnFocus.time}}</p>
      <p>Elapsed time: {{targetOnFocus.passedTime}}</p>
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
                console.log(e);             
                // const trgtBtn = this.targets.filter(btn => btn.id == e.target.id)[0];
                if (!this.onTimer){
                    e.target.innerText = "stop";
                    this.onTimer = true;
                    this.timerId = setInterval(() => {
                        this.targetOnFocus.passedTime++
                        this.$emit('onPassedTimeChange', this.targetOnFocus)
                        }, 1000);

                    // e.target.classList.add('active-btn');                    
                    // this.timerCompOn = true;  
                    // console.log(trgtBtn);
                    
                }
                else {
                    e.target.innerText = "start";
                    this.onTimer = false;
                    clearInterval(this.timerId);
                    // e.target.classList.remove("active-btn"); 
                    // btns.forEach(b => {
                    //     b.classList.remove("inactive-btn");
                    //     b.disabled = false;
                    // });                   
                    // this.timerCompOn = false;
                    
                }
            }
    }
}
</script>

<style>

</style>