import ApiService from '~/services/api.js'
import Vue from 'vue'

export default function (context, inject) {
  const api = new ApiService(context.$http, true)
  Vue.prototype.$api = api
  inject('api', api)
}
