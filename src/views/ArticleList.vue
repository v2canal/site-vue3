<template>
  <n-list bordered>
    <template #header>
      <n-gradient-text
          gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"
      >
        小河今天学习了吗~~~
      </n-gradient-text>
    </template>
    <!--遍历文章列表-->
    <n-list-item v-for="article in articleList.slice(pageStart,pageEnd)" :key="article.id">
      <n-button @click="viewArticle(article)" text>
        <template #icon>
          <n-icon>
            <DocumentTextIcon/>
          </n-icon>
        </template>
        {{ article.title }}
      </n-button>
      <span id="time">
        <n-gradient-text :gradient="{from: 'rgb(85, 85, 85)',to: 'rgb(170, 170, 170)'}">
          发布于：{{ article.time }}
        </n-gradient-text>
      </span>
    </n-list-item>
    <!--底部分页-->
    <template #footer>
      <n-pagination v-model:page="page"
                    :item-count="articleList.length"
                    :next="handleNext"
                    :prev="handlePrev"
      />
    </template>
  </n-list>
</template>
<script>
import {getArticleListData as fetchData} from "@/api/article";
import {DocumentTextOutline as DocumentTextIcon} from '@vicons/ionicons5'
import {onMounted, reactive, ref, watch} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {parseDate} from "@/utils/moment";

export default {
  name: "ArticleList",
  components: {DocumentTextIcon},
  // mounted() {
  //   console.log(this.$route)
  // },
  setup() {
    const router = useRouter()
    const route=useRoute()
    onMounted(() => {
      //监听路由变化，拿到query参数,更新文章列表（注意：并非重新加载ArticleList组件）
      watch(
          () => route.path,
          () => {
            getArticleListData(route.name);
          },
          {immediate: true}
      )
    })
    const page = ref(1)//当前页码
    const pageSize = ref(10)//当前页面大小
    let pageStart = ref()
    let pageEnd = ref()

    function handleNext(e) {
      pageStart.value = e.startIndex
      pageEnd.value = e.endIndex
      return '下一页'
    }

    function handlePrev() {
      return '上一页'
    }

    let articleList = reactive([])
    //通过query传递的参数更新ArticleList
    const getArticleListData = async (category) => {
      const {data} = await fetchData(category)
      //替换list中的文章列表
      if (data)
        articleList.splice(0, articleList.length, ...data.map(item => {
          return {
            id: item.id,
            title: item.title,
            time: parseDate(item.id)//将id解析为时间
          }
        }))
    }
    const viewArticle = ({id}) => {
      router.push({
        name: '_'+route.name,
        params: {id},
      })
    }
    return {
      getArticleListData,
      articleList,
      viewArticle,
      page,
      pageSize,
      handlePrev,
      handleNext,
      pageStart,
      pageEnd
    }
  }
}
</script>

<style scoped>
#time {
  float: right;
}
</style>