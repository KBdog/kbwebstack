<template>
    <div class="comic">
        <!--搜索框-->
        <div class="handle-box">
            <el-row :gutter="1" type="flex" align="middle" justify="center">
                <!--磁力站选择器-->
                <el-col :span="3">
                    <el-select v-model="comicResources" placeholder="漫画源" class="handle-select mr10">
                        <el-option key="1" label="拷贝漫画" value="1"></el-option>
                        <el-option key="2" label="Nhentai" value="2"></el-option>
                        <el-option key="3" label="绅士漫画" value="3"></el-option>
                        <el-option key="4" label="影子漫画" value="4"></el-option>
                        <el-option key="5" label="漫蛙漫画" value="5"></el-option>
                    </el-select>
                </el-col>
                <!--输入框-->
                <el-col :span="15">
                    <el-input v-model="keyword" placeholder="你想要的？" clearable class="handle-input mr10" @keyup.enter.native="search(keyword)"></el-input>
                </el-col>
                <!--搜索按钮-->
                <el-col :span="2">
                    <el-button type="primary" icon="el-icon-search" @click="search(keyword,comicResources)">搜索</el-button>
                </el-col>
            </el-row>
        </div>
        <el-row v-if="isSearch===true" type="flex" justify="center">
            <p class="keyword-label">
                你搜索了关键词:{{keywordLabel}},共{{comicList.length}}个结果
            </p>
        </el-row>
        <!--漫画卡片-->
        <div class="card-list"
             v-loading="isLoading"
             element-loading-text="搜索中.."
             element-loading-spinner="el-icon-loading"
            >
<!--            <div v-if="isSearch==true" class="real-comic-list">-->
<!--                <ComicCardList v-for="comic in comicList" :comic="comic"  :key="comic.comicPathWord"></ComicCardList>-->
<!--            </div>-->
            <div v-if="isSearch===true" class="real-comic-list">
                <ComicCardList v-for="comic in comicList" :comic="comic"
                               :key="realResources"
                               :realResources="realResources" :comicResources="comicResources"></ComicCardList>
            </div>
        </div>

    </div>
</template>

