import Vue from 'vue'
import App from './App.vue'
import router from './router' // import the router

new Vue({
  router, // use the router
  render: h => h(App),
}).$mount('#app')
