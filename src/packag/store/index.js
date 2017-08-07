/*
* @Author: zengxianlin
* @Date:   2017-07-21 14:36:12
* @Last Modified by:   877529974@qq.com
* @Last Modified time: 2017-08-03 21:22:20
*/
import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex);

const state = {
    user: {},
    token: null,
    loading: false,
    getShowing:[],
    getUpcoming:[],
    movieDetails:[],
    totalShow:0,
    totalUpcom:0,
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
});