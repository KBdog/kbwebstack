<template>
    <div class="comment">
        <!--发送评论框-->
        <div class="comment-editor">
            <CommentEditor></CommentEditor>
        </div>
        <!--评论楼层-->
        <div class="comment-content">
            <comment-floor v-for="comment in commentList" :comment="comment" :key="comment.floorId"></comment-floor>
        </div>
    </div>
</template>

<script>
    import CommentEditor from "../components/comment/CommentEditor";
    import CommentFloor from "../components/comment/CommentFloor";
    import host from "../api/HostAddress";
    export default {
        name: "Comment",
        components:{
            CommentEditor,
            CommentFloor
        },
        data(){
            return{
                commentList:[
                    {
                        avatar:require('../assets/pictures/default_avatar.jpg'),
                        nickName:'测试人员1',
                        email:'111@qq.com',
                        commentContent:'沙发',
                        commentTime:'2021-07-19 16:19:20',
                        network:'https://kbdog.github.io',
                        floorId:1
                    },
                    {
                        avatar:require('../assets/pictures/default_avatar.jpg'),
                        nickName:'测试人员测试人员',
                        email:'222@qq.com',
                        commentContent:'板凳111',
                        commentTime:'2021-07-19 16:19:21',
                        network:'https://www.baidu.com/abc.html?q=hello%20worldssssssssssssssssssssssssssss',
                        floorId:2
                    },
                    {
                        avatar:require('../assets/pictures/default_avatar.jpg'),
                        nickName:'测试人员测试人员',
                        email:'222@qq.com',
                        commentContent:"[\n\t{\n\t\t\"asd\":\"123\"\n\t}\n]",
                        commentTime:'2021-07-19 16:19:21',
                        network:'',
                        floorId:3
                    }
                ]
            }
        },
        methods:{
            //获取日期
            getCurrentTime(timestamp) {
                var date = new Date(timestamp);
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                // var currentDate = date.getFullYear() + "-" + month + "-" + strDate
                //     + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                var hours=date.getHours()<10?'0'+date.getHours():date.getHours();
                var minutes=date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
                var seconds=date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
                var currentDate = date.getFullYear() + "-" + month + "-" + strDate
                    + " " + hours + ":" + minutes + ":" + seconds;
                return currentDate;
            },
            //获取所有评论
            getAllComment(){
                const _this=this;
                var timestamp=new Date().getTime();
                var uri="api/comment/all";
                var token=_this.getToken(timestamp,"/"+uri);
                _this.$axios.get(`${host.scheme}://${host.host}/${uri}`,{
                    params:{
                        x_timestamp:timestamp,
                        x_token:token
                    }
                }).then(function (response) {
                    //从后端拿到的评论列表
                    var commentList=response.data.data;
                    //写入前端的评论列表
                    var resultCommentList=new Array();
                    for(var i=0;i<commentList.length;i++){
                        //每个评论层
                        var comment=new Object();
                        var commentObj=commentList[i];
                        comment.avatar=require('../assets/pictures/default_avatar.jpg');
                        comment.nickName=commentObj.nickName;
                        comment.email=commentObj.email;
                        comment.commentContent=commentObj.commentContent;
                        comment.commentTime=_this.getCurrentTime(commentObj.commentTime);
                        comment.network=commentObj.netWorkUrl;
                        comment.floorId=commentObj.commentId;
                        resultCommentList.push(comment);
                    }
                    _this.commentList=resultCommentList;
                    _this.$message.success("获取所有评论！");
                }).catch(error=>{
                    _this.$message.error("请求评论失败:"+error);
                });
            },
        },
        created() {
            this.getAllComment();
        }
    }
</script>

<style scoped>
    .comment{
        width: 100%;
        height: 100%;
        /*margin-top: 20px;*/
        margin-top: 1.25rem;
        /*margin-bottom: 20px;*/
        margin-bottom: 1.25rem;
    }
    .comment-editor{
        display: flex;
        /*flex-direction: column;*/
        /*align-items: center;*/
        flex-direction: row;
        justify-content: center;
    }
    .comment-content{
        /*margin-top: 20px;*/
        margin-top: 1.25rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
