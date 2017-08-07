/*
* @Author: zengxianlin
* @Date:   2017-07-21 14:38:16
* @Last Modified by:   877529974@qq.com
* @Last Modified time: 2017-08-03 22:14:42
*/
import Vue from 'vue'
import * as type from './type';

export default {
    [type.USER_LOGIN]: (state, user) => {
        if(user === 'undefined'){
            return false;
        }
        if (window.sessionStorage.getItem('token')) {
            state.token = window.sessionStorage.getItem('token');
        }else{
            state.token = user;
            sessionStorage.setItem('token', JSON.stringify(user.token));
        }
        //Object.assign(state, user);
    },
    [type.USER_LOGOUT]: (state) => {
        state.token = null;
        sessionStorage.removeItem('user');
        Object.keys(state).forEach(k => Vue.delete(state, k));
    },
    [type.Loading]: (state, data) => {
        state['loading'] = data;
    },
    [type.GETSHOWING]: (state, data) => {
        state['totalShow'] = data.total;
        for(let i in data.subjects){
            state['getShowing'].push(data.subjects[i]);
        }
    },
    [type.GETUPCOMING]: (state, data) => {
        state['totalUpcom'] = data.total;
        for(let i in data.subjects){
            state['getUpcoming'].push(data.subjects[i]);
        }
    },
    [type.GETMOVIEDETAILS]: (state, data) => {
        state['movieDetails'] = data;
    }
}