<template>
    <div class="tool-card">
        <el-card class="box-card" shadow="hover">
            <div class="category">
                <img :src="tool.cover">&nbsp;&nbsp;
                <span class="title"> {{tool.title}}</span>
                <hr>
            </div>
            <p class="desc">{{tool.description}}</p>
            <p class="check">
                <el-link type="success" v-on:click="goTo(tool.index)">
                    打开<i class="el-icon-link"></i>
                </el-link>
            </p>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "ToolCard",
        props:{
            tool:Object
        },
        data(){
            return{

            }
        },
        methods:{
            goTo(index){
                this.$parent.setSign(index);
            }
        }
    }
</script>

<style scoped>
    .box-card {
        width: 100%;
        margin-bottom: 10px;
        border-radius: 6px;
    }
    .category img{
        width: 40px;
        height: 40px;
        border-radius: 12.5px;
    }
    .tool-card{
        /*margin: 20px;*/
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 10px;
        width: 22rem;
    }
    .category .title{
        width:36px;
        height: 20px;
        font-weight: 700;
        color: #000;
        position: relative;
        top: -6px;
        font-family: "Helvetica Neue";
    }
    .desc,p{
        width:100%;
        font-size: 14px;
        padding-left: 10px;
    }
    .check{
        text-align: right;
        margin-bottom: 0px;
    }
</style>
