<template>
  <div id="app">
      <!-- 路由 -->
      <router-view></router-view>
      <!-- loading 加载器-->
      <loading :loading="this.$store.state.loading"></loading>
      <!-- 回到顶部 -->
      <div class="backBtn" v-if="scroll" @click="backCoping">
          <i class="iconfont icon-top"></i>
      </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      scroll:false,
    }
  },
  methods:{
    // 回到顶部
    backCoping(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.scroll = false;
    },
    scrollTop(){
        if(document.body.scrollTop >= 250){
            this.scroll = true;
        }else{
            this.scroll = false;
        }
        //console.log(document.body.scrollTop)
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollTop);
  }
}
</script>