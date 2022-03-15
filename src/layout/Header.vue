<template>
  <n-layout-header class="layout-header" :inverted="inverted" bordered>
<!--    <n-switch v-model:value="inverted"/>-->
    <n-menu class="layout-header-menu" mode="horizontal" :inverted="inverted" :options="menuOptions"/>
  </n-layout-header>
</template>

<script>
import {h, defineComponent, ref} from "vue";
import {
  BookOutline as BookIcon, LogoGithub,
  PersonCircleOutline as PersonCircleIcon,
  EarthOutline as EarthIcon,
  ChatboxEllipsesOutline as ChatboxEllipsesIcon,
  InformationCircleOutline as InformationCircleIcon,
  LogIn,LogOut
} from "@vicons/ionicons5";
import {NIcon} from "naive-ui";
import {RouterLink} from 'vue-router'
import {inject} from 'vue'
import {logOut} from "@/api/user";
import {useMessage} from "naive-ui";

export default defineComponent({
  setup() {
    const context = inject('context')
    const message = useMessage()
    function handleLogOut() {
      logOut().then(_ => {
        message.info(`再见~${context.username}`)
        context.username=null
        context.isLogIn=false
      }).catch(err => {
        message.error(err)
      })
    }

    const menuOptions = [
      {
        label: () => h(RouterLink, {
          to: {
            path: "/HelloWorld"
          }
        }, {default: () => "主页"}),
        key: "hello-world",
        icon: renderIcon(EarthIcon)
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/board"
          }
        }, {default: () => "留言板"}),
        key: "board",
        icon: renderIcon(ChatboxEllipsesIcon)
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/profile"
          }
        }, {default: () => "个人中心"}),
        key: "profile",
        icon: renderIcon(InformationCircleIcon)
      },
      {
        label: () => {
          return context.isLogIn ?//是否登陆？
              h('a', {
                href:'#',
                onclick:handleLogOut
              }, '退出'):
              h(RouterLink, {//没有登陆显示登陆按钮
                to: {
                  path: "/login"
                }
              }, {default: () => "登陆"})
        },
        key: "/login",
        icon: context.isLogIn? renderIcon(LogOut): renderIcon(LogIn),
      },
      {
        label: '关于本站',
        key: "self-intro",
        icon: renderIcon(PersonCircleIcon),
        children: [
          {
            type: "group",
            label: "其他站点",
            key: "people",
          },
          {
            label: () => h("a", {
              href: "#",
              rel: "noopenner noreferrer"
            }, "语雀"),
            key: "yuque",
            icon: renderIcon(BookIcon),
          },
          {
            label: () => h("a", {
              href: "https://github.com/v2canal",
              target: "_blank",
              rel: "noopenner noreferrer"
            }, "GitHub"),
            key: "github",
            icon: renderIcon(LogoGithub),
          },
        ]
      },
    ];
    return {
      inverted: ref(false),
      menuOptions, context
    };
  }
});

function renderIcon(icon) {
  return () => h(NIcon, null, {default: () => h(icon)});
}


</script>
<style scoped>
.layout-header {
  text-align: center;
}
</style>