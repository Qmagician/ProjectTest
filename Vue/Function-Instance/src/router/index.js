import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ScreenShotUpload from '@/components/ScreenShotUpload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ScreenShotUpload',
      name: 'ScreenShotUpload',
      component: ScreenShotUpload
    },
  ]
})
