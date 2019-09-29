// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// elementui引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from "axios"
Vue.prototype.$axios=axios

const qs=require("querystring")
Vue.prototype.$qs=qs

import Cookie from "js-cookie"
Vue.prototype.$Cookie=Cookie

import store from "./store/store"
Vue.prototype.$store=store

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
