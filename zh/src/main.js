// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//sweetalert
import swal from 'sweetalert'
Vue.prototype.$swal=swal
//animate.css
import 'animate.css'

//jqeury
import jquery from 'jquery'
Vue.prototype.$=jquery
// Vue.use(vue-jquery)

//组件集合
import comm from './components/common'
for(let i in comm){
  Vue.component(i,comm[i])
}
//过滤器集合
import Filter from './filter'
for(let f in Filter){
  Vue.filter(f,Filter[f])
}

//axios
import axios from 'axios'
Vue.prototype.$http=axios

//mint手机端框架
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);







/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
