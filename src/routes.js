import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index'
import Detail from '@/views/Detail.vue'
/** @type {import('vue-router').RouterOptions['routes']} */
const routes = [
  {
    path: '/',
    component: Home,
    meta: { title: 'Home' },
    redirect:'/all',
    children: [
      {
        path: '/onlineuser',
        name: 'OnlineUser',
        component: () => import('./views/OnlineUser.vue'),
        meta: { title: 'OnlineUser' }
      },
      {
        path: '/realtimememb',
        name: 'RealTimeMember',
        component: () => import('./views/RealTimeMemb.vue'),
        meta: { title: 'RealTimeMember' }
      },
      {
        path: '/all',
        name: 'All',
        component: () => import('./views/All.vue'),
        meta: { title: 'All' }
      },
      {
        path: '/bjl',
        name: 'Baccarat',
        component: () => import('./views/Baccarat.vue'),
        meta: { title: 'Baccarat' }
      },
      {
        path: '/dgtiger',
        name: 'DragonTiger',
        component: () => import('./views/DragonTiger.vue'),
        meta: { title: 'DragonTiger' }
      },
      {
        path: '/cowcow',
        name: 'CowCow',
        component: () => import('./views/CowCow.vue'),
        meta: { title: 'CowCow' }
      },
      {
        path: '/detail',
        name: 'Detail',
        component: () => import('./views/Detail.vue'),
        meta: { title: 'Detail' }
      },
      {
        path: '/dragonDetail',
        name: 'DragonTigerDetail',
        component: () => import('./views/DragonTigerDetail.vue'),
        meta: { title: 'DragonTigerDetail' }
      },
      {
        path: '/nuDetail',
        name: 'CowCowDetail',
        component: () => import('./views/CowCowDetail.vue'),
        meta: { title: 'CowCowDetail' }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: 'Login' },
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('./views/Login.vue')
  },



  { path: '/:path(.*)', redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const token = store.state.app.token
  // If logged in, or going to the Login page.
  if (token || to.name === 'Login') {
    // Continue to page.
    next()
  } else {
    // Not logged in, redirect to login.
    next({ name: 'Login' })
  }
});




export default router