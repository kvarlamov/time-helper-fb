<template>  
    <div>        
        <div style="display: block;
                    position: relative;
                    margin: 40px 0;">
            <div class="style1">
                <CurrentTarget :targetOnFocus=selected @onStartStopTimer="onStartStopTimer()"></CurrentTarget>
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
                    <tr v-for="t in getTargets" :key="t.id" class="target-table-tr" @click="selectTarget($event, t.id)">
                        <td>{{ t.name }}</td>
                        <td>{{ t.time }}</td>
                        <td>{{ t.timePassed | timeFormatter }}</td>
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
                <p v-if="errors.length">
                    <ul>
                        <li v-for="error in errors" :key="error">{{error}}</li>
                    </ul>
                </p>
            </form>
        </div>
    </div>  
</template>

<script>
import CurrentTarget from './CurrentTarget'
//import { mapState } from 'vuex';


export default {
  components: {
      CurrentTarget
  },
  name: 'MainLogic',
  props: {
    targetToCreate:{
      type: Object,
      default: () => ({
          name: "",
          time: 0
      })
    },
    targetId: {
      Type: Number,
      default: 0
      }
  },
  data: function(){
      return {
          targetComponentId: this.targetId, //get last id of last target
          selected: null,
          onTimer: false,
          errors: []
      }
  },
  computed: {
    getTargets() {
        return this.$store.getters.getTargets;
    }},
  methods: {
            addTarget() { 
                if (!this.checkForm())
                    return;
                let newTarget = {
                    id: "targt" + this.targetComponentId++, 
                    name: this.targetToCreate.name, 
                    timeTarget: this.targetToCreate.time, 
                    timePassed: +0
                };

                this.$store.dispatch('addTarget', newTarget);
                console.log('last target id now is: ' + this.getLastId);
                this.targetToCreate.name = "";
                this.targetToCreate.time = 0;
            },
            selectTarget(e, id) {
                if (!this.onTimer) {
                    const tableRows = document.querySelectorAll('#target-table > tbody > tr');
                    tableRows.forEach(el => el.style.background = 'none');
                    e.target.parentNode.style.background = 'yellow';
                        
                    this.selected = this.getTargets.filter(t => t.id == id)[0];
                }
            },
            onStartStopTimer() {
                this.onTimer = !this.onTimer;
                this.$store.dispatch('updateTargetTime', this.selected);
            },
            checkForm() {
                if (this.targetName && this.targetTime) {
                    return true;
                }

                this.errors = []

                if (!this.targetName){
                    this.errors.push('Name is required')
                }
                return false;
            }
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>    
    .style1{
        display: inline-block;
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
    
    
    .active-btn{
        background:green;
        
    }
    .inactive-btn{
        background: lightgray;
    }    
</style>
