<template>
  <n-layout has-sider class="layout-main">
    <!--侧边导航-->
    <n-layout-sider
        class="layout-main-sider"
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="160"
        :native-scrollbar="false"
        :inverted="inverted"
    >
      <n-menu
          :inverted="inverted"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
      />
    </n-layout-sider>

    <!--内容主体--路由匹配-->
    <n-layout class="layout-main-router">
        <router-view></router-view>
    </n-layout>

  </n-layout>
</template>

<script>
import {
  LogoVue, LogoReact, LinkOutline as LinkIcon
} from "@vicons/ionicons5";
import {LogoJavascript , IosGlobe} from '@vicons/ionicons4'
import {h, defineComponent, ref} from "vue";
import {NIcon} from "naive-ui";
import {RouterLink} from 'vue-router'
function renderIcon(icon) {
  return () => h(NIcon,null, {default: () => h(icon)});
}

const menuOptions = [
  {
    label: ()=>h(RouterLink,{
      to:{
        path:'/javascript',
      }
    },{default:()=>'JavaScript'}),
    key: "JavaScript",
    icon: renderIcon(LogoJavascript)
  },
  {
    label: ()=>h(RouterLink,{
      to:{
        path:'/vueJs',
      }
    },{default:()=>'VueJS'}),
    key: "VueJs",
    icon: renderIcon(LogoVue),
  },
  {
    label: ()=>h(RouterLink,{
      to:{
        path:'/reactJs',
      }
    },{default:()=>'ReactJS'}),
    key: "ReactJS",
    icon: renderIcon(LogoReact)
  },
  {
    label: ()=>h(RouterLink,{
      to:{
        path:'/network',
      },
    },{default:()=>'计算机网络'}),
    key: "network",
    icon: renderIcon(IosGlobe),
  },
  {
    label: "友情链接",
    key: "links",
    icon: renderIcon(LinkIcon)
  },
];

export default defineComponent({
  setup() {
    return {
      inverted: ref(false),
      menuOptions
    };
  }
});

</script>
<style  scoped>
.layout-main {
  height: calc(100% - 43px);
}
.layout-main-router{
  /*background-color: #99caf7;*/
}
.layout-main-sider {
}
</style>