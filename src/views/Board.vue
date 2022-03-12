<template>
  <n-list class="board-list">
    <template #header>
      <textarea class="board-list-textarea"  autocomplete="off" rows="10" placeholder="你想对我说什么?"/>
      <n-button strong secondary type="primary">
        发表
      </n-button>
    </template>

    <n-list-item>
      <template #prefix>
        <n-avatar
            round
            size="small"
            src="http://codeleilei.gitee.io/blog/default_avatar.jpeg"
        />
      </template>
      名称
      时间
      <br>
      内容
      <n-button text>
        回复
      </n-button>
    </n-list-item>
    <template #footer>
      <n-pagination v-model:page="page" :page-count="100"/>
    </template>
  </n-list>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.board-list{
  padding: 20px 50px;
  .board-list-textarea{
    width: 100%;
    background-color:rgba(241,241,241,.5);
    outline-color: #40a9ff;
    &:hover{
        box-shadow: 0px 0px 10px #40a9ff;
    }
    //&:focus{
    //  box-shadow: 0px 0px 10px #40a9ff;
    //}
  }
}
</style>