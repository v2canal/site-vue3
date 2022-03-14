<template>
  <n-list bordered>
    <template #header>
      <n-gradient-text
          gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"
      >
        小河今天学习了吗~~~
      </n-gradient-text>
    </template>
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
import {reactive, ref} from 'vue'
import {parseDate} from "@/utils/moment";
import {router} from '@/router'

export default {
  name: "ArticleList",
  components: {DocumentTextIcon},
  mounted() {
  },
  created() {
    this.$watch(
        () => this.$route.path,
        () => {
          const {category} = this.$route.query
          this.getArticleListData(category);
        },
        {immediate: true}
    )
  },
  setup() {
    const page = ref(1)//当前页码
    const pageSize = ref(10)//当前页面大小
    let pageStart=ref()
    let pageEnd=ref()

    function handleNext(e) {
      pageStart.value=e.startIndex
      pageEnd.value=e.endIndex
      console.log(e)
      return '下一页'
    }
    function handlePrev() {
      return '上一页'
    }
    let articleList = reactive([])
    let _category = ref('')
    const getArticleListData = async (category) => {
      const {data} = await fetchData(category)
      _category.value = category
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
    const viewArticle = (e) => {
      const {id} = e
      router.push({
        name: 'network',
        params: {id},
      })
    }
    return {
      getArticleListData,
      articleList,
      _category,
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