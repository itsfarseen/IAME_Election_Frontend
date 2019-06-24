import ApiService from '~/services/api.js'
import Vue from 'vue'

export default function (context) {
  Vue.prototype.$api = new ApiService(context.$http, true)
}
