/*
* @Author: zengxianlin
* @Date:   2017-07-25 13:43:08
* @Last Modified by:   877529974@qq.com
* @Last Modified time: 2017-07-25 13:50:21
*/
import Vue from 'vue';

const util = {
    /* 验证手机号 */
    isPhone:function(phone){
        return /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(phone);
    },
    /* 验证邮箱地址 */
    isEmall:function(email){
        return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email);
    },
    /* 验证密码 密码采用数字、字母、特殊字符且长度为8-16位 */
    isPassword:function(str){
        if(/^.*?[\d]+.*$/.test(str) && /^.*?[A-Za-z]/.test(str) && /^.*?[~/`!@#$%^&*()_+|{}?;:><\-\]\\[\/].*$/.test(str) && /^.{8,16}$/.test(str)) {
            return true;
        }
        return false;
    },
    /* 验证图片类型 gif|jpg|jpeg|png|GIF|JPG|PNG */
    isFile:function(file){
        let str = document.getElementById(file).value;
        if(str == ""){
            alert("请上传图片");
            return false;
        }else{
            if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(str)){
                alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
                return false;
            }
        };
    },
    /* 验证身份证 15位或者是18位 最后一位可以是X */
    isIdentity:function(str){
        return /^(\d{14}|\d{17})(\d|[xX])$/.test(str);
    },
    /* 删除字符串两侧空白字符串 */
    delTrim:function(str){
        return str.replace(/^\s+|\s+$/g,'');
    },
}

Vue.prototype.$util = util;