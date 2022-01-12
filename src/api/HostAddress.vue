<template>

</template>

<script>
    //当前网络ip地址全局变量
    // const localhostServer="api.kbwebstack.site";
    const localhostServer="localhost:8084";
    //后端端口号
    const port=8888;
    //协议类型
    // const scheme="https";
    const scheme="http";
    export default {
        name: "ApiAddress",
        host:localhostServer,
        port:port,
        scheme:scheme
    }
</script>

<style scoped>

</style>
