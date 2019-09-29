import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex)

import axios from "axios"
import Cookie from "js-cookie"
const qs = require('querystring')


const store = new Vuex.Store({
  state: {
    user: {
      username: Cookie.get('username'),
      useraccount:Cookie.get('account'),
      token: Cookie.get('token')
    }
  },
  mutations: {
    addinfo(state) {
        state.user.username=Cookie.get('username')
        state.user.useraccount=Cookie.get('account')
        state.user.token=Cookie.get('token')
    },
    delinfo(state, payload) {
      state.user.username = ""
      state.user.useraccount = ""
    //   state.user.useraccount = payload.account
      console.log(payload)
    },
    

  },
  actions: {
    adduser({commit}, userinfo) {
      Cookie.set("username", userinfo.user.name)
      Cookie.set("token", userinfo.token)
      Cookie.set("account", userinfo.user.account)
    //   commit("upname",userinfo.user)
    },
    deldata_info({commit},username1) {
        commit("delinfo","")
    }
  }
})
export default store
