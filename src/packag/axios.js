/*
* @Author: zengxianlin
* @Date:   2017-07-21 11:43:30
* @Last Modified by:   877529974@qq.com
* @Last Modified time: 2017-08-03 21:15:45
*/
import Vue from 'vue'
import axios from 'axios'
import router from './router'
import store from './store/index.js'
import type from './store/type.js'
import { MessageBox } from 'mint-ui';



// axios 配置
axios.defaults.baseURL = 'http://localhost:8080/api/';  //配置地址
axios.defaults.timeout = 5000;   //请求时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.params = {apikey:'0b2bdeda43b5688921839c8ecb20399b',count:15};

// axios.request 拦截器
axios.interceptors.request.use(
    config => {
        store.dispatch('Loading',true);
        console.log("发送请求！");
        // if(config.data == undefined){
        //     store.dispatch('Loading',false);
        //     MessageBox('系统提示','错误指令：请求服务异常');
        // }
        // if(store.state.token) {
        //     config.headers.Authorization = `token ${store.state.token}`;
        // }
        // config.headers.Authorization = 'token'
        return config;
    },
    err => {
        console.log(err);
        return Promise.reject(err);
});

// axios.request 拦截器
axios.interceptors.response.use(
    response => {
        store.dispatch('Loading',false);
        console.log("请求回来！");
        return response;
    },
    error => {
        if (error.response) {
            console.log(error)
            switch (error.response.status) {
                case error.response.status:
                    // 401 清除token信息并跳转到登录页面
                    store.dispatch('USER_LOGOUT');
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    });
                    MessageBox('系统提示','错误指令：'+error.response.status);
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response)
});

Vue.prototype.$ajax = axios;
