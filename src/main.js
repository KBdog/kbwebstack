import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios";
import VueClipboard from "vue-clipboard2";
import fr from "element-ui/src/locale/lang/fr";
import './assets/css/icon.css';
//base64加密
// import {Base64} from 'js-base64';
let Base64 = require('js-base64').Base64;
// markdown样式
import 'github-markdown-css'
// 代码高亮
import 'highlight.js/styles/github.css'
//viewer
import 'viewerjs/dist/viewer.css';
import VueViewer from "v-viewer";
import VueLazyload from 'vue-lazyload';
Vue.use(VueViewer);
Vue.use(VueLazyload,{
  preLoad: 1.3,
  error: require('./assets/pictures/error.jpg'),
  loading: require('./assets/pictures/loading.gif'),
  attempt: 3,
  lazyComponent:true
});
//其他主要组件
Vue.prototype.$axios=axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueClipboard);
//把签发token写成全局方法
Vue.prototype.getToken=function(timestamp,uri){
  var encodeString=uri+"_"+timestamp;
  return Base64.encode(encodeString);
};
router.beforeEach((to, from, next) => {
  //给网页添加标题
  document.title = `${to.meta.title} | kb资源站`;
  //限制url跳转漫画章节或图片页面
  // if(to.path=='/comicChapter'|to.path=='/comicPicture'){
  //   // if(!from.path.includes('comic')){
  //   //   next('/comic');
  //   // }
  // }
  next();

});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
