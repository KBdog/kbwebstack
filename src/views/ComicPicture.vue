<template>
    <div id="box">
        <!--页面标题-->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-picture-outline"></i> {{chapterName}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container1">
            <!--图片列表预览-->
            <viewer :images="picList">
                <!--拷贝漫画-->
                <div v-if="comicResource!='2'" class="imgTable" v-for="pic in picList" :key="pic.pageNum">
                    <div class="imgClass">
                        <img :src="pic.picUrl" v-lazy="pic.picUrl">
                    </div>
                    <div>
                        第{{pic.pageNum}}页
                    </div>
                </div>
                <!--nhentai-->
                <div v-if="comicResource=='2'" class="imgTable" v-for="(pic,index) in picList" :key="index">
                    <div class="imgClass">
                        <img :src="pic" v-lazy="pic">
                    </div>
                    <div>
                        第{{index+1}}页
                    </div>
                </div>
            </viewer>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ComicPicture",
        data(){
            return{
                chapterName:'',
                picList:[],
                comicResource:''
            }
        },
        methods:{
        },
        created() {
            const _this=this;
            _this.comicResource=_this.$route.params.comicResource;
            _this.chapterName=_this.$route.params.chapterName;
            _this.picList=_this.$route.params.pictureList;
            //根据上个页面传递的数据判断是否是外部链接跳转
            if(_this.chapterName==null||_this.chapterName==''){
                _this.$router.push('/comic');
            }
        },
    }
</script>

<style scoped>
    #box{
        padding: 20px;
    }
    .container1{
        width: 100%;
    }
    .imgTable{
        display: inline-block;
        text-align: center;
        width: 200px;
        /*height: 300px;*/
        /*margin-right: 1.8%;*/
        margin: 1.5%;
        /*margin-bottom: 20px;*/
        border: 1px solid lightpink
    }
    .crumbs{
        margin: 10px 0;
    }
    .imgClass{
        /*margin-bottom: 20px;*/
        /*width: 200px;*/
        margin-bottom: 2px;
        border-bottom: 1px solid lightpink
    }
    .imgClass img{
        width: 200px;
        height: 250px;
    }
    .imgClass:hover{
        cursor: cell;
    }
</style>
