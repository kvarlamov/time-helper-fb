<template id="modal-template">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  default header
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  <form action="" slot="body">
                    <div class="style2">
                        <label for="targetName">Target: </label>
                        <input type="text" name="targetName" id="editing-name" v-model="editingClone.name">
                    </div>
                    <div class="style2">
                        <label for="targetTime">Time: </label>
                        <input type="text" name="targetTime" id="editing-time" v-model="editingClone.time">
                    </div>
                </form>
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  default footer
                  <button class="modal-default-button" @click="okAndClose()">
                    OK
                  </button>
                  <button class="modal-default-button" @click="cancel()">
                    Cancel
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>

<script>
export default {
    name: 'Modal',
    props:{
        editing: {
            type: Object
        }
    }, 
    data() {
      return {
        editingClone:JSON.parse(JSON.stringify(this.editing))
      }
    },
    methods: {
        cancel() {
            this.$emit('onCloseModal')
        },
        okAndClose() {            
            this.$store.dispatch('updateTarget', this.editingClone)
              .then(() => {this.$emit('onCloseModal')})
              .catch((e) => console.log("error on updating in modal: " + e))
        }
    }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>