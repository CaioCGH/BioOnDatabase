import Vue from 'vue'
import App from './App.vue'

import {router} from './router';
import store from './store/index';

import { BootstrapVue } from 'bootstrap-vue'
import * as VeeValidate from 'vee-validate';
import { ValidationProvider } from 'vee-validate';
import Vue2OrgTree from 'vue2-org-tree';


Vue.use(BootstrapVue);
Vue.use(Vue2OrgTree);

Vue.use(VeeValidate, { errorBagName: 'vErrors' })
Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store: store
}).$mount('#app');