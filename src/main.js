import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import api from '@/api';
import ElementUI from 'element-ui'
import './styles.scss'
import 'normalize.css';

import './common.css';
import './common.styl';

Vue.use(ElementUI)

Vue.prototype.$api = api;

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
