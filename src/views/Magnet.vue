<template>
    <div class="magnet">
        <div class="handle-box">
            <el-row :gutter="1" type="flex" align="middle" justify="center">
                <!--磁力站选择器-->
                <el-col :span="3">
                    <el-select v-model="magnetResources" placeholder="磁力源" class="handle-select mr10">
                        <el-option key="1" label="种子搜" value="1"></el-option>
                        <el-option key="2" label="喵绅士(表站)" value="2"></el-option>
                        <el-option key="3" label="喵绅士(里站)" value="3"></el-option>
                        <el-option key="4" label="磁力树" value="4"></el-option>
                        <el-option key="5" label="移花宫" value="5"></el-option>
                    </el-select>
                </el-col>
                <!--输入框-->
                <el-col :span="15">
                    <el-input v-model="keyword" placeholder="你想要的？" class="handle-input mr10" @keyup.enter.native="search(keyword)"></el-input>
                </el-col>
                <!--搜索按钮-->
                <el-col :span="2">
                    <el-button type="primary" icon="el-icon-search" @click="search(keyword)">搜索</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="magnet-list">
            <el-row v-if="isSearch===true" type="flex" justify="center">
                <p class="keyword-label">
                    你搜索了关键词:{{keywordLabel}}
                </p>
            </el-row>
            <!--磁力卡片-->
            <div v-if="isSearch===true">
                <div class="magnet-card" v-for="(magnet,index) in magnetList" :key="index">
                    <el-tooltip :content="magnet.title" placement="top">
                        <el-row  type="flex" justify="center">
                            <el-col :span="20">
                                <el-card shadow="hover">
                                    <i class="el-icon-truck"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="magnet-title">{{magnet.title}}</span>
                                    <el-divider></el-divider>
                                    <div class="description-table">
                                        <el-row type="flex" justify="space-between">
                                            <el-col :span="4">
                                                <i class="el-icon-date"></i>
                                                创建时间:
                                                <span class="magnet-time">
                                                {{magnet.createTime}}
                                                </span>
                                            </el-col>
                                            <el-col :span="4">
                                                <i class="el-icon-folder-opened"></i>
                                                大小:
                                                <span class="magnet-size">
                                                {{magnet.size}}
                                            </span>
                                            </el-col>
                                            <el-col :span="4">
                                                <i class="el-icon-s-flag"></i>
                                                热度:
                                                <span class="magnet-hot">
                                                {{magnet.hotpoint}}
                                                </span>
                                            </el-col>
                                            <el-col :span="4">
                                                <a :href="magnet.link" class="magnet-link">
                                                    <i class="el-icon-paperclip"></i>
                                                    磁力下载
                                                </a>
                                            </el-col>
                                            <el-col :span="4">
                                                <a class="magnet-link" href="javascript:void(0)"
                                                v-clipboard:copy="magnet.link" @click="copySuccess">
                                                    <i class="el-icon-paperclip"></i>
                                                    复制磁力
                                                </a>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-tooltip>
                </div>
            </div>
            <!--加载loading框-->
            <div class="div-loading-class"
                 v-loading="isLoading"
                 element-loading-text="加载磁力中.."
                 element-loading-spinner="el-icon-loading">
            </div>
        </div>
    </div>
</template>

