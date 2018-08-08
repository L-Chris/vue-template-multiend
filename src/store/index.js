import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

let baseModule = {
  state: {
    user: {}
  },
  getters: {
    isVip (state) {
      return state.user.isVip
    }
  },
  mutations: {
    [types.SET_USER] (state, data) {
      state.user = data
    }
  },
  actions: {
    async findUser ({commit}, params) {}
  },
  modules: {},
  strict: process.env.NODE_ENV !== 'production'
}

export default modules => {
  for (let key in modules) {
    if (!baseModule.modules[key]) baseModule.modules[key] = modules[key]
  }
  return new Vuex.Store(baseModule)
}
