<template>
    <div class="movieDetailsFixe">
        <div class="movieDetails">
            <!-- 电影详情 -->
            <div class="movieItem">
                <!-- <div class="returnBtn" @click="returnBtn"><i class="iconfont icon-return"></i></div> -->
                <div class="movieItemBg" :style="{backgroundImage:'url('+movieDetails.images['large']+')'}"></div>
                <div class="moviePoster">
                    <div class="poster" :style="{backgroundImage:'url('+movieDetails.images['large']+')'}" @click="playerBtn">
                        <i class="iconfont icon-player"></i>
                    </div>
                </div>
                <div class="movieIfon">
                    <h2>{{movieDetails.title}}</h2>
                    <em>{{movieDetails.aka[movieDetails.aka.length-1]}}</em>
                    <br />
                    <br />
                    <p><em v-for="(item,index) in movieDetails.genres">{{item}} </em></p>
                    <p>{{movieDetails.pubdate}} 上映</p>
                    <!-- <p><em v-for="(item,index) in movieDetails.pubdates">{{item}} </em>上映</p> -->
                    <p><em v-for="(item,index) in movieDetails.languages">{{item}} </em>| <em v-for="(item,index) in movieDetails.durations">{{item}} </em></p>
                    <p>{{movieDetails.wish_count}}人想看</p>
                </div>
            </div>
            <!-- 电影简介 -->
            <div class="movieDesc">
                <p :class="[ naked == false ? '' : 'summary']">{{movieDetails.summary}}</p>
                <div class="naked" @click="nakedBtn">{{naked == false ? '收缩' : '展开'}}</div>
            </div>
            <!-- 演员列表 -->
            <div class="movieArtists">
                <h2>演职人员</h2>
                <div class="movieContainer">
                    <ul>
                        <li v-for="(item,index) in movieDetails.casts">
                            <img :src="item.avatars.medium" alt="" />
                            <p>{{item.name}}</p>
                            <em v-if="index == 0">导演</em>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 热门评论 -->
            <div class="comments">
                <h2>热门评论<em class="comments-count">({{movieDetails.ratings_count}}条)</em></h2>
                <ul class="comments-list">
                    <li v-for="(item,index) in movieDetails.popular_comments">
                        <div class="user-avatar" :style="{backgroundImage:'url('+item.author.avatar+')'}"></div>
                        <dl>
                            <dt>
                                <span>{{item.author.name}}</span>
                                <span><i :class="['iconfont',item == 'on' ? 'icon-scoreQ' : '' ,item == 'half' ? 'icon-scoreB' : '' ,item == 'off' ? 'icon-scoreK' : '' ,]" v-for="(item,index) in itemClasses(item.rating.value)">
                                </i></span>
                            </dt>
                            <dd class="user-content">{{item.content}}</dd>
                            <dd class="comment-interact flex-box">
                                <div class="comment-time">{{item.created_at}}</div>
                                <div class="comment-msg flex-box">
                                    <div class="highlight flex-box">
                                        <i class="iconfont icon-fabulous"></i>
                                        <span class="count">{{item.rating.value}}{{Math.floor(Math.random() * 10000)}}</span>
                                    </div>
                                    <div class="reply flex-box">
                                        <i class="iconfont icon-chat"></i>
                                        <span class="count">{{item.rating.value}}{{Math.floor(Math.random() * 10000)}}</span>
                                    </div>
                                </div>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
        <div class="actions returnBtn" @click="returnBtn">返回</div>
        <!-- 播放器 -->
        <div class="player-bg" v-if="player">
            <div class="playerClose" @click="playerBtn"></div>
            <video :src="movieDetails.trailer_urls[0]"></video>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
    const LENGTH = 5
    const CLS_ON = 'on'
    const CLS_HALF = 'half'
    const CLS_OFF = 'off'
    export default{
        props:['movieID'],
        computed:{
            // 映射getters
            ...mapGetters(['movieDetails'])
        },
        data(){
            return {
                movieDate:{},
                naked:true,
                player:false,
            }
        },
        created(){

        },
        watch:{

        },
        methods:{
            ...mapActions([
                'GETMOVIEDETAILS',
            ]),
            // 评分
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
            // 打开播放器  关闭播放器
            playerBtn(){
                this.player = !this.player;
            },
            // 展开 收缩
            nakedBtn(){
                this.naked = !this.naked;
            },
            // 返回首页
            returnBtn(){
                //子组件传值 给父组件  @movieShowBtn
                // this.$emit('movieShowBtn',false);
                // this.$store.commit('GETMOVIEDETAILS','');
                this.$store.state.movieDetails = '';
                this.$router.replace({name:'movie',params:{selected:this.$route.params.selected}})
            }
        },
        mounted() {
            // 电影详情
            this.GETMOVIEDETAILS(this.$route.params.movieID);
        }
    }
