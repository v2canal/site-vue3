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
import Footer from './Footer'
import Main from './Main'
import Header from './Header'
</script>
<style scoped>
.layout {
  height: inherit;
}
</style>