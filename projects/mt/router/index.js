import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import {SET_TITLE} from '@/store/mutation-types'
import config from '@/utils/config'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: config.routePublicPath,
  routes: [
    {
      path: '',
      // component: () => import('@/views/home'),
      children: []
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 重置滑动高度
  document.documentElement.scrollTop = document.body.scrollTop = 0
  // 设置页面标题
  if (to.meta && to.meta.title) {
    store.commit(SET_TITLE, to.meta.title)
  }
  next()
})

export default router
