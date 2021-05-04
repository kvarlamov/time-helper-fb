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
      },
      REMOVE_TARGET(state, targets) {
        state.targets = [...targets];
      }
    },
    actions: {
        async loadTargets({commit}) {
          try{
            const target = await firebase.database().ref('targets').once('value');
            const targets = target.val();
            const targetsArray = [];
            Object.keys(targets).forEach(key => {
              const t = targets[key];
              targetsArray.push(
                new Target(
                  key,
                  t.name,
                  t.timeTarget,
                  t.timePassed,
                  t.userId
                )
              )
            })
            commit('LOAD_TARGETS', targetsArray);
          }
          catch(error) {
            console.log(error)
          }          
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
          console.log(target);
          commit('ADD_NEW_TARGET', {
            ...newTarget,
            id: target.key
          });
        },
        async removeTarget({commit, getters}, id) {
          try{
            console.log("vuex: " + id);
            await firebase.database().ref('targets').child(id).remove();
            const filtered = getters.getTargets.filter(t => t.id != id);
            commit('REMOVE_TARGET', filtered);
          }
          catch{
            console.log("can't remove target");
          }
        }
        //,
        // async updateTarget() {
        //   const target = await firebase.datebase().ref('targets').child(id).update({
        //     title,
        //     targetTime
        //   })          
        // }
    },
    getters: {
      getTargets(state, getters) {
        return state.targets.filter(target => {          
          return target.userId == getters.user.id
        });
      }
    }
}