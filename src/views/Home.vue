<template>
    <div class="wrapper">
        <el-backtop :visibility-height="50"></el-backtop>
        <!--主体内容-->
        <div class="content" :class="{'content-collapse':collapse}">
            <!--header-->
            <v-header></v-header>
            <v-tags></v-tags>
            <!--路由-->
            <div class="router">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
            <!--footer-->
            <v-footer></v-footer>
        </div>
    </div>
</template>

<script>
    import vHeader from "../components/Header";
    import vFooter from "../components/Footer";
    import vTags from "../components/Tags";
    import bus from "../components/bus";
    export default {
        name: "Home",
        components: {
            vHeader,
            vFooter,
            vTags
        },
        data(){
            return{
                tagsList: [],
                collapse: false
            }
        },
        created() {
            bus.$on('collapse-content', msg => {
                this.collapse = msg;
            });

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for (let i = 0, len = msg.length; i < len; i++) {
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            });
        }
    }
</script>

<style scoped>
    .router{
        /*min-height: 495px;*/
        min-height: 30.9375rem;
    }
</style>