<script>
    import host from "../api/HostAddress.vue";
    import ComicCardList from "../components/comic/ComicCard";
    export default {
        name: "Comic",
        components:{ComicCardList},
        data(){
            return{
                realResources:'',
                comicResources:'',
                isSearch:false,
                keywordLabel:'',
                keyword:'',
                isLoading:false,
                comicList:[
                    {
                        comicContentUrl:"",
                        comicCover:"",
                        comicPathWord: "longyuhu",
                        comicName: "龍與虎",
                        comicAlias: "龍虎鬥，龙与虎,龙X虎,虎X龙,虎与龙,掌中萌虎,龙虎恋人，龍×虎，虎×龍，虎與龍，掌中萌虎，龍虎戀人，とらドラ!,龙虎斗",
                        comicCoverUrl: "https://mirror.mangafunc.fun/comic/longyuhu/cover/e4aedfff-96a2-11e9-8da9-024352452ce0.jpg!kb_m_item",
                        comicStatus: "連載中",
                        comicTags: [
                            "愛情",
                            "搞笑",
                            "校园"
                        ],
                        comicRegion: "日本",
                        comicPopular: 13041,
                        comicAuthors: [
                            "竹宮ゆゆこ",
                            "絶叫"
                        ],
                        comicBrief: "【vip點播】龙虎并立！龙儿与大河从未想过两人会再度回到如此亲近的关系──可是此时班上却出现刺激的转学生！她是北村的青梅竹马，名字叫做亚美。身为时装模特儿，长得美、身材好……不过她的真实本性却是──？",
                        comicResource: "拷贝漫画",
                    }
                ],
            }
        },
        methods:{
            //初始化静态数据
            initData(){
                const _this=this;
                _this.isLoading=false;
                _this.isSearch=false;
                _this.keywordLabel='';
                _this.comicList=[];
            },
            search(keyword,comicResources){
                this.initData();
                const _this=this;
                if(keyword==''||comicResources==''){
                    _this.$message.error("漫画源或关键字为空！");
                    return;
                }
                _this.comicList=[];
                _this.isSearch=true;
                _this.keywordLabel=_this.keyword;
                _this.isLoading=true;
                var finalKeyword=keyword.replaceAll(/[\[\]\/\\%&',;=?$~#^*!\x22]+/g," ");
                //区分漫画源
                switch(_this.comicResources.toString()){
                    case "1":
                        _this.realResources='1';
                        var timestamp=new Date().getTime();
                        var uri="api/copymanga/search";
                        var token=_this.getToken(timestamp,"/"+uri);
                        _this.$message.success("当前漫画源：拷贝漫画");
                        _this.$axios.get(`${host.scheme}://${host.host}/${uri}`,{
                            params:{
                                keyword:finalKeyword,
                                x_timestamp:timestamp,
                                x_token:token
                            }
                        }).then(function(response){
                            if(response.data.code==200){
                                _this.comicList=response.data.data;
                            }
                            _this.isLoading=false;
                        }).catch(error=>{
                            _this.$message.error(""+error);
                            _this.isLoading=false;
                        });
                        break;
                    case "2":
                        _this.realResources='2';
                        var timestamp=new Date().getTime();
                        var uri="api/nhentai/search";
                        var token=_this.getToken(timestamp,"/"+uri);
                        _this.$message.success("当前漫画源：Nhentai");
                        _this.$axios.get(`${host.scheme}://${host.host}/${uri}`,{
                            params:{
                                keyword:finalKeyword,
                                x_timestamp:timestamp,
                                x_token:token
                            }
                        }).then(function(response){
                            if(response.data.code==200){
                                _this.comicList=response.data.data;
                            }
                            _this.isLoading=false;
                        }).catch(error=>{
                            _this.$message.error(""+error);
                            _this.isLoading=false;
                        });
                        break;
                    case "3":
                        _this.realResources='3';
                        var timestamp=new Date().getTime();
                        var uri="api/hentaiManga/search";
                        var token=_this.getToken(timestamp,"/"+uri);
                        _this.$message.success("当前漫画源：绅士漫画");
                        _this.$axios.get(`${host.scheme}://${host.host}/${uri}`,{
                            params:{
                                keyword:finalKeyword,
                                x_timestamp:timestamp,
                                x_token:token
                            }
                        }).then(function(response){
                            if(response.data.code==200){
                                _this.comicList=response.data.data;
                            }
                            _this.isLoading=false;
                        }).catch(error=>{
                            _this.$message.error(""+error);
                            _this.isLoading=false;
                        });
                        break;
                    case "4":
                        _this.realResources='4';
                        var timestamp=new Date().getTime();
                        var uri="api/yingzimanga/search";
                        var token=_this.getToken(timestamp,"/"+uri);
                        _this.$message.success("当前漫画源：影子漫画");
                        _this.$axios.get(`${host.scheme}://${host.host}/${uri}`,{
                            params:{
                                keyword:finalKeyword,
                                x_timestamp:timestamp,
                                x_token:token
                            }
                        }).then(function(response){
                            if(response.data.code==200){
                                _this.comicList=response.data.data;
                            }
                            _this.isLoading=false;
                        }).catch(error=>{
                            _this.$message.error(""+error);
                            _this.isLoading=false;
                        });
                        break;
                    case "5":
                        _this.realResources='5';
                        var timestamp=new Date().getTime();
                        var uri="api/manwamanga/search";
                        var token=_this.getToken(timestamp,"/"+uri);
                        _this.$message.success("当前漫画源：漫蛙漫画");
                        _this.$axios.get(`${host.scheme}://${host.host}/${uri}`,{
                            params:{
                                keyword:finalKeyword,
                                x_timestamp:timestamp,
                                x_token:token
                            }
                        }).then(function(response){
                            if(response.data.code==200){
                                _this.comicList=response.data.data;
                            }
                            _this.isLoading=false;
                        }).catch(error=>{
                            _this.$message.error(""+error);
                            _this.isLoading=false;
                        });
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    .real-comic-list{
        display: flex;
        flex-wrap: wrap;
    }
    .comic{
        /*padding: 20px;*/
        padding: 1.25rem;
    }
    .handle-input{
        width: 100%;
    }
    .handle-select{
        width: 100%;
    }
    .handle-box{
        /*padding: 20px;*/
        padding: 1.25rem;
    }
    .card-list{
        width: 85%;
        margin: 0 auto;
        /*display: inline-block;*/
    }
    .keyword-label{
        color: #FF69B4;
        font-weight: 800;
        /*padding-bottom: 20px;*/
        padding-bottom: 1.25rem;
    }
</style>
