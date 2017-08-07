<template>
    <div class="presonal">
        <!-- <router-link to="/movie">首页</router-link> -->
        <mt-header title="个人中心">
          <router-link to="/movie" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
        <mt-cell title="用户名" :value="this.$store.state.token"></mt-cell>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                value:'',

            }
        },
    }
</script>