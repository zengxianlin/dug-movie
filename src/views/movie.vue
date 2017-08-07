<template>
    <div id="home" class="home">
        <div class="movie-list">
            <div class="tab-navbar">
                <mt-navbar v-model="selected">
                  <mt-tab-item id="1">正在上映</mt-tab-item>
                  <mt-tab-item id="2">即将上映</mt-tab-item>
                </mt-navbar>
                <div class="userBtn" @click="userBtn"><i class="iconfont icon-user"></i></div>
            </div>
            <div class="tab-container">
                <div class="banner" v-show="selected == '1' && getShowing != ''">
                    <mt-swipe :speed='1000' :auto="3500">
                      <mt-swipe-item v-for="(item,index) in swiperSlides" :style="{backgroundImage:'url('+item+')'}"></mt-swipe-item>
                    </mt-swipe>
                </div>
                <ul class="getShowing" v-show="selected == '1'" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="15" >
                    <li v-for="(item,index) in getShowing" @click="detailsBtn(item,selected)">
                        <div class="poster" :style="{backgroundImage:'url('+item.images.large+')'}"></div>
                        <div class="content">
                            <h2>{{item.title}}
                                <i class="iconfont icon-IMAX" v-if="Math.floor(Math.random() * 10) > index "></i>
                                <i class="iconfont icon-3D" v-else></i>
                            </h2>
                            <p class="score">
                                <i :class="['iconfont',item == 'on' ? 'icon-scoreQ' : '' ,item == 'half' ? 'icon-scoreB' : '' ,item == 'off' ? 'icon-scoreK' : '' ,]" v-for="(item,index) in itemClasses(item.rating.average)">
                                </i>
                                <em>{{item.rating.average}}</em>
                            </p>
                            <p>类型：<em v-for="(items,key) in item.genres">{{items}}  </em></p>
                            <p>导演：<em v-for="(items,key) in item.directors">{{items.name}}  </em></p>
                            <p>主演：<em v-for="(items,key) in item.casts">{{items.name}}  </em></p>
                            <div class="hot"></div>
                            <div class="mounted"></div>
                            <!-- <p>{{item.rating.average}}</p> -->
                        </div>
                    </li>
                </ul>
                <ul class="getUpcoming" v-show="selected == '2'">
                    <li v-for="(item,index) in getUpcoming" @click="detailsBtn(item,selected)">
                        <div class="poster" :style="{backgroundImage:'url('+item.images.large+')'}"></div>
                        <div class="content">
                            <h2>{{item.title}}
                                <i class="iconfont icon-IMAX" v-if="Math.floor(Math.random() * 10) > index "></i>
                                <i class="iconfont icon-3D" v-else></i>
                            </h2>
                            <p></p>
                            <p>类型：<em v-for="(items,key) in item.genres">{{items}}  </em></p>
                            <p>导演：<em v-for="(items,key) in item.directors">{{items.name}}  </em></p>
                            <p>主演：<em v-for="(items,key) in item.casts">{{items.name}}  </em></p>
                            <p>上映：<em v-for="(items,key) in item.pubdates">{{items}} </em></p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 电影详情 -->
        <!-- <transition name="movieDetails">
            <movie-details v-if="movieShow" :movieID='movieID' @movieShowBtn="movieShowBtn"></movie-details>
        </transition> -->
        <!-- <h2>首页</h2>
        <router-link to="/personal">个人中心</router-link>
        <div @click="button">退出</div> -->
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex'
    const LENGTH = 5
    const CLS_ON = 'on'
    const CLS_HALF = 'half'
    const CLS_OFF = 'off'
    export default {
        computed: {
            // 映射getters
            ...mapGetters(['getShowing','getUpcoming'])
        },
        data(){
            return {
                selected: '1',
                movieList:[],
                movieShow:false,
                movieDetails:'',
                swiperSlides:[
                    'https://gw.alicdn.com/tfs/TB1uymVSpXXXXXVaVXXXXXXXXXX-1280-520.jpg_720x720Q30.jpg',
                    'https://gw.alicdn.com/tfs/TB1WPHfSpXXXXclaFXXXXXXXXXX-1280-520.jpg_720x720Q30.jpg',
                    'https://gw.alicdn.com/tfs/TB1q7_4SpXXXXcNXpXXXXXXXXXX-1280-520.jpg_720x720Q30.jpg',
                ],
                scroll:false,
                busy:false,
                count:0,
            }
        },
        created(){
            this.GETSHOWING(0);
        },
        watch:{
            selected(val){
                this.selected = val;
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                if(val == 1){
                    if(this.getShowing == ''){
                        this.GETSHOWING();
                    }
                }else{
                    if(this.getUpcoming == ''){
                        this.GETUPCOMING();
                    }
                }

            },
            getShowing(val){
                console.log(val);
            },
            getUpcoming(val){
                console.log(val);
            }
        },
        methods:{
            ...mapActions([
              'USER_LOGOUT',    // 映射 this.USER_LOGOUT() 为 this.$store.dispatch('USER_LOGOUT')
              'GETSHOWING',
              'GETUPCOMING'
            ]),
            // 下拉刷新
            loadMore(){
                this.busy = true;
                console.log(this.$store.state.totalShow,this.getShowing.length);
                if(this.$store.state.totalShow <= this.getShowing.length){
                  this.busy = false;
                  return false;
                }
                this.busy = false;
                this.GETSHOWING(this.getShowing.length);
            },
            itemClasses (val) {
                let result = []
                let score = Math.floor(val) / 2
                let starOn = Math.floor(score)
                let starHalf = (score - starOn) === 0 ? 0 : 1;

                for (let i = 0; i < starOn; i++) {
                  result.push(CLS_ON)
                }
                if (starHalf === 1) {
                  result.push(CLS_HALF)
                }
                while (result.length < LENGTH) {
                  result.push(CLS_OFF)
                }
                return result
            },
            // 个人中心
            userBtn(){
                this.$router.replace({name:'personal'});
            },
            button(){
                this.$router.push({ path: '/login' })
                this.USER_LOGOUT();
            },
            // 查看详情
            detailsBtn(item){
                // 父组件传值给 子组件 :movieDetails
                this.movieID = item.id;
                this.movieShow = true;

                this.$router.replace({name:'movieDetails',params:{movieID:item.id,selected:this.selected}});
            },
            // 收到子组件传值
            movieShowBtn(val){
                this.movieShow = val;
                // document.body.style.overflow = 'auto';
            },
            movieBtn(item){
                console.log(item)
            },
        },
        mounted() {
            // 正在上映
            // this.GETSHOWING(0);
            // 即将上映
            // this.GETUPCOMING(0);
        },
    }
