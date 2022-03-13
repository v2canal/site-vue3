<template>
  <n-layout class="layout">
    <!--头部-->
    <Header/>
    <Main/>
    <!--底部-->
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
        const {isLogin,username,userid}=data.data
        context.isLogIn = isLogin
        context.username = username
        if(context.isLogIn) context.userid=userid
      })
      .catch(err => {
        console.log(err)
      })
  next()
})

const context = reactive({
  isLogIn: false,
  username: null,
  id:null,
})
provide('context', context)
</script>
<style scoped>
.layout {
  height: inherit;
}
</style>