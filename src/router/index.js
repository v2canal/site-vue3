import {createRouter, createWebHashHistory} from 'vue-router'

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
    name:'network',
    path: '/network/:id',
    component: () => import("@/components/Article"),
    props: true
  }
]
export const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

