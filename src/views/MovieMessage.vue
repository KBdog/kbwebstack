<template>
    <div class="movie">
        <!--搜索框-->
        <div class="handle-box">
            <el-row :gutter="0" type="flex" align="middle" justify="center">
                <!--输入框-->
                <el-col :span="15">
                    <el-input v-model="keyword" placeholder="数据源:豆瓣，搜索电影、电视剧、动画" class="handle-input mr10" @keyup.enter.native="search(keyword)"></el-input>
                </el-col>
                <!--搜索按钮-->
                <el-col :span="2">
                    <el-button type="primary" icon="el-icon-search" @click="search(keyword)">搜索</el-button>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-row v-if="isSearch===true" type="flex" justify="center">
                <p class="keyword-label">
                    你搜索了关键词:{{keywordLabel}},共{{mediaList.length}}个结果
                </p>
            </el-row>
            <!--影视卡片-->
            <div class="movie-list">
                <div class="movie-item-list" v-if="isSearch===true">
                    <MovieCard v-for="(media,index) in mediaList" :media="media" :key="index"></MovieCard>
                </div>
            </div>

            <!--加载loading框-->
            <div style="padding-top: 50px"
                 v-loading="isLoading"
                 element-loading-text="搜索影视中.."
                 element-loading-spinner="el-icon-loading">
            </div>
        </div>
    </div>
</template>

<script>
    import host from "../api/HostAddress.vue";
    import MovieCard from "../components/movie/MovieCard";
    export default {
        name: "MovieMessage",
        components:{MovieCard},
        methods:{
            initData(){
                const _this=this;
                //是否加载动画
                _this.isLoading=false;
                //是否搜索
                _this.isSearch=false;
                //搜索关键字
                _this.keyword='';
                //keyword标签
                _this.keywordLabel='';
                //movie列表
                _this.mediaList=[];
            },
            search(keyword){
                const _this=this;
                var timestamp=new Date().getTime();
                var uri="api/douban/search";
                var token=_this.getToken(timestamp,"/"+uri);
                _this.initData();
                keyword=keyword.trim();
                if(keyword==''){
                    _this.$message.error("搜索关键词为空！");
                    return;
                }
                _this.isLoading=true;
                _this.isSearch=true;
                _this.keywordLabel=keyword;
                var finalKeyword=keyword.replaceAll(/[\[\]\/\\%&',;=?$~#^*!\x22]+/g," ");
                _this.$axios.get(`${host.scheme}://${host.host}/${uri}`,{
                    params:{
                        keyword:finalKeyword,
                        x_timestamp:timestamp,
                        x_token:token
                    }
                }).then(function(response){
                    if(response.data.code==200){
                        var tmpMediaArray=response.data.data.list;
                        _this.mediaList=tmpMediaArray;
                    }
                    //是否加载动画
                    _this.isLoading=false;
                }).catch(error=>{
                    _this.$message.error(""+error);
                    //是否加载动画
                    _this.isLoading=false;
                })
            }
        },
        data(){
            return{
                //是否加载动画
                isLoading:false,
                //是否搜索
                isSearch:false,
                //搜索关键字
                keyword:'',
                //keyword标签
                keywordLabel:'',


                mediaList:[
                    {
                        mediaId:"1432146",
                        mediaType:"movie",
                        mediaTitle:"钢铁侠",
                        mediaSubtitle:"美国 / 动作 冒险 科幻 / 乔恩·费儒 / 小罗伯特·唐尼 泰伦斯·霍华德",
                        mediaYear:"2008",
                        mediaCover:"https://qnmob3.doubanio.com/view/photo/large/public/p725871968.jpg?imageView2/0/q/80/w/9999/h/120/format/webp",
                        commentNum:513568,
                        ratingPoint:8.3,
                        rating:true
                    },
                    {
                        mediaId: "3231742",
                        mediaType: "movie",
                        mediaTitle: "钢铁侠3",
                        mediaSubtitle: "美国 中国大陆 / 动作 科幻 / 沙恩·布莱克 / 小罗伯特·唐尼 盖·皮尔斯",
                        mediaYear: "2013",
                        mediaCover: "https://qnmob3.doubanio.com/view/photo/large/public/p1955027201.jpg?imageView2/0/q/80/w/9999/h/120/format/webp",
                        commentNum: 384537,
                        ratingPoint: 7.8,
                        rating: true
                    },
                    {
                        mediaId: "3184594",
                        mediaType: "tv",
                        mediaTitle: "龙与虎",
                        mediaSubtitle: "日本 / 动画 喜剧 爱情 / 长井龙雪 笠井贤一 樱美胜志 铃木洋平 桥本敏一 高岛大辅 三木俊明 石田畅 青井小夜 雄谷将仁 久保山英一 浅野胜也 斋藤德明 山崎茂 / 钉宫理惠 间岛淳司",
                        mediaYear: "2008",
                        mediaCover: "https://qnmob3.doubanio.com/view/photo/large/public/p2259688836.jpg?imageView2/0/q/80/w/9999/h/120/format/webp",
                        commentNum: 40858,
                        ratingPoint: 8.8,
                        rating: true
                    },
                    {
                        mediaId: "27104422",
                        mediaType: "tv",
                        mediaTitle: "钢铁侠：装甲冒险 第二季",
                        mediaSubtitle: "美国 / 剧情 动画",
                        mediaYear: "2011",
                        mediaCover: "https://qnmob3.doubanio.com/view/photo/large/public/p2494974580.jpg?imageView2/0/q/80/w/9999/h/120/format/webp",
                        commentNum: null,
                        ratingPoint: null,
                        rating: false
                    },
                    {
                        title:"movie5"
                    },
                    {
                        title:"movie6"
                    },
                    {
                        title:"movie7"
                    },
                    {
                        title:"movie8"
                    },
                ]
            }
        }
    }
</script>

<style scoped>
    .movie-list{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .movie-item-list{
        width: 80%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        /*justify-content: space-between;*/
    }
    .keyword-label{
        color: #FF69B4;
        font-weight: 800;
        padding-bottom: 20px;
    }
    .movie{
        padding: 20px;
    }
    .handle-box{
        padding: 20px;
    }
    .keyword-label{
        color: #FF69B4;
        font-weight: 800;
        padding-bottom: 20px;
    }
</style>
