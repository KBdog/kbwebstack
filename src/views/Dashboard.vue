<template>
    <div class="dashboard">
        <el-container>
            <el-main>
                <div style="display: flex;flex-direction: row;justify-content: center">
                    <el-alert
                            title="公告"
                            type="info"
                            center="true"
                            effect="dark"
                            show-icon
                            style="margin-bottom: 20px;width: 55%"
                            :description="announcement">
                    </el-alert>
                </div>

                <!--轮播图-->
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div class="block">
                            <el-carousel :interval="3000" type="card" height="42vh">
                                <el-carousel-item v-for="(page, index) in news" :key="index">
                                    <div class="pic-page">
                                        <img :src="page.cover" @click="goToNews(page.link)">
                                        <h3>{{page.title}}</h3>
                                    </div>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </el-col>
                </el-row>
                <!--功能卡片-->
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4" v-for="(page,index) in pages" :key="index">
                        <el-card class="box-card" shadow="hover">
                            <div class="category">
                                <img :src="page.cover">&nbsp;&nbsp;
                                <span class="title"> {{page.title}}</span>
                                <hr>
                            </div>
                            <p class="desc">{{page.description}}</p>
                            <p class="check">
                                <el-link type="success" v-on:click="goTo(page.path)">
                                    进入<i class="el-icon-link"></i>
                                </el-link>
                            </p>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import host from '../api/HostAddress';
    export default {
        name: "Dashboard",
        data(){
            return {
                //公告
                // announcement:"后端已部署到阿里云并做了跨域处理，现在github和gitee都能正常访问数据，可以愉快冲浪了哦~",
                announcement:"恭喜EDG获得S11全球总决赛冠军！！",
                news:[
                    {
                        cover:'https://inews.gtimg.com/newsapp_bt/0/13690243297/1000',
                        link:'https://new.qq.com/omn/20210624/20210624A04W2D00.html',
                        title:'武汉长江灯光秀庆祝建党百年'
                    },
                    {
                        cover: 'https://inews.gtimg.com/newsapp_bt/0/13658560309/1000',
                        link:'https://new.qq.com/omn/20210624/20210624A0AGPB00.html',
                        title: '航天员太空生活大揭秘：wifi覆盖、睡觉自由、“包裹式淋浴间”'
                    },
                    {
                        cover: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3745980478,1620710598&fm=55&app=54&f=JPEG?w=1140&h=640',
                        link:'https://baijiahao.baidu.com/s?id=1703419782966123468&wfr=spider&for=pc',
                        title: '北京中考作文出炉，“杂交水稻之父”袁隆平入题'
                    },
                    {
                        cover: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3583108412,3018699053&fm=55&app=54&f=JPEG?w=1140&h=640',
                        link:'https://baijiahao.baidu.com/s?id=1703443005283132582&wfr=spider&for=pc',
                        title: '快手宣布7月将取消大小周'
                    }
                ],
                pictures:[
                    require("../assets/pictures/bg1.jpg"),
                    require("../assets/pictures/bg2.jpg"),
                    require("../assets/pictures/bg3.jpg"),
                    require("../assets/pictures/bg4.jpg"),
                    require("../assets/pictures/bg5.jpg"),
                    require("../assets/pictures/bg6.jpg"),
                    require("../assets/pictures/bg7.jpg")
                ],
                pages:[
                    {
                        // cover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHifp3yHZxTm9C_AQ_ikmPfKdmah0hCTLvzw&usqp=CAU',
                        cover:require("../assets/pictures/magnet_icon.jpg"),
                        title:'磁力资源',
                        description:'可根据关键字搜索磁力资源，复制磁力链接',
                        path:'/magnet'
                    },
                    {
                        // cover:'https://github.com/KeaMedes/Cimoc/raw/master/screenshot/icon.png',
                        cover:require("../assets/pictures/cimoc_icon.png"),
                        title:'漫画爬虫',
                        description:'提供多个源站进行漫画爬虫预览',
                        path:'/comic'
                    },
                    {
                        // cover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi1B2Hy9msPiIx0XBhvP8UwYMq75xlirYwcA&usqp=CAU',
                        cover:require("../assets/pictures/media_icon.png"),
                        title:'影视资讯',
                        description:'搜索影视相关资讯',
                        path:'/movie'
                    },
                    {
                        // cover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7TUg6zUYtvavJjnbNh-4_eEuClaqoo4kgBQ&usqp=CAU',
                        cover:require("../assets/pictures/tools_icon.jpg"),
                        title:'在线工具',
                        description:'在线提供多种有用的工具',
                        path:'/tools'
                    },
                ]
            }
        },
        methods:{
            //节流函数
            throttle(fn,delay,atleast){
                /**函数节流方法
                 @param Function fn 延时调用函数
                 @param Number dalay 延迟多长时间
                 @param Number atleast 至少多长时间触发一次
                 @return Function 延迟执行的方法
                 */
                let timer = null;
                let previous = null;
                return function () {
                    var now = +new Date();
                    if ( !previous ) previous = now;
                    if ( atleast && now - previous > atleast ) {
                        fn();
                        // 重置上一次开始时间为本次结束时间
                        previous = now;
                        clearTimeout(timer);
                    } else {
                        clearTimeout(timer);
                        timer = setTimeout(function() {
                            fn();
                            previous = null;
                        }, delay);
                    }
                }
            },
            getBaiduHotSpot(){
                const _this = this;
                var timestamp=new Date().getTime();
                var uri="api/baidu/hot";
                var token=_this.getToken(timestamp,"/"+uri);
                _this.$axios.get(`${host.scheme}://${host.host}/${uri}`,{
                    params:{
                        x_timestamp:timestamp,
                        x_token:token
                    }
                }).then(function(response){
                    if(response.data!=""){
                        var newsArray=new Array();
                        let results=response.data;
                        var singleNews=null;
                        for(var i=0;i<results.length;i++){
                            singleNews=new Object();
                            singleNews.cover=results[i].coverUrl;
                            singleNews.link=results[i].contentUrl;
                            singleNews.title=results[i].title;
                            newsArray.push(singleNews);
                        }
                        _this.news=newsArray;
                        _this.$message.success("请求百度热点新闻成功!");
                    }else {
                        _this.$message.error("请不要重复请求接口!")
                    }
                }).catch(error=>{
                    _this.$message.error("请求百度热点新闻失败！" + error);
                })
            },
            goTo(path){
                this.$router.push(path);
            },
            goToNews(url){
                window.open(url);
            },
        },
        created() {
            const _this=this;
            _this.throttle(_this.getBaiduHotSpot(),200,1000);
        },
    }
