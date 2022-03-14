<template>
  <n-message-provider>
    <Layout/>
  </n-message-provider>
</template>

<script setup>
import Layout from './layout'
import {onMounted} from "vue";
</script>

<style>
body,html{height: 100%}
#app {
  height:inherit;
}
</style>
