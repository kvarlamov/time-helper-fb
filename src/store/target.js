/* eslint-disable no-unused-vars */
export default {
    state: {
        targets: []
      },
    mutations: {
      LOAD_TARGETS(state, targets) {
        state.targets = [...targets];        
      }
    },
    actions: {
        async loadTargets({commit}, {email, password}){
            
        },
        async addTarget() {

        },
        async removeTarget() {

        }
    },
    getters: {
      targets(state) {
          return state.user;
      }
    }
}