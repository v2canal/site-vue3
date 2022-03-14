import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/HelloWorld',
  },
  {
    path: '/HelloWorld',
    component: () => import("@/components/HelloWorld")
  },
  {
    path: '/self-intro',
    component: () => import("@/views/self-intro")
  },
  {
    name:'javascript',
    path: '/javascript',
    component: () => import("@/views/ArticleList"),
  },
  {
    name:'_javascript',
    path: '/javascript/:id',
    component: () => import("@/components/Article"),
    props: true
  },
  {
    name: 'vueJs',
    path: '/vueJs',
    component: () => import("@/views/ArticleList")
  },
  {
    name: '_vueJs',
    path: '/vueJs/:id',
    component: () => import("@/components/Article"),
    props: true
  },
  {
    name: 'reactJs',
    path: '/reactJs',
    component: () => import("@/views/ArticleList")
  },
  {
    name: '_reactJs',
    path: '/reactJs/:id',
    component: () => import("@/components/Article"),
    props: true
  },
  {
    name: 'network',
    path: '/network',
    component: () => import("@/views/ArticleList"),
  },
  {
    name: '_network',
    path: '/network/:id',
    component: () => import("@/components/Article"),
    props: true
  },

  {
    name: 'board',
    path: '/board',
    component: () => import('@/views/Board')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/components/LogInForm')
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/components/RegisterForm')
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('@/components/Profile'),
  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory(),
})
export  {router}