import {createRouter, createWebHashHistory} from 'vue-router'
// import Nprogress from 'nprogress'

const routes = [
  {
    path: '/',
    redirect: '/HelloWorld'
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
    path: '/javascript',
    component: () => import("@/views/ArticleList"),
    query: {
      type: 'javascript'
    },
  },
  {
    path: '/vueJs',
    component: () => import("@/views/ArticleList")
  },
  {
    path: '/reactJs',
    component: () => import("@/views/ArticleList")
  },
  {
    path: '/network',
    component: () => import("@/views/ArticleList"),
  },
  {
    name: 'network',
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
    // beforeEnter: (to, from) => {
    //   // reject the navigation
    //   return false
    // },
  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory(),
})
// router.beforeEach(()=>{
//   Nprogress.start()
//   console.log(Nprogress)
// })
// router.afterEach(()=>{
//   setTimeout(()=>{
//     Nprogress.done()
//   },1000)
// })
export  {router}