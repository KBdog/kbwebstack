<template>
    <div class="movie-card"
         v-loading="isLoading"
         element-loading-text="查询该影视信息中.."
         element-loading-spinner="el-icon-loading"
        >
        <el-tooltip :content="media.mediaTitle" placement="top">
            <el-link :underline="false" v-on:click="getMediaMessage(media)">
                <el-card shadow="hover">
                <div class="movie-card-content">
                    <div class="img">
                        <img :src="media.mediaCover" width="120px" v-lazy="media.mediaCover" height="170px">
                    </div>
                    <div class="description">
                        <p class="movie-name">
                            {{media.mediaTitle}}
                        </p>
                        <div>
                            <el-tag v-if="media.mediaType==='movie'" size="medium" hit="true">电影</el-tag>
                            <el-tag v-else type="success" size="medium" hit="true">TV</el-tag>
                        </div>
                        <span class="movie-author">
                            <p style="margin-bottom: 10px">
                                年份：{{media.mediaYear}}
                            </p>
                            <!--评分-->
                            <p style="margin-bottom: 10px" v-if="media.rating===true">
                                豆瓣评分：{{media.ratingPoint}}/10 ({{media.commentNum}}人评价)
                            </p>
                            <p style="margin-bottom: 10px" v-else>
                                豆瓣评分：暂无评分
                            </p>
                            <!--副标题-->
                            <p class="keyword-class">
                                关键词：{{media.mediaSubtitle}}
                            </p>
                        </span>
                    </div>
                </div>
            </el-card>
            </el-link>
        </el-tooltip>
    </div>
</template>

<script>
    import host from "../../api/HostAddress.vue";
    export default {
        name: "MovieCard",
        props:{
            media:Object
        },
        data(){
            return{
                isLoading:false,
            }
        },
        methods:{
            getMediaMessage(media){
                const _this=this;
                _this.isLoading=true;
                _this.$axios.get(`${host.scheme}://${host.host}/api/douban/media/${media.mediaType}/${media.mediaId}`).then(function(response){
                    if(response.data.code==200){
                        var mediaMessage=response.data.data;
                        _this.$router.push({
                            name:'movieDetail',
                            params:{
                                media:mediaMessage
                            }
                        })
                    }
                    _this.isLoading=false;
                }).catch(error=>{
                    _this.$message.error(""+error);
                    _this.isLoading=false;
                })
            }
        }
    }
</script>

<style scoped>
    .movie-card{
        /*min-width: 46%;*/
        width: 16.875rem;
        padding: 10px;
        display: inline-flex;
        max-height: 20rem;
    }
    .el-link.el-link--default{
        width: 100%;
    }
    .el-link{
        display: block;
    }
    .el-card{
        width: 100%;
    }
    .movie-card-content{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
    }
    .img{
        width: 120px;
        height: 170px;
        padding-right: 20px;
    }
    .movie-name{
        width: 100%;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-size: 14px;
        font-weight: bold;
        /*min-height: 67px;*/
        min-height: 5%;
        margin-bottom: 10px;
    }
    .movie-author{
        display: block;
        font-size: 12px;
        color: #999999;
        margin-top: 1em;
    }
    .keyword-class{
        width: 100%;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
</style>
