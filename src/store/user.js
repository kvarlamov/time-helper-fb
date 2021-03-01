import firebase from 'firebase/app';
import User from '../user_help'

export default {
    state: {
        user: null
      },
    mutations: {
      SET_USER(state, user) {
        state.user = user;
        console.log(state.user);
      }
    },
    actions: {
      async registerUser({commit}, {email, password}){
          return await firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
              commit('SET_USER', new User(user.user.uid));
          }).catch(error => {throw new Error(error.message)});
      },
      async loginUser({commit}, {email, password}){            
          return await firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
              commit('SET_USER', new User(user.user.uid));
          }).catch(error => {throw new Error(error.message)});
      },
      loggedUser({commit}, user) {
        return commit('SET_USER', new User(user.uid));
      },
      logoutUser({commit}) {
        return commit('SET_USER', null);
      }
    },
    getters: {
      user(state) {
          return state.user;
      },
      checkUser(state) {
          return state.user !== null;
      }
    }
}