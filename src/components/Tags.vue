<template>
    <div class="tags" v-if="showTags">
        <ul class="ul-class">
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import bus from './bus';
    export default {
        data() {
            return {
                tagsList: []
            }
        },
        methods: {
            isActive(path) {
                return path === this.$route.fullPath;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                }else{
                    this.$router.push('/');
                }
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                this.$router.push('/');
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.fullPath;
                })
                this.tagsList = curItem;
            },
            // 设置标签
            setTags(route){
                const isExist = this.tagsList.some(item => {
                    return item.path === route.fullPath;
                })
                if(!isExist){
                    if(this.tagsList.length >= 8){
                        this.tagsList.shift();
                    }
                    this.tagsList.push({
                        title: route.meta.title,
                        path: route.fullPath,
                        name: route.matched[1].components.default.name
                    })
                }
                bus.$emit('tags', this.tagsList);
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{
            $route(newValue, oldValue){
                this.setTags(newValue);
            }
        },
        created(){
            this.setTags(this.$route);
            // 监听关闭当前页面的标签页
            bus.$on('close_current_tags', () => {
                for (let i = 0, len = this.tagsList.length; i < len; i++) {
                    const item = this.tagsList[i];
                    if(item.path === this.$route.fullPath){
                        if(i < len - 1){
                            this.$router.push(this.tagsList[i+1].path);
                        }else if(i > 0){
                            this.$router.push(this.tagsList[i-1].path);
                        }else{
                            this.$router.push('/');
                        }
                        this.tagsList.splice(i, 1);
                        break;
                    }
                }
            })
        }
    }

</script>


<style>
    @media (min-width: 550px) {
        /*标签行无滚动条*/
        .ul-class{
            display: block;
            white-space: nowrap;
        }
    }
    @media (max-width:549px) {
        /*标签行有滚动条*/
        .ul-class{
            display: block;
            white-space: nowrap;
            overflow-x: scroll;
        }
    }
    .tags {
        position: relative;
        /*height: 30px;*/
        height: 1.875rem;
        overflow: hidden;
        background: #fff;
        /*padding-right: 120px;*/
        padding-right: 7.5rem;
        /*box-shadow: 0 5px 10px #ddd;*/
        box-shadow: 0 0.3125rem 0.625rem #ddd;
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .tags-li {
        /* float: left; */
        display: inline-block;
        /*margin: 3px 5px 2px 3px;*/
        margin: 0.1875rem 0.3125rem 0.125rem 0.1875rem;
        /*border-radius: 3px;*/
        border-radius: 0.1875rem;
        /*font-size: 12px;*/
        font-size: 0.75rem;
        overflow: hidden;
        cursor: pointer;
        /*height: 23px;*/
        height: 1.4375rem;
        /*line-height: 23px;*/
        line-height: 1.4375rem;
        /*border: 1px solid #e9eaec;*/
        border: 0.0625rem solid #e9eaec;
        background: #fff;
        /*padding: 0 5px 0 12px;*/
        padding: 0 0.3125rem 0 0.75rem;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;
        /*border: 1px solid #409EFF;*/
        border: 0.0625rem solid #409EFF;
        background-color: #409EFF;
    }

    .tags-li-title {
        text-decoration: none;
        float: left;
        /*max-width: 80px;*/
        max-width: 5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        /*margin-right: 5px;*/
        margin-right: 0.3125rem;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        /*padding-top: 1px;*/
        padding-top: 0.0625rem;
        text-align: center;
        /*width: 110px;*/
        width: 6.875rem;
        /*height: 30px;*/
        height: 1.875rem;
        background: #fff;
        /*box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);*/
        box-shadow: -0.1875rem 0 0.9375rem 0.1875rem rgba(0, 0, 0, .1);
        z-index: 10;
    }

</style>
