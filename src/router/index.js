// 页面切换路由设置
import Vue from 'vue'
import Router from 'vue-router'
import MyMusic from '../components/MyMusic'
import FindMusic from '../components/FindMusic'
import FindRecommendView from '../components/FindRecommendView'
import Header from '../components/Header'
import MusicDetail from '../components/MusicDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/myMusic'
    },
    {
      path: '/myMusic',
      name: 'myMusic',
      component: MyMusic
    },
    {
      path: '/findMusic',
      name: 'findMusic',
      component: FindMusic
    },
    {
      path: '/findMusic/findRecommend',
      name: 'findRecommend',
      component: FindRecommendView
    }
  ]
})
