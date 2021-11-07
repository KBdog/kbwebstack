import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home";
import Magnet from "../views/Magnet";
import Comic from "../views/Comic";
import MovieMessage  from "../views/MovieMessage";
import Comment from "../views/Comment";
import Tools from "../views/Tools";
import About from "../views/About";
import Dashboard from "../views/Dashboard";
import ComicChapter from "../views/ComicChapter";
import ComicPicture from "../views/ComicPicture";
import MovieDetail from '@/views/MovieDetail';
Vue.use(VueRouter);
const router = new VueRouter({
  routes:[
    {
      path:'/',
      redirect:'/dashboard'
    },
    {
      path: '/',
      name:'home',
      component: Home,
      children:[
        {
          path:'/dashboard',
          name:'dashboard',
          component:Dashboard,
          meta:{
            title:'首页'
          }
        },
        {
          path:'/magnet',
          name:'magnet',
          component: Magnet,
          meta:{
            title:'磁力资源'
          }
        },
        {
          path: '/comic',
          name:'comic',
          component:Comic,
          meta: {
            title:'漫画爬虫'
          },
        },
        {
          path:'/comicChapter',
          name:'comicChapter',
          component:ComicChapter,
          meta:{
            title:'漫画章节',
          }
        },
        {
          path:'/comicPicture',
          name:'comicPicture',
          component: ComicPicture,
          meta:{
            title:'漫画图片'
          }
        },
        {
          path:'/movie',
          name:'movie',
          component:MovieMessage,
          meta:{
            title:'影视资讯'
          }
        },
        {
          path:'/movieDetail',
          name:'movieDetail',
          component:MovieDetail,
          meta:{
            title:'影视详情'
          }
        },
        {
          path:'/tools',
          name:'tools',
          component:Tools,
          meta:{
            title:'在线工具'
          }
        },
        {
          path:'/comment',
          name:'comment',
          component:Comment,
          meta:{
            title:'留言板'
          }
        },
        {
          path:'/about',
          name:'about',
          component:About,
          meta:{
            title:'关于作者'
          }
        }
      ]
    },
    //错误路径全部跳转回首页
    {
      path: '*',
      redirect:'/'
    }
  ]
})

export default router
