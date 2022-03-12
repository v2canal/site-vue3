<template>
  <n-layout class="layout">
    <!--头部-->
    <Header/>
    <Main/>
    <!--底部-->
    <!--    <Footer/>-->
  </n-layout>
</template>

<script setup>

import {router} from '@/router'
import {provide, reactive} from 'vue'
import Main from './Main'
import Header from './Header'
import {verify} from "@/api/user";

router.beforeEach(async (to, from, next) => {
  verify()
      .then(data => {
        const {isLogin,username}=data.data
        context.isLogIn = isLogin
        context.username = username
      })
      .catch(err => {
        console.log(err)
      })
  next()
})

const context = reactive({
  isLogIn: false,
  username: null,
})
provide('context', context)
</script>
<style scoped>
.layout {
  height: inherit;
}
</style>