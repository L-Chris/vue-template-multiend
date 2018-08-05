import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
    isVip (state) {
      return state.user.isVip && state.user.vipType === 'is_vip'
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
})
