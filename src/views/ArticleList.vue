<template>
  <n-list bordered>
    <template #header>
      <n-gradient-text
          gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"
      >
        小河今天学习了吗~~~
      </n-gradient-text>
    </template>
    <n-list-item v-for="article in articleList" :key="article.id">
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
      <template #footer>
        <n-pagination v-model:page="page" :page-count="100"/>
      </template>
    </n-list-item>
  </n-list>
</template>
<script>
import {getArticleListData as fetchData} from "@/api/article";
import {DocumentTextOutline as DocumentTextIcon} from '@vicons/ionicons5'
import {reactive,ref} from 'vue'
import moment from 'moment'
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
    const parseDate = (timestamp) => {
      return moment(timestamp).format("YYYY年MM月DD日 HH:mm")
    }
    let articleList = reactive([])
    let _category=ref('')
    const getArticleListData = async (category) => {
      const {data} = await fetchData(category)
      _category.value=category
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
      const {id}=e
      router.push({
        name:'network',
        params:{
          id
        },

      })
    }
    return {
      getArticleListData,
      articleList,
      _category,
      parseDate,
      viewArticle
    }
  }
}
</script>

<style scoped>
#time {
  float: right;
}
</style>