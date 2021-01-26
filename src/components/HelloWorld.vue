<template>
  <div class="hello">
    <div>
        <h1 class="rotate">Learning time helper</h1>
        <div style="display: block;
                    position: relative;
                    margin: 40px 0;">
            <div class="style1">
                <p>Set free time that you have today</p>
                <div class="style1">
                    <label for="hours">Hours</label>
                    <input type="number" name="hours" id="hours">
                    <label for="minutes">Minutes</label>
                    <input type="number" name="minutes" id="minutes">
                </div>
            </div>
            <br/>    
            <table>
                <thead>
                    <tr>
                        <th>Target</th>
                        <th>Time target</th> 
                        <th>Now</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody> 
                    <tr v-for="t in targets" :key="t.id">
                        <td>{{ t.name }}</td>
                        <td>{{ t.time }}</td>
                        <td>{{ t.passedTime }}</td>
                        <td><button @click="startTimer($event)" :id="t.id" class="start-stop-btn">start</button></td>
                    </tr>
                </tbody>                
            </table>
            <h3>Print your target name and time below</h3>
            <form action="">
                <div class="style2">
                    <label for="targetName">Target: </label>
                    <input type="text" name="targetName" id="target-name" v-model="target.name">
                </div>
                <div class="style2">
                    <label for="targetTime">Time: </label>
                    <input type="text" name="targetTime" id="target-time" v-model="target.time">
                </div>
                <button @click.prevent="addTarget">Save</button>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    targets:{
      type: Array,
      default:() => []
    },
    target:{
      type: Object,
      default: () => ({
          name: "", 
          time: 0
      })
    },            
    timerOn: {
      type: Boolean,
      default: false
      },
    targetId: {
      Type: Number,
      default: 1
      }
  },
  data: function(){
      return {
          targetComponentId: this.targetId,
          timerCompOn: this.timerOn
      }
  },
  methods: {
            addTarget() { 
                let newTarget = {...this.target, passedTime: 0, id: "btn" + this.targetComponentId++};
                this.targets.push(newTarget);
                this.target.name = "";
                this.target.time = 0;
            },
            startTimer(e) {
                const btns = Array.from(document.getElementsByClassName("start-stop-btn")).filter(b => b.id != e.target.id);
                if (!this.timerCompOn){
                    e.target.innerText = "stop";
                    e.target.classList.add('active-btn');                    
                    btns.forEach(b => {
                        b.classList.add("inactive-btn");
                        b.disabled = true;
                    });
                    this.timerCompOn = true;                    
                }
                else {
                    e.target.innerText = "start";
                    e.target.classList.remove("active-btn"); 
                    btns.forEach(b => {
                        b.classList.remove("inactive-btn");
                        b.disabled = false;
                    });                   
                    this.timerCompOn = false;                    
                }
            }
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app{
        margin: 0 auto; 
        width: 60%;
    }
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
</style>
