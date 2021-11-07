<template>
    <div class="author-class">
        <div class="markdown-div">
            <readme_1 class="markdown-body"></readme_1>
        </div>
        <div class="markdown-div">
            <readme_2 class="markdown-body"></readme_2>
        </div>
        <div class="markdown-div">
            <readme_3 class="markdown-body"></readme_3>
        </div>
    </div>
</template>

<script>
    import readme_1 from "../assets/md/about_me_1.md";
    import readme_2 from "../assets/md/about_me_2.md";
    import readme_3 from "../assets/md/about_me_3.md";
    export default {
        name: "About",
        components:{
            readme_1,
            readme_2,
            readme_3
        }
    }
</script>

<style scoped>
    .author-class{
        max-width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        /*padding: 30px;*/
        padding: 1.875rem;
    }
    .author-one{
        /*width: 50%;*/
        width: 700px;
        /*margin-left: 3rem;*/
        /*margin-right: 10rem;*/
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .author-two{
        /*width: 50%;*/
        width: 700px;
        /*margin-left: 5rem;*/
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .markdown-div{
        width: 700px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 1.25rem;
    }
</style>
