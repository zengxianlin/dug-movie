<template>
    <div class="login" id="login">
        <div class="portrait">
            <img src="./../assets/kedaya.png" height="140" width="140" alt="" />
        </div>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="userName"></mt-field>
        <!-- <mt-field label="密码" placeholder="请输入密码" type="password" v-model="userPassword"></mt-field> -->
        <mt-button type="primary" size="large" class="loginBtn" @click="loginBtn">登录</mt-button>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import { MessageBox } from 'mint-ui';
    export default{
        name:'login',
        data(){
            return {
                userName:'',
                userPassword:'',
            }
        },
        methods:{
            ...mapActions([
              'USER_LOGIN',    // 映射 this.USER_LOGIN() 为 this.$store.dispatch('USER_LOGIN')
            ]),
            loginBtn(){
                if(this.userName == ''){
                    MessageBox('系统提示','请输入用户名');
                    return false;
                }
                let param = {
                    userName:this.userName,
                    token:Math.random().toString(36).substr(2)
                };
                this.USER_LOGIN(param);
                sessionStorage.setItem('user',param);
                // decodeURIComponent  解码函数 对未进行解码的函数URL进行解码
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                this.$router.replace({path: redirect});
            }
        }
    }
</script>
<style type="text/css">
    .login{
        margin: 0 0.625rem;
    }
    .portrait{
        text-align: center;
        padding:1.875rem 0;
    }
    .loginBtn {
        margin-top: 0.9375rem;
    }
</style>
