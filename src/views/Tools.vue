<template>
    <div class="main-content">
        <!--工具卡片-->
        <div class="tools-list">
            <ToolCard v-for="tool in toolsList" :tool="tool" :key="tool.index"></ToolCard>
        </div>
        <!--工具使用框-->
        <div class="tools-content">
            <!--B站视频号AB互转-->
            <div v-if="sign==1" class="tools-item">
                <!--工具标签名-->
                <div>
                    <p class="p-label-class">
                        B站视频号AB互转
                    </p>
                </div>
                <div style="width: 90%;display: flex;flex-direction: row;justify-content: center">
                    <!--输入框-->
                    <el-input v-model="videoNumInput" placeholder="在此输入视频号,以av(小写)或BV(大写)开头" @keyup.enter.native="transferVideoNum(videoNumInput)"></el-input>
                    <!--转换-->
                    <el-button type="primary" icon="el-icon-search" @click="transferVideoNum(videoNumInput)">转换</el-button>
                </div>
                <div style="width: 90%;margin-top: 10px;display: flex;flex-direction: row;justify-content: center">
                    <el-input v-model="videoNumOutput" placeholder="转换后的av或BV号" disabled></el-input>
                    <!--复制按钮-->
                    <el-button type="primary" icon="el-icon-copy-document" v-clipboard:copy="videoNumOutput" @click="copySuccess">复制</el-button>
                </div>
            </div>
            <!--JSON字符串格式化-->
            <div v-if="sign==2" class="tools-item">
                <!--工具标签名-->
                <div>
                    <p class="p-label-class">
                        JSON字符串格式化
                    </p>
                </div>
                <div style="width: 90%;display: flex;flex-direction: row;justify-content: center">
                    <div style="width: 100%">
                        <el-input type="textarea" rows="10"
                                  placeholder="请输入JSON对象或数组，按下方按钮进行JSON格式化(美化)"
                                  show-word-limit v-model="formatJSONString">
                        </el-input>
                    </div>
                </div>
                <div style="width: 90%;margin-top: 10px;margin-bottom:10px;display: flex;flex-direction: row;justify-content: center">
                    <el-button type="primary" icon="el-icon-search" @click="formatJson(formatJSONString)">格式化</el-button>
                </div>
            </div>
            <!--时间戳转换-->
            <div v-if="sign==3" class="tools-item">
                <!--工具标签名-->
                <div>
                    <p class="p-label-class">
                        时间戳转换
                    </p>
                </div>
                <!--时间戳转日期-->
                <div style="width: 100%;display: flex;flex-direction: row;justify-content: center">
                    <el-input placeholder="请输入时间戳 (单位为毫秒)" v-model="timeStamp"></el-input>
                    <el-button type="primary" size="mini" icon="el-icon-sort" @click="timestampToDate(timeStamp)">时间戳转日期</el-button>
                    <el-input v-model="timeStampTransferResult" disabled></el-input>
                    <!--复制按钮-->
                    <el-button type="primary" size="mini" icon="el-icon-copy-document" v-clipboard:copy="timeStampTransferResult" @click="copySuccess">复制</el-button>
                </div>
                <!--日期转时间戳-->
                <div style="width: 100%;margin-top: 10px;margin-bottom:10px;display: flex;flex-direction: row;justify-content: center">
                    <el-input placeholder="请输入日期 (格式为yyyy-MM-dd或yyyy-MM-dd HH:mm:ss)" v-model="dateTime"></el-input>
                    <el-button type="primary" size="mini" icon="el-icon-sort" @click="dateToTimeStamp(dateTime)">日期转时间戳</el-button>
                    <el-input v-model="dateTimeTransferResult" disabled></el-input>
                    <!--复制按钮-->
                    <el-button type="primary" size="mini" icon="el-icon-copy-document" v-clipboard:copy="dateTimeTransferResult" @click="copySuccess">复制</el-button>
                </div>
            </div>
            <!--简繁体转换-->
            <div v-if="sign==4" class="tools-item">
                <!--工具标签名-->
                <div>
                    <p class="p-label-class">
                        简繁体转换
                    </p>
                </div>
                <div style="width: 90%;display: flex;flex-direction: row;justify-content: center;margin-bottom: 20px">
                    <el-input type="textarea" rows="10"
                              placeholder="请输入简体或繁体，选择您要转换的字体"
                              show-word-limit v-model="textWord">
                    </el-input>
                    <div style="width:36%;display: flex;flex-direction: column;
                            justify-content: center">
                        <div style="display: flex;flex-direction: row;justify-content: center;margin-bottom: 10px">
                            <el-switch width="50"
                                    v-model="isTraditional"
                                    active-text="繁"
                                    inactive-text="简">
                            </el-switch>
                        </div>
                        <div style="width: 100%;display: flex;flex-direction: row;justify-content: center;margin-bottom: 10px">
                            <el-button type="primary" size="mini" icon="el-icon-sort" @click="chineseTransfer(isTraditional,textWord)">转换字体</el-button>
                        </div>
                        <div style="width: 100%;display: flex;flex-direction: row;justify-content: center">
                            <el-button type="primary" size="mini" icon="el-icon-copy-document" v-clipboard:copy="textTransferResult" @click="copySuccess">复制结果</el-button>
                        </div>
                    </div>
                    <el-input type="textarea" rows="10"
                              placeholder="转换结果"
                              show-word-limit v-model="textTransferResult" disabled>
                    </el-input>
                </div>
            </div>
            <!--Base64加密解密-->
            <div v-if="sign==5" class="tools-item">
                <!--工具标签名-->
                <div>
                    <p class="p-label-class">
                        Base64加密解密
                    </p>
                </div>
                <div style="width: 90%;display: flex;flex-direction: row;justify-content: center;margin-bottom: 20px">
                    <el-input type="textarea" rows="10"
                              placeholder="请输入要进行加密或解密的字符串"
                              show-word-limit v-model="codeTextWord">
                    </el-input>
                    <div style="width:36%;display: flex;flex-direction: column;
                            justify-content: center">
                        <div style="display: flex;flex-direction: row;justify-content: center;margin-bottom: 10px">
                            <el-switch width="50"
                                       v-model="isEncoding"
                                       active-text="加密"
                                       inactive-text="解密">
                            </el-switch>
                        </div>
                        <div style="width: 100%;display: flex;flex-direction: row;justify-content: center;margin-bottom: 10px">
                            <el-button type="primary" size="mini" icon="el-icon-document-checked" @click="codeTextTransfer(isEncoding,codeTextWord)">开始执行</el-button>
                        </div>
                        <div style="width: 100%;display: flex;flex-direction: row;justify-content: center">
                            <el-button type="primary" size="mini" icon="el-icon-copy-document" v-clipboard:copy="codeTextTransferResult" @click="copySuccess">复制结果</el-button>
                        </div>
                    </div>
                    <el-input type="textarea" rows="10"
                              placeholder="执行结果"
                              show-word-limit v-model="codeTextTransferResult" disabled>
                    </el-input>
                </div>
            </div>
            <!--IP地址定位-->
            <div v-if="sign==6" class="tools-item">
                <!--工具标签名-->
                <div>
                    <p class="p-label-class">
                        IP地址定位
                    </p>
                </div>
                <div style="width: 60%;display: flex;flex-direction: row;justify-content: center">
                    <!--输入框-->
                    <el-input v-model="ipAddress" placeholder="请输入IP地址" @keyup.enter.native="ipLocated(ipAddress)"></el-input>
                    <!--转换-->
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="ipLocated(ipAddress)">定位</el-button>
                </div>
                <div style="width: 90%;display: flex;flex-direction: row;justify-content: center;margin-top: 20px">
                    <p class="p-iplocation-class">
                        {{ipLocation}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import host from "../api/HostAddress";
    import ToolCard from "../components/tools/ToolCard";
    export default {
        name: "tools",
        components:{
            ToolCard
        },
        methods:{
            //设置打开哪个工具使用框
            setSign(index){
                this.sign=index;
            },
            //复制成功
            copySuccess(){
                const _this=this;
                _this.$message.success("复制成功！");
            },
            //bilibili视频号转换
            transferVideoNum(videoNumInput){
                const _this=this;
                if(videoNumInput==null||videoNumInput==""){
                    _this.$message.error("请输入视频号!");
                    return;
                }else {
                    _this.$axios.get(`${host.scheme}://${host.host}/api/tools/bilibili/transfer`,{
                        params:{
                            "video":videoNumInput
                        }
                    }).then(function (response) {
                        if(response.data.code==200){
                            _this.videoNumOutput=response.data.data;
                            _this.$message.success("转码完成!");
                        }else {
                            _this.$message.error("请输入正确的视频号!");
                        }
                    }).catch(error=>{
                        _this.$message.error(""+error);
                    });
                }
            },
            //json格式化
            formatJson(jsonString){
                const _this=this;
                if(jsonString==null||jsonString==""){
                    _this.$message.error("请输入JSON字符串!");
                    return;
                }else {
                    _this.$axios.post(`${host.scheme}://${host.host}/api/tools/json/format`,jsonString,{
                        headers:{
                            "Content-Type": "application/json"
                        },
                    }).then(function (response) {
                        if(response.data.code==200){
                            _this.formatJSONString=response.data.data;
                            _this.$message.success("格式化成功!");
                        }else {
                            _this.$message.error("格式化失败!只能解析单个JSON数组或对象!请把多个JSON整合一下再进行格式化!");
                        }
                    }).catch(error=>{
                        _this.$message.error(""+error);
                    });
                }

            },
            //时间戳转日期
            timestampToDate(timestamp){
                const _this=this;
                if(timestamp==null||timestamp==""){
                    _this.$message.error("请输入时间戳!");
                    return;
                }else {
                    _this.$axios.get(`${host.scheme}://${host.host}/api/tools/time/toDate`,{
                        params:{
                            timestamp:timestamp
                        }
                    }).then(function (response) {
                        if(response.data.code==200){
                            _this.timeStampTransferResult=response.data.data;
                            _this.$message.success("转换成功!");
                        }else {
                            _this.$message.error("转换失败!请检查时间戳的格式!");
                        }
                    }).catch(error=>{
                        _this.$message.error(""+error);
                    });

                }
            },
            //日期转时间戳
            dateToTimeStamp(dateTime){
                const _this=this;
                if(dateTime==null||dateTime==""){
                    _this.$message.error("请输入日期!");
                    return;
                }else {
                    _this.$axios.get(`${host.scheme}://${host.host}/api/tools/time/toTimestamp`,{
                        params:{
                            date:dateTime
                        }
                    }).then(function (response) {
                        if(response.data.code==200){
                            _this.dateTimeTransferResult=response.data.data;
                            _this.$message.success("转换成功!");
                        }else {
                            _this.$message.error("转换失败!请检查日期的格式!");
                        }
                    }).catch(error=>{
                        _this.$message.error(""+error);
                    });
                }
            },
            //简繁体转换
            chineseTransfer(isTraditional,text){
                const _this=this;
                if(text==null||text==""){
                    _this.$message.error("请输入中文!");
                    return;
                }else {
                    //转繁体
                    if(isTraditional==true){
                        var obj=new Object();
                        obj.type="traditional";
                        obj.text=text;
                        _this.$axios.post(`${host.scheme}://${host.host}/api/tools/gb_big5/transfer`,obj).then(function (response) {
                            if(response.data.code==200){
                                _this.textTransferResult=response.data.data;
                                _this.$message.success("转换成功!");
                            }else {
                                _this.$message.error("转换失败!");
                            }
                        }).catch(error=>{
                            _this.$message.error(""+error);
                        });


                    }else {
                        var obj=new Object();
                        obj.type="simple";
                        obj.text=text;
                        _this.$axios.post(`${host.scheme}://${host.host}/api/tools/gb_big5/transfer`,obj).then(function (response) {
                            if(response.data.code==200){
                                _this.textTransferResult=response.data.data;
                                _this.$message.success("转换成功!");
                            }else {
                                _this.$message.error("转换失败!");
                            }
                        }).catch(error=>{
                            _this.$message.error(""+error);
                        });

                    }
                }
            },
            //Base64加密解密
            codeTextTransfer(isEncoding,codeTextWord){
                const _this=this;
                if(codeTextWord==null||codeTextWord==""){
                    _this.$message.error("请输入要进行转换的字符串!");
                    return;
                }else {
                    //加密
                    if(isEncoding==true){
                        var obj=new Object();
                        obj.type="encode";
                        obj.text=codeTextWord;
                        _this.$axios.post(`${host.scheme}://${host.host}/api/tools/base64/transfer`,obj).then(function (response) {
                            if(response.data.code==200){
                                _this.$message.success("加密成功!");
                                _this.codeTextTransferResult=response.data.data;
                            }else {
                                _this.$message.error("加密失败!");
                            }
                        }).catch(error=>{
                            _this.$message.error(""+error);
                        });
                    }else {
                        var obj=new Object();
                        obj.type="decode";
                        obj.text=codeTextWord;
                        _this.$axios.post(`${host.scheme}://${host.host}/api/tools/base64/transfer`,obj).then(function (response) {
                            if(response.data.code==200){
                                _this.codeTextTransferResult=response.data.data;
                                _this.$message.success("解密成功!");
                            }else {
                                _this.$message.error("解密失败!请输入经Base64加密后的字符串!");
                            }
                        }).catch(error=>{
                            _this.$message.error(""+error);
                        });
                    }
                }
            },
            //ip定位
            ipLocated(ipAddress){
                const _this=this;
                if(ipAddress==null||ipAddress==""){
                    _this.$message.error("请输入要进行定位的IP地址!");
                    return;
                }else {
                    _this.$axios.get(`${host.scheme}://${host.host}/api/tools/ip/located`,{
                        params:{
                            ipAddress:ipAddress
                        }
                    }).then(function (response) {
                        if(response.data.code==200){
                            _this.ipLocation=response.data.data.location;
                            _this.$message.success("IP地址定位成功!");
                        }else {
                            _this.$message.error("IP地址格式错误!");
                        }
                    }).catch(error=>{
                        _this.$message.error(""+error);
                    });
                }

            }
        },
        data(){
            return{
                sign:-1,
                /**
                 * b站视频号互转参数
                 */
                videoNumInput:'',
                videoNumOutput:'',
                /**
                 * json字符串格式化参数
                 */
                formatJSONString:'',
                /**
                 * 时间戳转换参数
                 */
                timeStamp:'',
                timeStampTransferResult:'',
                dateTime:'',
                dateTimeTransferResult:'',
                /**
                 * 简繁体转换参数
                 */
                textWord:'',
                //开关true就是转成繁体
                isTraditional:true,
                textTransferResult:'',
                /**
                 * Base64加密解密参数
                 */
                codeTextWord:'',
                //开关true就是加密
                isEncoding:true,
                codeTextTransferResult:'',
                /**
                 * ip地址定位参数
                 */
                ipAddress:'',
                ipLocation:'',



                toolsList:[
                    {
                        index:1,
                        // cover:'https://file.ipadown.com/tophub/assets/images/media/bilibili.com.png_50x50.png',
                        cover:require("../assets/pictures/bilibili_icon.png"),
                        title:'B站视频号AB互转',
                        description:'通过算法对b站视频号进行转换'
                    },
                    {
                        index:2,
                        // cover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTksdFxmceBfw4spYMZ6Q-k1R_EVpnZqLIs-g&usqp=CAU',
                        cover:require("../assets/pictures/json_icon.jpg"),
                        title:'JSON字符串格式化',
                        description:'对json字符串进行美化'
                    },
                    {
                        index:3,
                        // cover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoA0cuc4ZthDeiiYHYCH70GeWNwd2FN9a2fQ&usqp=CAU',
                        cover:require("../assets/pictures/timestamp_icon.png"),
                        title:'时间戳转换',
                        description:'日期时间戳互转(单位为毫秒)'
                    },
                    {
                        index:4,
                        // cover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN-9l1jNLWNioRMpgi4Bt8Equo_zoAXXWOjA&usqp=CAU',
                        cover:require("../assets/pictures/font_icon.jpg"),
                        title:'简繁体转换',
                        description:'中文字体转换'
                    },
                    {
                        index:5,
                        // cover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUw5tFPuvqM0PeZznIWiLqNE6jcNTS4wQUAQ&usqp=CAU',
                        cover:require("../assets/pictures/base64_icon.jpg"),
                        title:'Base64加密解密',
                        description:'字符串加密解密'
                    },
                    {
                        index:6,
                        // cover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb4W5Dg5bGgmJYzvlcfD3jHCjxKFneNadYjA&usqp=CAU',
                        cover:require("../assets/pictures/ip_icon.png"),
                        title:'IP地址定位',
                        description:'根据IP定位现实地址'
                    },
                ]
            }
        }
    }
</script>

<style scoped>
    .p-iplocation-class{
        color: #529cfa;
        font-weight: 800;
        /*padding-bottom: 20px;*/
        padding-bottom: 1.25rem;
        /*font-size: 30px*/
        font-size: 1.875rem;
    }
    .p-label-class{
        color: #FF69B4;
        font-weight: 800;
        /*padding-bottom: 20px;*/
        padding-bottom: 1.25rem;
    }
    .main-content{
        width: 100%;
        height: 100%;
        /*margin-top: 10px;*/
        margin-top: 0.625rem;
        /*margin-bottom: 20px;*/
        margin-bottom: 1.25rem;

        display: flex;
        flex-direction: column;
        align-items: center;

    }
    .tools-list{
        /*border: 1px solid lightpink;*/
        width: 90%;
        /*margin-top: 10px;*/
        margin-top: 0.625rem;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
    .tools-content{
        width: 90%;
        /*min-height: 200px;*/
        min-height: 12.5rem;
        /*border: 1px solid lightpink;*/

        /*margin-top: 20px;*/
        margin-top: 1.25rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .tools-item{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 2rem;
    }

</style>
