<template>
    <div class="chapter">
        <div v-loading="isLoading"
             element-loading-text="查询该章图片列表中.."
             element-loading-spinner="el-icon-loading">

        </div>
        <!--封面标题作者简介-->
        <el-row :gutter="0" type="flex" justify="center" align="middle">
            <!--封面和标题-->
            <el-col :span="22">
                <el-card shadow="hover" class="mgb20">
                    <div class="comic-title">
                        <!--封面-->
                        <div class="comic-cover" >
                            <el-image :src="comicMessage.comicCoverUrl" class="el-image-class"></el-image>
                        </div>
                        <!--漫画名和别名-->
                        <div class="comic-message">
                            <div style="margin-bottom: 1.875rem">
                                <h2>{{comicMessage.comicName}}</h2>
                            </div>
                            <div>
                                <div style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 1.25rem">
                                    <div v-if="comicMessage.comicResource=='1'">
                                        漫画源：<el-tag type="success" size="medium" hit="true">拷贝漫画</el-tag>
                                    </div>
                                    <div v-if="comicMessage.comicResource=='2'">
                                        漫画源：<el-tag type="success" size="medium" hit="true">动漫之家</el-tag>
                                    </div>
                                </div>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 1.25rem">别名：{{comicMessage.comicAlias}}</p>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 1.25rem">作者：{{comicAuthorText}}</p>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 1.25rem">状态：{{comicMessage.comicStatus}}</p>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 1.25rem">标签：{{comicTagsText}}</p>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 1.25rem">国家/地区：{{comicMessage.comicRegion}}</p>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-bottom: 1.25rem">热度：{{comicMessage.comicPopular}}</p>
                                <p style="display: block;text-overflow: ellipsis;text-align: left;margin-right: 3.125rem">简介：{{comicMessage.comicBrief}}</p>
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
                    <div class="chapterLabel" slot="header">全部章节</div>
                    <div style="margin-left: 1.25rem;">
                        <!--列表-->
                        <div class="chapterList" v-for="(chapter,index) in chapterList" :key="index">
                            <el-button style="margin-right: 1.25rem;margin-bottom: 1.25rem"
                                       @click="searchPictures(chapter)">
                                {{chapter.chapterName}}
                            </el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import host from "../api/HostAddress.vue";
    export default {
        name: "ComicChapter",
        props:{
            comicMessage:Object,
        },
        data(){
            return{
                isLoading:false,
                comicAuthorText:'',
                comicTagsText:'',
                //记录漫画源
                comicResource:'',
                chapterList:[
                    {
                        chapterUuid: "f62f2df0-161a-11e9-bd5e-00163e0ca5bd",
                        chapterName: "第01话",
                        chapterPathWord: "wuzhizhuansheng"
                    },
                    {
                        chapterUuid: "fc294e7a-161a-11e9-a983-00163e0ca5bd",
                        chapterName: "第02话",
                        chapterPathWord: "wuzhizhuansheng"
                    }
                ],
            }
        },
        methods:{
            //初始化，给copymanga的各种标签赋值
            getCopymangaMessage(){
                const _this=this;
                _this.comicResource=_this.comicMessage.comicResource;
                _this.chapterList=_this.comicMessage.comicChapterList;
                _this.comicAuthorText=_this.aggString(_this.comicMessage.comicAuthors);
                _this.comicTagsText=_this.aggString(_this.comicMessage.comicTags);
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
            },
            //查询图片列表
            searchPictures(chapter){
                const _this=this;
                _this.isLoading=true;
                //区分漫画源
                switch(_this.comicResource){
                    case "1":
                        console.log(chapter);
                        var timestamp=new Date().getTime();
                        var uri="api/copymanga/pictureList";
                        var token=_this.getToken(timestamp,"/"+uri);
                        _this.$axios.get(`${host.scheme}://${host.host}/${uri}`,{
                            params:{
                                pathword:chapter.chapterPathWord,
                                uuid:chapter.chapterUuid,
                                x_timestamp:timestamp,
                                x_token:token
                            }
                        }).then(function(response){
                            if(response.data.code==200){
                                _this.$router.push({
                                    name:'comicPicture',
                                    params:{
                                        chapterName:chapter.chapterName,
                                        pictureList:response.data.data
                                    }
                                });
                            }
                            _this.isLoading=false;
                        }).catch(error=>{
                            _this.$message.error(""+error);
                            _this.isLoading=false;
                        });
                        break;
                    case "2":
                        break;
                }
            }
        },
        created() {
            const _this=this;
            _this.comicMessage=_this.$route.params.comicMessage;
            //判断是否是外部链接跳转
            if(_this.comicMessage==null){
                // window.location.href="https://www.baidu.com";
                _this.$router.push('/comic');
            }
            //区分漫画源
            switch(_this.comicMessage.comicResource){
                case "1":
                    _this.getCopymangaMessage();
                    break;
                case "2":
                    break;
            }

        },
    }
</script>

<style scoped>
    .el-image-class{
        /*width: 230px;*/
        width: 14.375rem;
    }
    .comic-cover{
        /*margin-right: 100px;*/
        margin-right: 6.25rem;
        display: inline-block;
        /*width: 230px;*/
        width: 14.375rem;
    }
    .comic-message{
        max-width: 74%;
        display: inline-block;
    }
    .chapter{
        /*padding: 20px;*/
        padding: 1.25rem;
    }
    .mgb20 {
        /*margin-bottom: 20px;*/
        margin-bottom: 1.25rem;
        /*min-height: 350px;*/
        min-height: 21.875rem;
    }
    .comic-title{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        /*display: inline-block;*/
        /*flex-wrap: wrap;*/
        /*margin-right: -15px;*/
        margin-right: -0.9375rem;
        /*margin-left: 20px;*/
        margin-left: 1.25rem;
    }
    .chapterLabel{
        /*font-size: 30px;*/
        font-size: 1.875rem;
    }
    .chapterList{
        display: inline-block;
    }
</style>
