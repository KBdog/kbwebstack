<template>
    <div class="comment-floor">
        <el-card shadow="never">
            <div class="floor-content">
                <!--头像、昵称、邮箱-->
                <div class="profile-message">
                    <div class="avatar-img">
                        <div>
                            <img :src="comment.avatar" class="img">
                        </div>
                    </div>
                    <div class="nickName-class">
                        <span>{{comment.nickName}}</span>
                    </div>
                    <div class="email-class">
                        <span>{{comment.email}}</span>
                    </div>
                    <div class="network-class" @click="openNetWork(comment.network)">
                        <el-link :underline="false">
                            <span>{{comment.network}}</span>
                        </el-link>
                    </div>
                </div>
                <!--评论内容和楼层-->
                <div class="comment-message">
                    <div class="comment-message-content">{{comment.commentContent}}</div>
                    <div class="comment-message-time">{{comment.floorId}}楼  {{comment.commentTime}}</div>
                </div>

            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "CommentFloor",
        props:{
            comment:Object
        },
        methods:{
            openNetWork(url){
                window.open(url);
            }
        }
    }
</script>

<style scoped>
    .comment-floor{
        width: 80%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .el-card{
        width: 100%;
    }
    .floor-content{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    .profile-message{
        /*width: 25%;*/
        /*width: 150px;*/
        width: 9.375rem;
        /*margin-right: 10%;*/
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-right: 5%;
        border-right: 1px solid #f6f8fa;
    }
    .comment-message{
        width: 80%;
        /*width: 500px;*/
        padding-left: 5%;
        border-left: 1px solid #f6f8fa;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .avatar-img{
        /*padding: 3px;*/
        padding: 0.1875rem;
        /*border: 1px solid #CCC;*/
        border: 0.0625rem solid #CCC;
    }
    .img{
        /*width: 100px;*/
        /*width: 6.25rem;*/
        width: 3.75rem;
        /*height: 100px;*/
        /*height: 6.25rem;*/
        height: 3.75rem;
    }
    .nickName-class{
        /*margin-top: 9px;*/
        margin-top: 0.5625rem;
        /*font-size: 14px;*/
        font-size: 0.875rem;
        color: #5DADE2;
        font-weight: bold;
    }
    .el-link.el-link--default {
        color: #606266;
        overflow-wrap: anywhere;
    }
    .email-class, .network-class{
        /*margin-top: 9px;*/
        margin-top: 0.5625rem;
        font-weight: bold;
        /*文字超过换行*/
        max-width: 100%;
        overflow-wrap: anywhere;
        /*overflow-wrap: break-word;*/
    }
    .comment-message-content{
        /*min-height: 170px;*/
        min-height: 10.625rem;
        width: 100%;
        /*word-wrap: break-word;*/
        word-break: break-word;
        white-space: pre-wrap;
    }
    .comment-message-time{
        display: inline-block;
        /*margin: 0 4px;*/
        margin: 0 0.25rem;
        color: #999;
    }
</style>
