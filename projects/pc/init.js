import Vue from 'vue'
import App from './App'
import initBase from '@'
import router from './router'
// import initStore from '@/store'
// import * as storeModules from './store/modules'

export default () => {
  initBase(Vue)
  const store = initStore(storeModules)

  Vue.config.productionTip = false

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    // store,
    render: h => h(App)
  })
}
