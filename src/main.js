import Vue from 'vue';
import store from './store/index'
import App from './App.vue';
import router from './router';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
// import "firebase/firestore";

Vue.config.productionTip = false;

function addZero(num) {
  return num <= 9 ? '0' + num : num;
}

Vue.filter('timeFormatter', function (t) {
  if (!t) {
      return '00:00:00';
  }            
  const seconds = Math.floor(t % 60);
  const minutes = Math.floor(t /60 % 60);
  const hours = Math.floor(t / (60 * 60) % 24)            
  
  return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
});


new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyBUD9kYKQ26P6DrQjBqgFGcwJxWeU-Jc0g",
      authDomain: "time-helper-b6956.firebaseapp.com",
      databaseURL: "https://time-helper-b6956-default-rtdb.firebaseio.com",
      projectId: "time-helper-b6956",
      storageBucket: "time-helper-b6956.appspot.com",
      messagingSenderId: "873718315988",
      appId: "1:873718315988:web:a682a0ae9f31620730b441",
      measurementId: "G-HG7M2Y29H5"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('loggedUser', user).then(() => {
          this.$router.push('/');
        });
      }
      this.$store.dispatch('loadTargets')
    });
  }
}).$mount('#app');
