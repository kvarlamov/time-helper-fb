<template>  
    <div>
        <h1 class="rotate">Time helper</h1>
        <div style="display: block;
                    position: relative;
                    margin: 40px 0;">
            <div class="style1">
                <CurrentTarget :targetOnFocus=selected @onPassedTimeChange="onTimeChange" @onStartStopTimer="onStartStopTimer()"></CurrentTarget>
            </div>
            <br/>            
            <table id="target-table">
                <thead>
                    <tr>
                        <th>Target</th>
                        <th>Time target</th> 
                        <th>Now</th>
                        <!-- <th></th> -->
                    </tr>
                </thead>
                <tbody> 
                    <tr v-for="t in targets" :key="t.id" class="target-table-tr" @click="selectTarget($event, t.id)">
                        <td>{{ t.name }}</td>
                        <td>{{ t.time }}</td>
                        <td>{{ t.passedTime }}</td>
                        <!-- <td><button @click="startTimer($event)" :id="t.id" class="start-stop-btn">start</button></td> -->
                    </tr>
                </tbody>
            </table>            
            <h3>Print your target name and time below</h3>
            <form action="">
                <div class="style2">
                    <label for="targetName">Target: </label>
                    <input type="text" name="targetName" id="target-name" v-model="targetToCreate.name">
                </div>
                <div class="style2">
                    <label for="targetTime">Time: </label>
                    <input type="text" name="targetTime" id="target-time" v-model="targetToCreate.time">
                </div>
                <button @click.prevent="addTarget">Save</button>
            </form>
        </div>
    </div>  
</template>

<script>
import CurrentTarget from './CurrentTarget'

export default {
  components: {
      CurrentTarget
  },
  name: 'MainLogic',
  props: {
    targets:{
      type: Array,
      default:() => []
    },
    targetToCreate:{
      type: Object,
      default: () => ({
          name: "", 
          time: 0,          
          timerId: 0,          
      })
    },
    targetId: {
      Type: Number,
      default: 0
      }
  },
  data: function(){
      return {
          targetComponentId: this.targetId,          
          timerId: 0,
          selected: null,
          onTimer: false
      }
  },
  methods: {
            addTarget() { 
                let newTarget = {...this.targetToCreate, passedTime: +0, id: "targt" + this.targetComponentId++};
                this.targets.push(newTarget);
                this.targetToCreate.name = "";
                this.targetToCreate.time = 0;
            },
            selectTarget(e, id) {
                if (!this.onTimer) {                    
                    e.target.parentNode.style.background = 'yellow';                   
                        
                    const target = this.targets.filter(t => t.id == id)[0];
                    this.selected = {...target};
                }                
            },
            onTimeChange(target) {
                const selectedTarget = this.targets.filter(t => t.id == target.id)[0];
                selectedTarget.passedTime = target.passedTime;
            },
            onStartStopTimer() {
                this.onTimer = !this.onTimer;               
            }
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>    
    .style1{
        display: inline-block;
    }
    .style2{
        display: flex;
        margin: 10px 0;
    }
    .style2> label{
        width: 60px;
    }
    table{
        width:100%; 
        margin-top: 3em;
        margin-bottom: 3em;
    }
    table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
    } 
    .wrapper {  
        width: 300px;
        min-height: 250px;
        position: relative;
        padding: 15px;
        color: rgba(black, 0.5);
        font-size: small;
        display: inline-block;
    }  
    
    h1{
        position: absolute;
        bottom: 0;
        left: 0;
        margin-left: -30px;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 3px;
        text-transform: uppercase;
        background: #369;
        color: #fff;
        padding: 5px 10px;
        margin: 0 0 10px 0;
        line-height: 24px;
    }
    .rotate {
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
    .active-btn{
        background:green;
        
    }
    .inactive-btn{
        background: lightgray;
    }
    .target-table-tr:hover {
        background: yellow;
    }
</style>