</script>
<style scoped>
    .tab-navbar{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 1.5625rem;
        border-bottom: 0.03125rem solid #e5e5e5;
        background-color: #fff;
        z-index: 10;
    }
    .mint-navbar{
        padding-right: 1.5625rem;
    }
    .userBtn{
        width: 1.5625rem;
        height: 1.5625rem;
        position: absolute;
        top: 0;
        right: 0;
        line-height: 1.5625rem;
        text-align: center;
        background-color:rgba(0,0,0,.009);
    }
    .tab-navbar .is-selected{
        background-color:rgba(0,0,0,.009);
    }
    .tab-container{
        padding-top:1.5625rem;
    }
    .tab-container li{
        padding:0.4rem;
        border-bottom: 0.03125rem solid #e5e5e5;
        position: relative;
    }
    .tab-container li:nth-child(2) .hot{
        position: absolute;
        top: -1px;
        right: 0.4rem;
        width:0.75rem;
        height: 1rem;
        background-image:url('./../assets/movie-hot.png');
        background-repeat:no-repeat;
        background-size:100% 100%;
    }
    .tab-container li:nth-child(4) .mounted{
        position: absolute;
        top: -1px;
        right: 0.4rem;
        width:0.75rem;
        height: 1rem;
        background-image:url('./../assets/movie-mouth.png');
        background-repeat:no-repeat;
        background-size:100% 100%;
    }
    .tab-container li > img{
        width:2.8125rem;
    }
    .poster{
        width: 2.8125rem;
        height: 3.9375rem;
        background-repeat:no-repeat;
        background-size:100% 100%;
        display: inline-block;
    }
    .content{
        float: right;
        width: calc(100% - 2.8125rem);
    }
    .content > *{
        padding-left: 0.32rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .content h2{
        font-size:0.5rem;
    }
    .content p{
        color: #8a869e;
        font-size:0.4375rem;
        padding-top: 0.1875rem;
    }
    .content .score{
        position: relative;
    }
    .score > em{
        color: #ff9900;
        /* position: absolute; */
        /* top: 0; */
        /* left: 0; */
    }
    .score i{
        margin-right: 0.125rem;
    }
    .banner{
        height: 4rem;
        color: #fff;
        font-size: 0.9375rem;
        text-align: center;
        /* margin-top:1.5625rem; */
    }
    .mint-swipe-item{
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
        -webkit-box-orient: horizontal;
        -webkit-box-pack: center;
        -webkit-box-align: center;
    }
</style>