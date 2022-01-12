<template>
    <div class="comic-card"
         v-loading="isLoading"
         element-loading-text="查询该漫画章节中.."
         element-loading-spinner="el-icon-loading"
        >
        <el-tooltip :content="comic.comicName" placement="top">
            <el-link :underline="false" v-on:click="getChapter(comic)">
                <el-card shadow="hover">
                <div class="comic-card-content">
                    <div class="img">
                        <img :src="comic.comicCoverUrl" class="real-img-class" v-lazy="comic.comicCoverUrl" >
                    </div>
                    <div class="description">
                        <p class="comic-name">
                            {{comic.comicName}}
                        </p>
                        <span class="comic-author">
                            <p style="margin-bottom: 10px">
                                作者：{{comicAuthorText}}
                            </p>
                            <p style="margin-bottom: 10px">
                                状态：{{comic.comicStatus}}
                            </p>
                            <p>
                                热度：{{comic.comicPopular}}
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
        name: "ComicCard",
        props:{
            comic:Object
        },
        data(){
            return{
                isLoading:false,
                comicAuthorText:'',
            }
        },
        methods:{
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
            //获取漫画章节
            getChapter(comic){
                const _this=this;
                _this.isLoading=true;
                //区分漫画源
                switch(comic.comicResource){
                    case "1":
                        var timestamp=new Date().getTime();
                        var uri="api/copymanga/chapterList";
                        var token=_this.getToken(timestamp,"/"+uri);
                        _this.$axios.get(`${host.scheme}://${host.host}/${uri}`,{
                            params:{
                                pathword:comic.comicPathWord,
                                x_timestamp:timestamp,
                                x_token:token
                            }
                        }).then(function(response){
                            if(response.data.code==200){
                                //给漫画实体添加章节列表
                                comic.comicChapterList=response.data.data;
                                _this.$router.push({
                                    name:'comicChapter',
                                    params:{
                                        comicMessage:comic
                                    }
                                })
                            }else{
                                _this.$router.push({
                                    name:'comicChapter',
                                    params:{
                                        comicMessage:comic
                                    }
                                })
                            }
                            _this.isLoading=false;
                        }).catch(error=>{
                            _this.$message.error(""+error);
                            _this.isLoading=false;
                        });
                        break;
                    case "2":
                }

            }
        },
        created() {
            const _this=this;
            switch(_this.comic.comicResource){
                case "1":
                    //comicAuthors
                    _this.comicAuthorText=_this.aggString(_this.comic.comicAuthors);
                    break;
                case "2":
                    break;
            }

        }
    }
</script>

<style scoped>
    .comic-card{
        /*min-width: 23%;*/
        /*width: 290px;*/
        width: 18.125rem;
        /*padding: 10px;*/
        padding: 0.625rem;
        display: inline-flex;
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
    .comic-card-content{
        display: flex;
        width: 100%;
        height: 100%;
    }
    .img{
        /*width: 100px;*/
        width: 6.25rem;
        /*height: 128px;*/
        height: 8rem;
        /*padding-right: 20px;*/
        padding-right: 1.25rem;
    }
    .real-img-class{
        /*width="100px" height="128px"*/
        width: 6.25rem;
        height: 8rem;
    }
    .comic-name{
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;

        /*font-size: 14px;*/
        font-size: 0.875rem;
        font-weight: bold;
        /*min-height: 67px;*/
        min-height: 40%;
        /*margin-bottom: 10px;*/
        margin-bottom: 0.625rem;
    }
    .comic-author{
        display: block;
        /*font-size: 12px;*/
        font-size: 0.75rem;
        color: #999999;
    }
</style>
