/* eslint-disable import/first */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import './assets/css/bootstrap.css'
import './assets/css/icons.css'
// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  /* eslint-disable no-unused-vars */
  Button,
  ActionSheet,
  Scroll,
  Slide,
  Sticky,
  ScrollNav
} from 'cube-ui'

Vue.use(Button)
Vue.use(ActionSheet)
Vue.use(Scroll)
Vue.use(Slide)
Vue.use(Sticky)
Vue.use(ScrollNav)

import {Range, Badge, Toast} from 'mint-ui'
Vue.component(Range.name, Range);
Vue.component(Badge.name, Badge);

function ToastErro (notice) {
  if (notice === '') {
    return
  }
  Toast({
    message: notice,
    iconClass: 'glyphicon glyphicon-remove'
  })
}
function ToastSucceed (notice) {
  if (notice === '') {
    notice = '操作成功！'
  }
  Toast({
    message: notice,
    iconClass: 'glyphicon glyphicon-ok'
  })
}
// 错误提示
Vue.prototype.$erroNotice = ToastErro
// 成功提示
Vue.prototype.$succeedNotice = ToastSucceed

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
