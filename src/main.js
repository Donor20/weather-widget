import Vue from 'vue'
import App from './App.vue'

// bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

import store from './store/index'
App.store = store;

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);

Vue.customElement('weather-widget', App);
