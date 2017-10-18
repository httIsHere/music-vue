// 页面切换路由设置
import Vue from 'vue'
import Router from 'vue-router'
import MyMusic from '../components/myMusic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'firstPage'
    },
    {
      path: '/myMusic',
      name: 'myMusic',
      component: MyMusic
    }
  ]
})
