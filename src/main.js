import {createApp} from 'vue'
import App from './App.vue'
import {router} from '@/router'
import {
  create,
  NButton,
  NLayout,
  NMenu,
  NLayoutSider,
  NLayoutHeader,
  NLayoutFooter,
  NSwitch,
  NList,
  NGradientText,
  NPagination,
  NListItem,
  NIcon,
  NAvatar,
  NMessageProvider,
  NForm,
  NFormItem,
  NCol,
  NRow,
  NInput
} from 'naive-ui'

const naive = create({
  components: [NButton, NLayout, NMenu, NLayoutSider, NLayoutHeader, NSwitch, NLayoutFooter, NList, NGradientText,
    NPagination, NListItem, NIcon, NAvatar, NMessageProvider, NForm, NFormItem, NCol, NRow, NInput]
})
const app = createApp(App)
app.use(router)
app.use(naive)
app.mount('#app')