</script>

<style scoped>
    .box-card {
        width: 100%;
        /*margin-bottom: 10px;*/
        margin-bottom: 0.625rem;
        /*border-radius: 6px;*/
        border-radius: 0.375rem;
    }
    .block img{
        object-fit:cover;
        width: 100%;
        height: 100%;
    }
    .category img{
        /*width: 40px;*/
        width: 2.5rem;
        /*height: 40px;*/
        height: 2.5rem;
        /*border-radius: 12.5px;*/
        border-radius: 0.78rem;
    }
    .category .title{
        /*width:36px;*/
        width:2.25rem;
        /*height: 20px;*/
        height: 1.25rem;
        font-weight: 700;
        color: #000;
        position: relative;
        /*top: -6px;*/
        top: -0.375rem;
        font-family: "Helvetica Neue";
    }
    .desc,p{
        width:100%;
        /*font-size: 14px;*/
        font-size: 0.875rem;
        /*padding-left: 10px;*/
        padding-left: 0.625rem;
    }
    .check{
        text-align: right;
        margin-bottom: 0px;
    }
    .pic-page{
        width: 100%;
        height: 100%;
    }
    .pic-page img{
        width: 100%;
        height: 100%;
    }
    .pic-page h3{
        position: absolute;
        bottom: 0px;
        color: white;
        /*text-shadow: 0 0 5px #FF0000, 0 0 5px #6bf403;*/
        text-shadow: 0 0 0.3125rem #FF0000, 0 0 0.3125rem #6bf403;
    }
</style>
