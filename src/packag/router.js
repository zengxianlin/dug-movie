/*
* @Author: zengxianlin
* @Date:   2017-07-21 11:39:52
* @Last Modified by:   877529974@qq.com
* @Last Modified time: 2017-08-02 17:43:16
*/
import Vue from 'vue'
import Router from 'vue-router'
// import NProgress from 'nprogress'; // Progress 进度条
import store from './store/index'
import * as type from './store/type'
import login from './../views/login.vue'
import movie from './../views/movie.vue'
import movieDetails from './../views/movieDetails.vue'
import personal from './../views/personal.vue'

Vue.use(Router)

const router = new Router({
    scrollBehavior:() => ({ y : 0 }),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/movie',
            name: 'movie',
            component: movie
        },
        {
            path: '/movieDetails/:movieID',
            name: 'movieDetails',
            meta: {
                requireAuth: true,
            },
            component: movieDetails
        },
        {
            path: '/personal',
            name: 'personal',
            meta: {
                requireAuth: true,
            },
            component: personal
        },
        {
            path: '/', //其他页面，强制跳转到登录页面
            component: movie
        },
        {
            path: '*',
            redirect: 'movie'
        }
    ]
});

/* 页面刷新时，重新赋值token */
if (window.sessionStorage.getItem('token')) {
    store.commit(type.USER_LOGIN, window.sessionStorage.getItem('token'));
}

/* 路由跳转 检测是否带有token */
router.beforeEach((to, from, next) => {
    // NProgress.start(); // 开启Progress
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
           next();
        }
        else {
           next({
               path: '/login',
               query: {redirect: to.fullPath}
           })
        }
    }
    else {
        // NProgress.done();
        next();
    }
});

router.afterEach(() => {
  // NProgress.done(); // 结束Progress
});

export default router;