<script>
    import host from "../api/HostAddress";
    export default {
        name: "magnet",
        data(){
            return {
                //是否加载动画
                isLoading:false,
                //是否搜索
                isSearch:false,
                //搜索关键字
                keyword:'',
                //keyword标签
                keywordLabel:'',
                //磁力源
                magnetResources:'',
                //磁力搜索结果列表
                magnetList:[],
                //zhongzilou使用的参数
                //磁力搜索页码
                zhongzilouSearchPageNum:1,
                //最后一页页码
                zhongzilouLastPageNum:1,
                //节流函数
                realThrottle: ()=>{}
            }
        },
        methods:{
            //初始化静态数据
            initData(){
                const _this=this;
                _this.isLoading=false;
                _this.isSearch=false;
                _this.keywordLabel='';
                _this.magnetList=[];
                _this.zhongzilouSearchPageNum=1;
                _this.zhongzilouLastPageNum=1;
            },
            search(keyword){
                //初始化
                this.initData();
                const _this=this;
                if(keyword==''){
                    _this.$message.error("搜索关键词为空！")
                    return;
                }
                if(_this.magnetResources==''){
                    _this.$message.error("请选择磁力源！");
                    return;
                }else {
                    //关键词标签赋值
                    _this.keywordLabel=keyword;
                    var finalKeyword=keyword.replaceAll(/[\[\]\/\\%&',;=?$~#^*!\x22]+/g," ");
                    _this.magnetList=[];
                    //启动加载动画
                    _this.isLoading=true;
                    //显示关键词标签
                    _this.isSearch=true;
                    switch (_this.magnetResources.toString()) {
                        //种子搜
                        case '1':
                            //请求后端
                            _this.zhongzilouSearch(finalKeyword,1);
                            break;
                        //喵绅士(表站)
                        case '2':
                            //请求后端
                            _this.nyaSearch(finalKeyword,1);
                            break;
                        //喵绅士(里站)
                        case '3':
                            //请求后端
                            _this.sukebaiNyaSearch(finalKeyword,1);
                            break;
                        case '4':
                            //请求后端
                            _this.cilishuSearch(finalKeyword,1);
                            break;
                        case '5':
                            //请求后端
                            _this.yihuagongSearch(finalKeyword,1);
                            break;
                    }
                }
            },
            //种子搜搜索
            zhongzilouSearch(keyword,pageNum){
                keyword=keyword.replaceAll(/[\[\]\/\\%&',;=?$~#^*!\x22]+/g," ");
                const _this=this;
                _this.$message.success("当前为第"+pageNum+"页");
                _this.isLoading=true;
                _this.$axios.get(`${host.scheme}://${host.host}/api/magnet/zhongzilou/${keyword}/${pageNum}`).then(function (response) {
                    let tmpMagnetList=response.data.data.magnetList;
                    let lastPageNum=response.data.data.lastPageNum;
                    if(tmpMagnetList.length>0){
                        let singleMagnet=null;
                        for(var i=0;i<tmpMagnetList.length;i++){
                            singleMagnet=new Object();
                            singleMagnet.title=tmpMagnetList[i].magnetName;
                            singleMagnet.link=tmpMagnetList[i].magnetUrl;
                            singleMagnet.createTime=tmpMagnetList[i].magnetCreateTime;
                            singleMagnet.hotpoint=tmpMagnetList[i].magnetHotSpot;
                            singleMagnet.size=tmpMagnetList[i].magnetSize;
                            _this.magnetList.push(singleMagnet);
                        }
                        _this.zhongzilouSearchPageNum++;
                        _this.zhongzilouLastPageNum=lastPageNum;
                    }
                    setTimeout(function () {
                        _this.isLoading=false;
                    },2000);
                }).catch(error=>{
                    setTimeout(function () {
                        _this.$message.error("搜索磁力出现错误:"+error);
                        _this.isLoading=false;
                    },2000);
                });
            },
            //喵绅士搜索(表站)
            nyaSearch(keyword,pageNum){
                keyword=keyword.replaceAll(/[\[\]\/\\%&',;=?$~#^*!\x22]+/g," ");
                const _this=this;
                _this.$message.success("当前为第"+pageNum+"页");
                _this.isLoading=true;
                _this.$axios.get(`${host.scheme}://${host.host}/api/magnet/nya/0/${keyword}/${pageNum}`).then(function (response) {
                    let tmpMagnetList=response.data.data.magnetList;
                    let lastPageNum=response.data.data.lastPageNum;
                    if(tmpMagnetList.length>0){
                        let singleMagnet=null;
                        for(var i=0;i<tmpMagnetList.length;i++){
                            singleMagnet=new Object();
                            singleMagnet.title=tmpMagnetList[i].magnetName;
                            singleMagnet.link=tmpMagnetList[i].magnetUrl;
                            singleMagnet.createTime=tmpMagnetList[i].magnetCreateTime;
                            singleMagnet.hotpoint=tmpMagnetList[i].magnetHotSpot;
                            singleMagnet.size=tmpMagnetList[i].magnetSize;
                            _this.magnetList.push(singleMagnet);
                        }
                        _this.zhongzilouSearchPageNum++;
                        _this.zhongzilouLastPageNum=lastPageNum;
                    }
                    setTimeout(function () {
                        _this.isLoading=false;
                    },2000);
                }).catch(error=>{
                    setTimeout(function () {
                        _this.$message.error("搜索磁力出现错误:"+error);
                        _this.isLoading=false;
                    },2000);
                });
            },
            //喵绅士搜索(里站)
            sukebaiNyaSearch(keyword,pageNum){
                keyword=keyword.replaceAll(/[\[\]\/\\%&',;=?$~#^*!\x22]+/g," ");
                const _this=this;
                _this.$message.success("当前为第"+pageNum+"页");
                _this.isLoading=true;
                _this.$axios.get(`${host.scheme}://${host.host}/api/magnet/nya/1/${keyword}/${pageNum}`).then(function (response) {
                    let tmpMagnetList=response.data.data.magnetList;
                    let lastPageNum=response.data.data.lastPageNum;
                    if(tmpMagnetList.length>0){
                        let singleMagnet=null;
                        for(var i=0;i<tmpMagnetList.length;i++){
                            singleMagnet=new Object();
                            singleMagnet.title=tmpMagnetList[i].magnetName;
                            singleMagnet.link=tmpMagnetList[i].magnetUrl;
                            singleMagnet.createTime=tmpMagnetList[i].magnetCreateTime;
                            singleMagnet.hotpoint=tmpMagnetList[i].magnetHotSpot;
                            singleMagnet.size=tmpMagnetList[i].magnetSize;
                            _this.magnetList.push(singleMagnet);
                        }
                        _this.zhongzilouSearchPageNum++;
                        _this.zhongzilouLastPageNum=lastPageNum;
                    }
                    setTimeout(function () {
                        _this.isLoading=false;
                    },2000);
                }).catch(error=>{
                    setTimeout(function () {
                        _this.$message.error("搜索磁力出现错误:"+error);
                        _this.isLoading=false;
                    },2000);
                });
            },
            //磁力树搜索
            cilishuSearch(keyword,pageNum){
                keyword=keyword.replaceAll(/[\[\]\/\\%&',;=?$~#^*!\x22]+/g," ");
                const _this=this;
                _this.$message.success("当前为第"+pageNum+"页");
                _this.isLoading=true;
                _this.$axios.get(`${host.scheme}://${host.host}/api/magnet/cilishu/${keyword}/${pageNum}`).then(function (response) {
                    let tmpMagnetList=response.data.data.magnetList;
                    let lastPageNum=response.data.data.lastPageNum;
                    if(tmpMagnetList.length>0){
                        let singleMagnet=null;
                        for(var i=0;i<tmpMagnetList.length;i++){
                            singleMagnet=new Object();
                            singleMagnet.title=tmpMagnetList[i].magnetName;
                            singleMagnet.link=tmpMagnetList[i].magnetUrl;
                            singleMagnet.createTime=tmpMagnetList[i].magnetCreateTime;
                            singleMagnet.hotpoint=tmpMagnetList[i].magnetHotSpot;
                            singleMagnet.size=tmpMagnetList[i].magnetSize;
                            _this.magnetList.push(singleMagnet);
                        }
                        _this.zhongzilouSearchPageNum++;
                        _this.zhongzilouLastPageNum=lastPageNum;
                    }
                    setTimeout(function () {
                        _this.isLoading=false;
                    },2000);
                }).catch(error=>{
                    setTimeout(function () {
                        _this.$message.error("搜索磁力出现错误:"+error);
                        _this.isLoading=false;
                    },2000);
                });
            },
            //移花宫搜索
            yihuagongSearch(keyword,pageNum){
                keyword=keyword.replaceAll(/[\[\]\/\\%&',;=?$~#^*!\x22]+/g," ");
                const _this=this;
                _this.$message.success("当前为第"+pageNum+"页");
                _this.isLoading=true;
                _this.$axios.get(`${host.scheme}://${host.host}/api/magnet/yihuagong/${keyword}/${pageNum}`).then(function (response) {
                    let tmpMagnetList=response.data.data.magnetList;
                    let lastPageNum=response.data.data.lastPageNum;
                    if(tmpMagnetList.length>0){
                        let singleMagnet=null;
                        for(var i=0;i<tmpMagnetList.length;i++){
                            singleMagnet=new Object();
                            singleMagnet.title=tmpMagnetList[i].magnetName;
                            singleMagnet.link=tmpMagnetList[i].magnetUrl;
                            singleMagnet.createTime=tmpMagnetList[i].magnetCreateTime;
                            singleMagnet.hotpoint=tmpMagnetList[i].magnetHotSpot;
                            singleMagnet.size=tmpMagnetList[i].magnetSize;
                            _this.magnetList.push(singleMagnet);
                        }
                        _this.zhongzilouSearchPageNum++;
                        _this.zhongzilouLastPageNum=lastPageNum;
                    }
                    setTimeout(function () {
                        _this.isLoading=false;
                    },2000);
                }).catch(error=>{
                    setTimeout(function () {
                        _this.$message.error("搜索磁力出现错误:"+error);
                        _this.isLoading=false;
                    },2000);
                });
            },
            //复制成功
            copySuccess(){
                const _this=this;
                _this.$message.success("复制成功！");
            },
            //滚动加载
            scrollSearch(){
                const _this=this;
                //滚动条是否在底部
                let isOnBottom=(document.documentElement.scrollTop+window.innerHeight+1)
                    >=document.documentElement.offsetHeight;
                //如果不在底部则不加载，直接中断返回
                if(!isOnBottom){
                    return;
                }
                switch (_this.magnetResources.toString()) {
                    case '1':
                        if(_this.zhongzilouSearchPageNum<=_this.zhongzilouLastPageNum){
                            _this.zhongzilouSearch(_this.keywordLabel,_this.zhongzilouSearchPageNum);
                        }else {
                            _this.isLoading=true;
                            setTimeout(function () {
                                _this.isLoading=false;
                                _this.$message.error("所有结果已列出!");
                            },1000);
                        }
                        break;
                    case '2':
                        if(_this.zhongzilouSearchPageNum<=_this.zhongzilouLastPageNum){
                            _this.nyaSearch(_this.keywordLabel,_this.zhongzilouSearchPageNum);
                        }else {
                            _this.isLoading=true;
                            setTimeout(function () {
                                _this.isLoading=false;
                                _this.$message.error("所有结果已列出!");
                            },1000);
                        }
                        break;
                    case '3':
                        if(_this.zhongzilouSearchPageNum<=_this.zhongzilouLastPageNum){
                            _this.sukebaiNyaSearch(_this.keywordLabel,_this.zhongzilouSearchPageNum);
                        }else {
                            _this.isLoading=true;
                            setTimeout(function () {
                                _this.isLoading=false;
                                _this.$message.error("所有结果已列出!");
                            },1000);
                        }
                        break;
                    case '4':
                        if(_this.zhongzilouSearchPageNum<=_this.zhongzilouLastPageNum){
                            _this.cilishuSearch(_this.keywordLabel,_this.zhongzilouSearchPageNum);
                        }else {
                            _this.isLoading=true;
                            setTimeout(function () {
                                _this.isLoading=false;
                                _this.$message.error("所有结果已列出!");
                            },1000);
                        }
                        break;
                    case '5':
                        if(_this.zhongzilouSearchPageNum<=_this.zhongzilouLastPageNum){
                            _this.yihuagongSearch(_this.keywordLabel,_this.zhongzilouSearchPageNum);
                        }else {
                            _this.isLoading=true;
                            setTimeout(function () {
                                _this.isLoading=false;
                                _this.$message.error("所有结果已列出!");
                            },1000);
                        }
                        break;
                }
            },
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
        },
        // mounted() {
        //     //监听滚动，添加磁力链接
        //     window.addEventListener('scroll',this.throttle(this.scrollSearch,1000,2000),false);
        // },
        // destroyed() {
        //     window.removeEventListener('scroll',this.throttle(this.scrollSearch,1000,2000),false);
        // },
        created() {
            const _this=this;
            _this.initData();
            //给真正要调用的节流函数赋值
            _this.realThrottle=_this.throttle(_this.scrollSearch,1000,2000);
        },
        activated() {
            //监听滚动，添加磁力链接
            window.addEventListener('scroll',this.realThrottle,true);
        },
        deactivated() {
            //销毁监听器
            window.removeEventListener('scroll',this.realThrottle,true);
        },
        destroyed() {
            //销毁监听器
            window.removeEventListener('scroll',this.realThrottle,true);
        },
        beforeDestroy() {
            //销毁监听器
            window.removeEventListener('scroll',this.realThrottle,true);
        }

    }
</script>

<style scoped>
    a{
        text-decoration: none;
    }
    .handle-input{
        width: 100%;
    }
    .handle-select{
        width: 100%;
    }
    .div-loading-class{
        /*padding-top: 50px;*/
        padding-top: 3.125rem;
    }
    .magnet{
        /*padding:20px;*/
        padding:1.25rem;
    }
    .handle-box{
        /*padding:20px;*/
        padding:1.25rem;
    }
    /* .magnet-list{
        min-height: 380px;
    } */
    .keyword-label{
        color: #FF69B4;
        font-weight: 800;
        /*padding-bottom: 20px;*/
        padding-bottom: 1.25rem;
    }
    .magnet-card{
        /*padding: 5px;*/
        padding: 0.3125rem;
    }
    .magnet-title{
        font-weight: 700;
        color: #5DADE2  ;
    }
    .description-table{
        text-align: center;
        font-weight: 500;
    }
    .magnet-time,.magnet-size{
        color: #27AE60 ;
    }
    .magnet-hot{
        color: #F1948A ;
    }
    .magnet-link{
        color: #529cfa;
    }
</style>
