import { ja } from 'element-plus/lib/locale'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    // redirect: '/login',
    meta: {
      index: 0,
    },
    redirect: '/navigatorOne',
    children: [
      {
        path: 'navigatorOne',
        name: 'navigatorOne',
        component: () => import('@/views/home/navigatorOne.vue'),
      },
      {
        path: 'navigatorTwo',
        name: 'navigatorTwo',
        component: () => import('@/views/home/navigatorTwo.vue'),
      },
      {
        path: 'navigatorThree',
        name: 'navigatorThree',
        component: () => import('@/views/home/navigatorThree.vue'),
      },
      {
        path: 'navigatorFour',
        name: 'navigatorFour',
        component: () => import('@/views/home/navigatorFour.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      index: 1,
    },
  },
  {
    path: '/register',
    name: 'regitster',
    component: () => import('../views/Register.vue'),
    meta: {
      index: 2,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue'),
    meta: {
      index: 3,
    },
  },
  {
    path: '/modiselfinfo',
    name: 'modiselfinfo',
    component: () => import('../views/modiselfinfo.vue'),
    meta: {
      index: 4,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// const routeAry = ['/', '/login', '/register']

// router.beforeEach((from, to, next) => {
//   if (routeAry.includes(from.path)) {
//     next()
//   } else {
//     console.log(11)

//     next({ path: '404' })
//   }
// })

export default router
