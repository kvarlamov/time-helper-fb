/* eslint-disable no-unused-vars */
import Target from './target_help';
import firebase from 'firebase/app';

export default {
    state: {
        targets: []
      },
    mutations: {
      LOAD_TARGETS(state, targets) {
        state.targets = [...targets];        
      },
      ADD_NEW_TARGET(state, target) {
        console.log('target to push' + target);
        state.targets.push(target);
      }
    },
    actions: {
        async loadTargets({commit}, targets){
          
        },
        async addTarget({commit, getters}, targetToAdd) {
          const newTarget = new Target(
            targetToAdd.id,
            targetToAdd.name,
            targetToAdd.timeTarget,
            targetToAdd.timePassed,
            getters.user.id
          )

          const target = await firebase.database().ref('targets').push(newTarget);
          commit('ADD_NEW_TARGET', newTarget);
        },
        async removeTarget() {

        }
    },
    getters: {      
      getLastTargetId(state) {
        if (state.targets.length == 0) {
          return 1;
        } else {          
          return state.targets.slice(-1)[0].id + 1;
        }
      }
    }
}