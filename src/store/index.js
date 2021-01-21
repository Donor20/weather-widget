import Vue from 'vue'
import Vuex from 'vuex'
import Cities from './modules/cities'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    cities: Cities
  },
  strict: process.env.DEV
});

export default store
