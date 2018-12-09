import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import homeList from '@/components/homeList'
import searchKeyWord from '@/components/searchKeyWord'
import keyWord from '@/components/keyWord'
import keyWordList from '@/components/keyWordList'
import Detail from '@/components/Detail'
import myChannel from '@/components/myChannel'
import liveBroad from '@/components/liveBroad'
import liveDetail from '@/components/liveDetail'
import downLoad from '@/components/downLoad'
import DetailNews from '@/components/DetailNews'
import liveDetailNews from '@/components/liveDetailNews'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect:'/home/home-list/1001',
      children:[
        {
          path:"home-list/:id",
          name:'homeList',
          component:homeList
        }
      ]
    },
    {
      path:'/home/searchkeyword',
      component:searchKeyWord,
      redirect: '/home/searchkeyword/keyword',
      children:[
        {
          path:'keyword',
          name:'keyWord',
          component:keyWord
        },
        {
          path:'keywordlist/:id',
          name:'keyWordList',
          component:keyWordList
        }
      ]
    },
    {
      path:'/detail',
      name:'Detail',  
      component:Detail,
      redirect:'/detail/detail-news',
      children:[
        {
          path:'detail-news/:id',
          name:"DetailNews",
          component:DetailNews

        }
      ]
    },
    {
      path:'/home/mychannel',
      name: 'myChannel',
      component:myChannel
    },
    {
      path:'/livebroadcast',
      name: 'liveBroad',
      component:liveBroad
    },
    {
      path:'/live-detail',
      name:'liveDetail',
      component:liveDetail,
      children:[
        {
          path:'livedetailnews/:id',
          name:'liveDetailNews',
          component:liveDetailNews
        }
      ]
    },
    {
      path:'/down-load',
      component:downLoad
    }
  ]
})
