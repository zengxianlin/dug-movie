/*
* @Author: Marte
* @Date:   2017-07-25 12:32:25
* @Last Modified by:   877529974@qq.com
* @Last Modified time: 2017-07-25 13:37:01
*/
import Vue from 'vue'
const loaddingComponent = require('./loading.vue')
const loading = {
    install: function(Vue){
        Vue.component('loading', loaddingComponent)
    }
}
Vue.use(loading)
// module.exports = loading