</script>
<style scoped>
    .movieDetailsFixe{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #f5f5f5;
        z-index:20;
    }
    .movieDetails{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding-bottom:1.36rem;
    }
    .movieItem{
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 5.3125rem;
    }
    /* .returnBtn{
        position: absolute;
        top: 0;
        right:0;
        width:40px;
        height:40px;
        line-height:40px;
        text-align: center;
    } */
    .movieItemBg{
        position: absolute;
        width: 100%;
        height: 100%;
        background: #e2e2e2;
        background-size: 3000%;
        background-repeat: no-repeat;
        background-position-y: 40%;
        backface-visibility: hidden;
        z-index:-1;
    }
    .movieItemBg:after{
        content:'';
        position: absolute;
        top: 0;
        left: 0;
        width:100%;
        height: 100%;
        background-color:rgba(0, 0, 0, 0.5);
    }
    .moviePoster{
        width:3.1875rem;
        height: 100%;
        display: inline-block;
        margin: 0 0.5rem;
    }
    .poster{
        width:3.1875rem;
        height: 4.375rem;
        background-size: 3.1875rem 100%;
        background-color:rgba(255, 255, 255, 0.7);
        background-repeat: no-repeat;
        backface-visibility: hidden;
        position: absolute;
        left: 0.5rem;
        bottom: 0;

    }
    .icon-player{
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
           -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
             -o-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
    }
    .player-bg,.playerClose{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color:#333;
        z-index:10;
    }
    .playerClose{
        z-index:1001;
    }
    .player-bg video{
        width: 100%;
        background-color:#999;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index:1002;
        -webkit-transform: translate(-50%, -50%);
           -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
             -o-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
    }
    .movieIfon{
        width:calc(100% - 4.1875rem);
        height: calc(100% - 0.9375rem);
        margin-top: 0.9375rem;
        padding-right: 0.7rem;
        font-size:0.375rem;
        color: #fff;
        float:right;
    }
    .movieIfon h2{
        font-size:0.5rem;
        font-weight:600;
    }
    .movieIfon > *not(h2){
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .movieIfon > p{
        line-height:1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .movieDesc{
        padding: 0.4rem;
        font-size:0.4375rem;
        line-height:1.5;
        color: #333;
        background-color:#fff;
        text-align: justify;
    }
    .movieDesc .summary{
        display: -webkit-box;
        overflow: hidden;
        white-space: normal!important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .naked{
        color: #0094ed;
        text-align: center;
        padding-top:0.32rem;
        font-size:0.5rem;
    }
    .movieArtists{
        background-color:#fff;
        margin:0.4rem 0;
        padding-bottom: 0.4rem;
    }
    .movieArtists > h2{
        font-size:0.5rem;
        font-weight:600;
        line-height:1.5;
        padding: 0.3125rem 0.5rem;
        margin-bottom:0.2rem;
    }
    .movieContainer{
        position: relative;
        margin-left: 0.5rem;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .movieContainer ul {
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
    }
    .movieContainer ul li{
        width: 2.34375rem;
        /* //height: 4.53125rem; */
        vertical-align: top;
        text-align: center;
        margin-right: 0.3125rem;
        overflow: hidden;
        font-size:0.375rem;
     }
    .movieContainer ul li:last-child{
        padding-right: 0.5rem;
    }
    .movieContainer li > img{
        width: 2.34375rem;
    }
    .movieContainer li > p{
        padding-top:0.125rem;
        line-height:1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .movieContainer li > em{
        color: #999;
    }
    .comments {
        background-color: #fff;
        margin: 0.4rem 0;
    }
    .comments h2{
        font-size: 0.5rem;
        font-weight: 600;
        line-height: 1.5;
        padding: 0.3125rem 0.5rem;
        margin-bottom:0.2rem;
        vertical-align:middle;
    }
    .comments-count{
        color: gray;
        font-size: 0.375rem;
        margin-left: 0.2rem;
        display: inline-block;
    }
    .comments-list{
        margin-left: 0.5rem;
    }
    .comments-list li{
        position: relative;
        padding-bottom: 0.4rem;
    }
    .user-avatar{
        position: absolute;
        top: 0;
        left: 0;
        width: 1.0625rem;
        height: 1.0625rem;
        border-radius:50%;
    }
    .comments-list dl{
        padding-left:1.4rem;
        padding-right: 0.4rem;
        width: 100%;
    }
    .comments-list dl:after{
        content:'';
        width: 100%;
        display: inline-block;
        border-top: 1px solid #f3f3f3;
    }
    .comments-list dl i{
        margin-right: 0.1rem;
    }
    .comments-list dt{
        font-size:0.4375rem;
        font-weight:600;
        margin-bottom: 0.1rem;
    }
    .user-content{
        display: -webkit-box;
        overflow: hidden;
        white-space: normal!important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        /* max-height:1.875rem; */
        min-height:0.5rem;
        line-height:1.5;
        font-size:0.4375rem;
    }
    .comment-interact{
        margin-top: 0.2rem;
        color: #8a869e;
        font-size:0.375rem;
    }
    .comment-time {
        -webkit-flex-grow: 1;
        flex-grow: 1;
    }
    .comment-msg {
        -webkit-flex-grow: 0;
        flex-grow: 0;
    }
    .highlight{
        margin-right:0.2rem;
    }
    .comment-msg .count{
        margin-left: 0.1rem;
    }
    .actions{
        position: fixed;
        bottom:0;
        left: 0;
        width: 100%;
        height: 1.36rem;
        line-height: 1.36rem;
        font-size:0.4375rem;
        text-align: center;
        color: #fff;
        /* background-color:#ff4d64; */
        background-color:#26a2ff;
    }
</style>