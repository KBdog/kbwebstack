<template>
    <div class="header">
        <el-card style="width:100%;display:flex;flex-direction:row;justify-content:center;">
            <div class="header-left">
                <router-link to="/">
                    <!-- <img src="../assets/kama.png" class="index-img-class" > -->
                    <div class="img-style-class">
                        <div class="img-style-class-content">
                            <div class="img-font-style-class">
                                <img src="../assets/guda.jpg" class="img-font-style-class-img-content">
                                <p>
                                    kbdog资源站
                                </p>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="header-right">
                <el-menu mode="horizontal" router :default-active="onRoutes" active-text-color="#FF69B4">
                    <el-menu-item v-for="item in navItem"
                                  class="menu-item-class"
                                    :index="item.index" :key="item.index"
                                    >
                        <i :class="item.icon"></i>
                        {{item.name}}
                    </el-menu-item>
                </el-menu>
            </div>

        </el-card>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                navItem:[
                    {
                        name:'磁力资源',
                        index:'magnet',
                        icon:'el-icon-s-promotion'
                    },
                    {
                        name:'漫画爬虫',
                        index:'comic',
                        icon:'el-icon-picture'
                    },
                    {
                        name:'影视资讯',
                        index:'movie',
                        icon:'el-icon-video-camera-solid'
                    },
                    {
                        name:'在线工具',
                        index:'tools',
                        icon:'el-icon-s-tools'
                    },
                    {
                        name:'留言板',
                        index:'comment',
                        icon:'el-icon-s-comment'
                    },
                    {
                        name:'关于作者',
                        index:'about',
                        icon:'el-icon-s-custom'
                    }
                ]
            }
        },
        //url上级目录全部替换为'/'
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
    }
</script>

<style scoped>
    .el-menu--horizontal>.el-menu-item {
        /*float: left;*/
        /*height: 60px;*/
        /*line-height: 60px;*/
        /*margin: 0;*/
        /*color: #909399;*/
        border-bottom: 0px solid transparent;
    }
    .menu-item-class{
        height: 10vh;
        /*width: 150px;*/
        /* width: 9.375rem; */
        width: 9.7rem;
        text-align: center;
        line-height: 10vh;
        font-weight: bold
    }
    .index-img-class{
        /* width: 10vh; */
        /* width: 20.75rem; */
        width:100%;
        /* height: 10vh; */
        height:100%
    }
    .el-menu.el-menu--horizontal{
        border: none;
    }
    .el-menu-item:hover{
        color: #FF69B4 !important;
    }
    .el-menu--horizontal>.el-menu-item.is-active{
        border: none;
    }
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        color: #fff;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .header-left{
        float: left;
        width:20.75rem;
        height:4.17rem;
    }
    .header-right {
        float: right;
    }
    .img-style-class{
        width:100%;
        height: 100%;
        background: linear-gradient(180deg, #42DBF0 0%, rgba(164, 207, 199, 0) 100%), #2CFFD9;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.08);
        border-radius: 1.25rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .img-style-class-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .img-font-style-class{
        width: 17.9375rem;
        height: 3.4375rem;
        margin-left: 0.625rem;
        font-family: Sanchez;
        font-style: normal;
        font-weight: normal;
        font-size: 2rem;
        line-height: 2.5625rem;
        display: flex;
        align-items: center;
        color: #C7A69C;
    }
    .img-font-style-class-img-content{
        width:3.125rem;
        height:3.125rem;
        margin-right:1.25rem;
    }
</style>
