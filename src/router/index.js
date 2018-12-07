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
          path:'keywordlist',
          name:'keyWordList',
          component:keyWordList
        }
      ]
    },
    {
      path:'/detail',
      name:'Detail',
      component:Detail
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
      path:'/livebroadcast/livedetail',
      name:"liveDetail",
      component:liveDetail
    },
    {
      path:'/down-load',
      component:downLoad
    }
  ]
})
