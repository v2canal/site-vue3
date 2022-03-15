<template>
  <div class="article-navbar">
    <p style="display: none">{{ anchors }}</p>
  </div>
</template>

<script>
import {onUpdated, onMounted, onBeforeUpdate} from 'vue'

export default {
  props: ['anchors'],
  setup(props) {
    onMounted(() => {
    })
    onBeforeUpdate(() => {
    })
    onUpdated(() => {
      const {anchors} = props
      const NavBarContainer = document.getElementsByClassName('article-navbar')[0]
      console.log(NavBarContainer)
      let child,fn
      for (let i = 0; i < anchors.length; i++) {
        child = document.createElement('p')
        child.innerText=anchors[i].innerText
        fn=anchors[i].scrollIntoView
        child.onclick=fn.bind(anchors[i])
        NavBarContainer.append(child)
      }
    })
    return {}
  }
}
</script>

<style scoped>
.article-navbar{
  /*float:right;*/
}
</style>