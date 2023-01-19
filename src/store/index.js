import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
    redirectto(state, payload) {
      //name of page declared in router
      router.push({ name: payload });
    }
  },
  actions: {
    redirectto({ commit }, payload) {
      commit('redirectto', payload.val);
    }
  },
  modules: {
  }
})
