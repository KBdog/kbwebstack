<template>
    <div class="editor-content1">
        <div class="editor-header">
            <!--昵称-->
            <el-input placeholder="请输入昵称(必填)" v-model="nickName" type="text"></el-input>
            <!--邮箱-->
            <el-input placeholder="请输入邮箱(必填)" v-model="email" type="email"></el-input>
            <!--网页-->
            <el-input placeholder="请输入您的网页(可选)" v-model="netWork" type="email"></el-input>
        </div>
        <!--文本输入域-->
        <div class="editor-textarea">
            <el-input type="textarea" maxlength="500" rows="8"
                      placeholder="欢迎小伙伴评论哦ヾﾉ≧∀≦)o来啊，快活啊!"
                      show-word-limit v-model="commentWord">
            </el-input>
        </div>
        <!--按钮-->
        <div class="editor-button">
            <el-button type="info" size="small" @click="clearAll">清空</el-button>
            <el-button type="primary" size="small" :loading="submitButtonisLoading" @click="submitComment">提交</el-button>
        </div>
    </div>
</template>

<script>
    import host from "../../api/HostAddress";
    export default {
        name: "CommentEditor",
        data(){
            return{
                nickName:null,
                email:null,
                netWork:null,
                commentWord:null,
                submitButtonisLoading:false
            }
        },
        methods:{
            clearAll(){
                this.commentWord=null;
                this.$message.success("已清空");
            },
            getCurrentTimeStamp(){
                var timestamp = Date.parse(new Date());
                return timestamp;
            },
            submitComment(){
                const _this=this;
                _this.submitButtonisLoading=true;
                //必填项没填
                if(_this.nickName==null||_this.email==null||_this.nickName==""||_this.email==""){
                    _this.$message.error("昵称和邮箱必填！");
                    _this.submitButtonisLoading=false;
                    return;
                }
                //网站不为空
                if(_this.netWork!==null&&_this.netWork!==""){
                    //域名验证正则
                    const regex=new RegExp("^(((ht|f)tps?):\\/\\/)?[\\w-]+(\\.[\\w-]+)+([\\w.,@?^=%&:\\/~+#-]*[\\w@?^=%&\\/~+#-])?$");
                    if(!regex.test(_this.netWork)){
                        _this.$message.error("请填上格式正确的网站！");
                        _this.submitButtonisLoading=false;
                        return;
                    }
                }
                //正则验证邮箱
                const regex = new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$");
                if(!regex.test(this.email)){
                    _this.$message.error("请填上格式正确的邮箱！");
                    _this.submitButtonisLoading=false;
                    return;
                }
                //评论文字内容为空
                if(_this.commentWord==null||_this.commentWord==""){
                    _this.$message.error("请填入评论内容！");
                    _this.submitButtonisLoading=false;
                    return;
                }
                //昵称不能超过八个字符
                if(_this.nickName.length>8){
                    _this.$message.error("昵称不能超过八个字符！");
                    _this.submitButtonisLoading=false;
                    return;
                }
                //构建请求json
                var commentJSON=new Object();
                commentJSON.commentTime=_this.getCurrentTimeStamp();
                commentJSON.nickName=_this.nickName;
                commentJSON.commentContent=_this.commentWord;
                commentJSON.email=_this.email;
                commentJSON.websiteUrl=_this.netWork;
                //请求后端提交评论
                _this.$axios.post(`${host.scheme}://${host.host}/api/comment/push`,commentJSON).then(function (response) {
                    if(response.data.code==200){
                        _this.$message.success("评论已发布,管理员审核后会展示在评论区,请耐心等待！");
                        setTimeout(function () {
                            //调用父组件查询所有评论方法
                            _this.$parent.getAllComment();
                            _this.submitButtonisLoading=false;
                        },2000);
                    }else {
                        _this.$message.error("评论发布失败！");
                        _this.submitButtonisLoading=false;
                    }
                }).catch(error=>{
                    _this.$message.error(""+error);
                    _this.submitButtonisLoading=false;
                })
            }
        }
    }
</script>

<style scoped>
    .editor-content{
        border: 1px solid lightpink;
        /*width: 100%;*/
        margin: 20px;
        display: flex;
        flex-direction: column;
        /*justify-content: center;*/
        align-items: center;
    }
    .editor-content1{
        width: 80%;
        /*border: 1px solid #f0f0f0;*/
        border: 0.0625rem solid #f0f0f0;
        /*border-radius: 4px;*/
        border-radius: 0.25rem;
        /*margin-bottom: 10px;*/
        margin-bottom: 0.625rem;
        overflow: hidden;
        position: relative;
        /*padding: 10px;*/
        padding: 0.625rem;
    }
    .editor-header{
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 1.75;
        /*border-bottom: 1px dashed #dedede;*/
        border-bottom: 0.0625rem dashed #dedede;
    }
    .editor-header .el-input{
        width: 33.3%;
        /*margin-bottom: 10px;*/
        margin-bottom: 0.625rem;
    }
    .editor-textarea{
        /*margin-top: 10px;*/
        margin-top: 0.625rem;
    }
    .editor-button{
        /*margin-top: 10px;*/
        margin-top: 0.625rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
</style>
