<template>

</template>

<script>
    //当前网络ip地址全局变量
    const localhostServer="api.kbwebstack.site";
    //后端端口号
    const port=8888;
    //协议类型
    const scheme="https";
    export default {
        name: "ApiAddress",
        host:localhostServer,
        port:port,
        scheme:scheme
    }
</script>

<style scoped>

</style>
