/*
* @Author: zengxianlin
* @Date:   2017-07-21 14:41:52
* @Last Modified by:   877529974@qq.com
* @Last Modified time: 2017-08-03 21:23:03
*/
import axios from 'axios'
import * as type from './type'
export default {
    // 登录
    [type.USER_LOGIN]({commit}, user) {
        commit(type.USER_LOGIN, user)
    },
    // 退出
    [type.USER_LOGOUT]({commit}) {
        commit(type.USER_LOGOUT)
    },
    // 加载器
    [type.Loading]({commit}, data) {
        commit(type.Loading, data)
    },
    // 正在上映
    [type.GETSHOWING]({commit}, state){
        axios.get('v2/movie/in_theaters?start='+state).then((response)=>{
            if(response.data.subjects != ''){
               commit(type.GETSHOWING,response.data);
            }
        });
    },
    // 即将上映
    [type.GETUPCOMING]({commit}, state){
        axios.get('v2/movie/coming_soon?start='+state).then((response)=>{
            if(response.data.subjects != ''){
               commit(type.GETUPCOMING,response.data);
            }
        });
    },
    // 电影详情
    [type.GETMOVIEDETAILS]({commit}, state){
        axios.get('v2/movie/subject/'+state).then((response)=>{
            if(response.data != ''){
                commit(type.GETMOVIEDETAILS,response.data);
            }
        });
    },
}
