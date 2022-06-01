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
        meta: {
          index: 0.1,
        },
        component: () => import('@/views/home/navigatorOne.vue'),
      },
      {
        path: 'navigatorTwo',
        name: 'navigatorTwo',
        meta: {
          index: 0.2,
        },
        component: () => import('@/views/home/navigatorTwo.vue'),
      },
      {
        path: 'navigatorThree',
        name: 'navigatorThree',
        meta: {
          index: 0.3,
        },
        component: () => import('@/views/home/navigatorThree.vue'),
      },
      {
        path: 'navigatorFour',
        name: 'navigatorFour',
        meta: {
          index: 0.5,
        },
        component: () => import('@/views/home/navigatorFour.vue'),
      },
      {
        path: 'blogsdetail/:id?',
        name: 'blogsdetail',
        meta: {
          index: 0.6,
        },
        component: () => import('@/views/home/blogsdetail.vue'),
      },
      {
        path: 'modiselfinfo',
        name: 'modiselfinfo',
        meta: {
          index: 0.7,
        },
        component: () => import('../views/modiselfinfo.vue'),
      },
      {
        path: 'publishblogs',
        name: 'publishblogs',
        meta: {
          index: 0.8,
        },
        component: () => import('../views/home/publishblogs.vue'),
      },
      {
        path: 'userhome',
        name: 'userhome',
        meta: {
          index: 0.8,
        },
        component: () => import('../views/Userhome.vue'),
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  console.log(to.meta)
  if (to.meta.index) {
    next()
  } else {
    next('/404')
  }
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
