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
      },
      UPDATE_TARGET_TIME(state, target) {
        state.targets.filter(t => t.id == target.id)[0].timePassed = target.timePassed;
      },
      UPDATE_TARGET(state, target) {
        const updating = state.targets.filter(t => t.id == target.id)[0]
        updating.name = target.name
        updating.timeTarget = target.timeTarget
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
        },
        async updateTargetTime({commit}, targetToUpdate) {
          
          firebase.database().ref('targets/' + targetToUpdate.id).update({
            timePassed: targetToUpdate.timePassed
          }, (error) => {
            if (error) {
              console.log("can't update time: " + error);
            } else {
              commit('UPDATE_TARGET_TIME', targetToUpdate);
            }
          });
        },
        async updateTarget({commit}, targetToUpdate) {
          await firebase.database().ref('targets').child(targetToUpdate.id).update({
            timePassed: targetToUpdate.timePassed,
            name: targetToUpdate.name,
            timeTarget: targetToUpdate.timeTarget
          }, (error) => {
            if (error) {
              console.log("can't update target: " + error);
            } else {
              commit('UPDATE_TARGET', targetToUpdate);
            }
          })
        }
    },
    getters: {
      getTargets(state, getters) {
        return state.targets.filter(target => {          
          return target.userId == getters.user.id
        });
      }
    }
}