import Vue from 'vue';
import App from './App.vue';
import router from './router';

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
  render: h => h(App)
}).$mount('#app');
