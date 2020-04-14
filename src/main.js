import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(hljs)
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')