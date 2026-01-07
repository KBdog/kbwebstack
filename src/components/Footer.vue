<template>
    <div class="footer">
        <div class="row">
            <!--引入小玩具-->
            <div id="sakana-widget-takina" class="lycorisRecoil-left"></div>
            <div class="row-content">
                <!--当前ip地址-->
                <p class="ip">
                    您的IP地址：{{ip}}&nbsp;&nbsp;&nbsp;{{ipAddress}}
                </p>
                <!--当前时间-->
                <p class="time">
                    {{currentTime}}
                </p>
                <!--统计信息-->
                <p class="count">
                    本站访客数：{{ipCount}}&nbsp;&nbsp;&nbsp;本站总访问量：{{pvCount}}
                </p>
                <!--版权信息-->
                <p  class="copyright">
                    Copyright kbdog ©2021-2026 本站所有资源均来源互联网,仅供技术研究,如果侵犯您的版权可以联系我删除
                </p>
            </div>
            <!--引入小玩具-->
            <div id="sakana-widget-chisato" class="lycorisRecoil-right"></div>
        </div>
    </div>
</template>

<script>
    import host from "../api/HostAddress.vue";
    let Base64 = require('js-base64').Base64;
    export default {
        name: "Footer",
        data(){
            return {
                currentTime:'',
                ip:'',
                ipAddress:'',
                ipCount:0,
                pvCount:0
            }
        },
        methods: {
            //获取当前时间
            getCurrentTime() {
                var date = new Date();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                //原本的date数值
                // var currentDate = date.getFullYear() + "-" + month + "-" + strDate
                //     + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                //补0
                var hours=date.getHours()<10?'0'+date.getHours():date.getHours();
                var minutes=date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
                var seconds=date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
                var currentDate = date.getFullYear() + "-" + month + "-" + strDate
                    + " " + hours + ":" + minutes + ":" + seconds;
                return currentDate;
            },
            //获取ip
            getUserIP(onNewIP) {
                let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
                let pc = new MyPeerConnection({
                    iceServers: []
                });
                let noop = () => {
                };
                let localIPs = {};
                let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
                let iterateIP = (ip) => {
                    if (!localIPs[ip]) onNewIP(ip);
                    localIPs[ip] = true;
                };
                pc.createDataChannel('');
                pc.createOffer().then((sdp) => {
                    sdp.sdp.split('\n').forEach(function (line) {
                        if (line.indexOf('candidate') < 0) return;
                        line.match(ipRegex).forEach(iterateIP);
                    });
                    pc.setLocalDescription(sdp, noop, noop);
                }).catch((reason) => {
                });
                pc.onicecandidate = (ice) => {
                    if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
                    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
                };
            },
            //访问api获取当前ip
            getCurrentIp(){
                const _this=this;
                _this.$axios.get('https://api.ipify.org/?format=json').then(function (response) {
                    _this.ip=response.data.ip;
                    _this.getCurrentCity();
                    _this.$message.success("获取IP成功")
                }).catch(error=>{
                    _this.$message.error("查询当前客户端IP出现错误:"+error);
                })
            },
            //根据ip定位
            getCurrentCity(){
                const _this=this;
                var timestamp=new Date().getTime();
                var uri="api/tools/ip/located";
                var token=_this.getToken(timestamp,"/"+uri);
                _this.$axios.get(`${host.scheme}://${host.host}/${uri}?ipAddress=${_this.ip}`,{
                    params:{
                        x_timestamp:timestamp,
                        x_token:token
                    }
                }).then(function (response) {
                    var message=response.data;
                    _this.ipAddress=message.data.location;
                    console.log(_this.ip+"-"+_this.ipAddress);
                }).catch(error=>{
                    _this.$message.error("根据IP定位出现错误:"+error);
                })
            },
            //获取访客数
            getIPCount(){
                const _this=this;
                var timestamp=new Date().getTime();
                var uri="api/visit/ip";
                var token=_this.getToken(timestamp,"/"+uri);
                _this.$axios.get(`${host.scheme}://${host.host}/${uri}`,{
                    params:{
                        x_timestamp:timestamp,
                        x_token:token
                    }
                }).then(function (response) {
                    _this.ipCount=response.data.data;
                }).catch(error=>{
                    _this.$message.error("获取统计访客数出现错误:"+error);
                })
            },
            //获取访问量
            getPVCount(){
                const _this=this;
                var timestamp=new Date().getTime();
                var uri="api/visit/pv";
                var token=_this.getToken(timestamp,"/"+uri);
                _this.$axios.get(`${host.scheme}://${host.host}/${uri}`,{
                    params:{
                        x_timestamp:timestamp,
                        x_token:token
                    }
                }).then(function (response) {
                    _this.pvCount=response.data.data
                }).catch(error=>{
                    _this.$message.error("获取统计访问量出现错误:"+error);
                })
            }
        },
        created() {
            this.getIPCount();
            this.getPVCount();
            this.getCurrentIp();
        },
        mounted() {
            const _this=this;
            this.timer = setInterval(() => {
                _this.currentTime='当前北京时间：'+this.getCurrentTime();
            }, 1000)
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
            }
        }
    }
</script>

<style scoped>
    /*手机尺寸*/
    @media (max-width: 412px) {
        .lycorisRecoil-right{
            display: none;
        }
        .lycorisRecoil-left{
            display: none;
        }
    }
    /*pc尺寸*/
    @media (min-width: 413px)and (max-width: 1920px) {
        .lycorisRecoil-right{
            position: fixed;
            right: 50px;
            bottom: 10px;
        }
        .lycorisRecoil-left{
            position: fixed;
            left: 50px;
            bottom: 10px;
        }
    }
    .footer{
        background: #F5F5F5;
        text-align: center;
        width: 100%;
        /*padding: 30px 0;*/
        padding: 1.875rem 0;
    }
    .ip{
        font-weight: 700;
        /*margin-top: 0px;*/
        margin-top: 0.625rem;
    }
    .time{
        font-weight: 700;
        /*margin-top: 10px;*/
        margin-top: 0.625rem;
    }
    .count{
        font-weight: 700;
        /*margin-top: 10px;*/
        margin-top: 0.625rem;
    }
    .copyright{
        font-weight: 700;
        /*margin-top: 10px;*/
        margin-top: 0.625rem;
    }
</style>
