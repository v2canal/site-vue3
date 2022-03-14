<template>

  <n-loading-bar-provider>
    <n-message-provider>
      <Layout/>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<script setup>
import Layout from './layout'
</script>

<style>
body,html{height: 100%}
#app {
  height:inherit;
}
</style>
