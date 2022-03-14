<template>
  <n-list class="board-list">
    <template #header>
      <textarea class="board-list-textarea" v-model="comment" autocomplete="off" rows="10" placeholder="你想对我说什么?"/>
      <n-button strong secondary type="primary" @click="handleComment" :disabled="!context.isLogIn">
        发表
      </n-button>
    </template>
    <n-list-item v-for="commentItem in commentList.slice(pageStart,pageEnd)" :key="commentItem.id">
      <template #prefix>
        <n-avatar
            round
            size="small"
            src="http://codeleilei.gitee.io/blog/default_avatar.jpeg"
        />
      </template>
      <span class="comment-time">{{ commentItem.date }}</span>
      <br>
      <span class="comment-content">{{ commentItem.comment }}</span>
      <br>
      <n-button text :disabled="!context.isLogIn">
        回复
      </n-button>
    </n-list-item>
    <template #footer>
      <n-pagination v-model:page="page"
                    v-model:page-size="pageSize"
                    :item-count="commentList.length"
                    :next="handleNext"
                    :prev="handlePrev"
      />
    </template>
  </n-list>
</template>

<script setup>
import {inject, onMounted, ref, reactive} from 'vue'
import {useMessage} from 'naive-ui'
import {publishComment, getCommentList} from "@/api/comment";

const message = useMessage()

const context = inject('context')
const comment = ref('')
const commentList = reactive([])
//分页数据
const page = ref(1)//当前页码
const pageSize = ref(7)//当前页面大小
let pageStart=ref()
let pageEnd=ref()

function handleNext(e) {
  pageStart.value=e.startIndex
  pageEnd.value=e.endIndex
  return '下一页'
}
function handlePrev() {
  return '上一页'
}
//挂载组件时，初始化留言版
onMounted(() => {
  getCommentList().then((data) => {
    commentList.push(...data.data)
  }).catch(err => {
    message.error('拉取评论失败')
  })
})

//发表评论
function handleComment() {
  publishComment({username: context.username, comment: comment.value}).then(_ => {
    comment.value = ''
    message.success("留言成功!")
  }).catch(_ => {
    message.error('留言失败!')
  })
}
</script>

<style lang="scss" scoped>
.board-list {
  padding: 20px 50px;

  .n-list-item {
    .comment-time {
      color: #cccccc;
    }
    .n-button {
      color: #556677;
    }
  }
  .board-list-textarea {
    width: 100%;
    background-color: rgba(241, 241, 241, .5);
    outline-color: #40a9ff;
    &:hover {
      box-shadow: 0px 0px 10px #40a9ff;
    }
  }
}

</style>