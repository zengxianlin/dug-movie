import Vue from 'vue'
import App from './App.vue'
import router from './packag/router'     // 路由
import store from './packag/store/index'     // vuex
import './packag/axios'     // Vue.prototype.$ajax = axios;
import './packag/loading/index'     // loading 加载器
import './packag/mint-ui'     // 引入 mint-ui
import './packag/wrap/util'     // 自定义插件
import Scroll from 'vue-infinite-scroll'
Vue.use(Scroll)

import './assets/css/base.css'; //引入初始化.css
import './assets/css/public.css'; //引入公共样式.css
import './assets/css/iconfont.css'; //引入全局的自定义icon
// import './assets/css/nprogress.css'; // Progress 进度条 样式
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
