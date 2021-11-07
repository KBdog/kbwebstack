<template>
    <div class="chapter">
        <!--封面标题作者简介-->
        <el-row :gutter="0" type="flex" justify="center" align="middle">
            <!--封面和标题-->
            <el-col :span="22">
                <el-card shadow="hover" class="mgb20">
                    <div class="comic-title">
                        <!--封面-->
                        <div class="comic-cover" >
                            <el-image :src="media.movieCover" class="el-image-class"></el-image>
                        </div>
                        <!--漫画名和别名-->
                        <div class="comic-message">
                            <div style="margin-bottom: 30px">
                                <h2>{{media.movieName}} {{media.movieAlias}} （{{media.movieYear}}）</h2>
                            </div>
                            <div>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 20px">语言：{{languageText}}</p>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 20px">年份：{{media.movieYear}}</p>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 20px">发布日期：{{pubDateText}}</p>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 20px">关键词：{{media.movieSubtitle}}</p>
                                <div style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 20px">
                                    类型：
                                    <el-tag v-if="media.movieType==='movie'" size="medium" hit="true">电影</el-tag>
                                    <el-tag v-else type="success" size="medium" hit="true">TV</el-tag>
                                </div>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 20px">导演：{{directorsText}}</p>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 20px">上映国家：{{countriesText}}</p>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 20px">主演：{{actorsText}}</p>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 20px">时长：{{durationsText}}</p>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 20px">标签：{{tagsText}}</p>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 20px">豆瓣详情：
                                    <el-link :underline="false" v-on:click="openUrl(media.movieDoubanSharingUrl)">
                                        {{media.movieDoubanSharingUrl}}
                                    </el-link>
                                </p>
                                <div v-if="media.rating===true" class="rating">
                                    <!-- <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 20px">
                                        评分：{{media.ratingPoint}}/10 ({{media.commentNum}}人评价)
                                    </p> -->
                                    <div>
                                        评分： 
                                    </div>
                                    <div>
                                        <el-rate
                                            style="height:100%"
                                            v-model="media.ratingPoint"
                                            :max="10"
                                            disabled
                                            show-score
                                            text-color="#ff9900"
                                            score-template="{value}/10">
                                        </el-rate> 
                                    </div>
                                    <div class="rating-subfix">
                                        &nbsp;&nbsp;({{media.commentNum}}人评价)
                                    </div>
                                </div>
                                <div v-else>
                                    <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 20px">评分：暂无评分</p>
                                </div>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-right: 50px">简介：{{media.movieIntro}}</p>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!--章节列表-->
        <el-row :gutter="0" type="flex" justify="center" align="middle">
            <el-col :span="22">
                <el-card shadow="hover">
                    <div class="chapterLabel" slot="header">全部播放源</div>
                    <div style="margin-left: 20px;" v-if="playList!==null&&playList.length>0">
                        <!--列表-->
                        <div class="chapterList" v-for="(player,index) in playList" :key="index">
                            <el-button style="margin-right: 20px;margin-bottom: 20px"
                                       @click="openUrl(player.playUrl)">
                                {{player.playerName}} （{{player.playType}}）
                            </el-button>
                        </div>
                    </div>
                    <div style="margin-left: 20px;" v-else>
                        <p>暂无播放源</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "MovieDetail",
        props:{
            //从movieCard传过来的media对象
            media:Object
        },
        data(){
            return{
                languageText:'',
                pubDateText:'',
                directorsText:'',
                countriesText:'',
                actorsText:'',
                durationsText:'',
                tagsText:'',
                //播放源列表
                playList:[],
            }
        },
        methods:{
           openUrl(url){
               window.open(url);
           },
           //数组拼接字符串,使用/分隔
           aggString(array){
                var result='';
                for(var i=0;i<array.length;i++){
                    if(i==array.length-1){
                        result+=array[i]
                    }else{
                        result+=array[i]+"/"
                    }
                }
                return result;
           }

        },
        created() {
            const _this=this;
            _this.media=_this.$route.params.media;
            //判断是否是外部链接跳转
            if(_this.media==null){
                // window.location.href="https://www.baidu.com";
                _this.$router.push('/movie');
            }
            //languageText
            _this.languageText=_this.aggString(_this.media.movieLanguage);
            //pubDateText
            _this.pubDateText=_this.aggString(_this.media.pubDate);
            //directorsText
            _this.directorsText=_this.aggString(_this.media.movieDirectors);
            //countriesText
            _this.countriesText=_this.aggString(_this.media.movieCountries);
            //actorsText
            _this.actorsText=_this.aggString(_this.media.movieActors);
            //durationsText
            _this.durationsText=_this.aggString(_this.media.movieDurations);
            //tagsText
            _this.tagsText=_this.aggString(_this.media.tags);
            //playerCompanyList->playList
            _this.playList=_this.media.playerCompanyList;
        },
        activated() {

        },
    }
</script>

<style scoped>
    .rating-subfix{
        font-size:14px;
        color: rgb(255, 153, 0);
        line-height:1.38;
    }
    .rating{
        display: flex;
        flex-direction: row;
        text-overflow: ellipsis;
        text-align: left;
        margin-bottom: 1.25rem;
    }
    .el-image-class{
        /*width: 300px;*/
        width: 14.375rem;
    }
    .comic-cover{
        margin-right: 6.25rem;
        display: inline-block;
        /*width: 300px;*/
        width: 14.375rem;
    }
    .comic-message{
        max-width: 74%;
        display: inline-block;
    }
    .chapter{
        padding: 20px;
    }
    .mgb20 {
        margin-bottom: 20px;
        min-height: 350px;
    }
    .comic-title{
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        /*display: inline-block;*/
        /*flex-wrap: wrap;*/
        margin-right: -15px;
        margin-left: 20px;
    }
    .chapterLabel{
        font-size: 30px;
    }
    .chapterList{
        display: inline-block;
    }
</style>
