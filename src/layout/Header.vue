<template>
  <n-layout-header class="layout-header" :inverted="inverted" bordered>
    <n-switch v-model:value="inverted"/>
    <n-menu class="layout-header-menu" mode="horizontal" :inverted="inverted" :options="menuOptions"/>
  </n-layout-header>
</template>

<script>
import {h, defineComponent, ref} from "vue";
import {
  BookOutline as BookIcon, LogoGithub,
  PersonCircleOutline as PersonCircleIcon,
  EarthOutline as EarthIcon,
  LinkOutline as LinkIcon
} from "@vicons/ionicons5";
import {NIcon} from "naive-ui";
import {RouterLink} from 'vue-router'

export default defineComponent({
  setup() {
    return {
      inverted: ref(false),
      menuOptions
    };
  }
});

function renderIcon(icon) {
  return () => h(NIcon, null, {default: () => h(icon)});
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
    label: "程序员友情链接",
    key: "links",
    icon: renderIcon(LinkIcon)
  },
  {
    label: '关于我',
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
          href: "https://www.yuque.com/canal",
          target: "_blank",
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
      }
    ]
  }
];

</script>
<style scoped>
.layout-header {
  text-align: center;
}
</style>