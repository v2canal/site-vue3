<template>
  <div class="article-component">
    <div class="article-title">
      <h1>{{ article.title }}</h1>
    </div>
    <div class="article-content" :innerHTML="article.text_html"/>
    <div class="article-navbar"></div>
    <template>
      <n-back-top :right="50"/>
    </template>
  </div>
</template>
<script>
import "highlight.js/styles/hybrid.css"
import {getArticleById,} from '@/api/article'
import {reactive, onMounted} from 'vue'

export default {
  props: ['id'],
  setup(props) {
    onMounted(() => {
      init()
    })
    const article = reactive({
      title: '',
      text_html: ''
    })

    async function init() {
      const {data} = await getArticleById(props.id)
      article.text_html = data.text_html
      article.title = data.title
    }

    return {
      init,
      article
    }
  }

}
</script>

<style lang="scss">
$DETAIL_THEME_ACTIVE: "#eb4d4b";
.article-title {
  text-align: center;
}

.article-content {
  padding: 20px;

  .hljs {
    position: relative;
    padding: 30px 10px 10px 10px;
    font-size: 16px;
    border-radius: 10px;
    overflow: auto;

    &::after, &::before {
      position: absolute;
      top: 10px;
      display: block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    &::after {
      content: "";
      left: 8px;
      background-color: red;
    }

    &::before {
      content: "";
      left: 28px;
      background-color: yellow;
    }

    code {
      &::before {
        position: absolute;
        top: 10px;
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        content: "";
        left: 48px;
        background-color: lightgreen;
      }
    }
  }

  p, li {
    line-height: 26px;
    font-size: 16px;

    code {
      color: $DETAIL_THEME_ACTIVE;
      margin: 0 3px;
      text-shadow: 0 0 5px pink
    }
  }


  li {
    font-size: 15px;
  }

  > p, > ol {
    margin-bottom: 30px;
  }

  blockquote {
    margin-inline-start: 0;
    background-color: #eee;
    position: relative;
    color: #333;

    p {
      padding: 8px 10px;
    }

    &::before {
      content: "";
      position: absolute;
      width: 5px;
      height: 100%;
      left: 0;
      top: 0;
      background-color: #ccc;
    }
  }

  table {
    border: solid #add9c0;
    border-width: 1px 0px 0px 1px;

    td, th {
      border: solid #add9c0;
      border-width: 0px 1px 1px 0px;
      padding: 10px 0px;
    }
  }

  strong {
    margin: 0 3px;
  }

  h1, h2, h3, h4, h5, h6 {
    color: inherit;
  }

  h1 {
    font-size: 30px;
    margin-bottom: 25px;
    border-bottom: 2px solid $DETAIL_THEME_ACTIVE;

    &::before {
      content: "# ";
      color: $DETAIL_THEME_ACTIVE;
      font-size: 1em;
    }
  }

  h2 {
    font-size: 22px;
    margin-bottom: 20px;

    &::before {
      content: "## ";
      font-size: .8em;
      color: $DETAIL_THEME_ACTIVE;
    }

  }

  h3 {
    font-size: 20px;
    margin-bottom: 20px;

    &::before {
      content: "### ";
      font-size: .7em;
      color: $DETAIL_THEME_ACTIVE;
    }
  }

  h4 {
    font-size: 18px;
    margin-bottom: 20px;

    &::before {
      content: "#### ";
      font-size: .6em;
      color: $DETAIL_THEME_ACTIVE;
    }
  }

  h5 {
    font-size: 15px;
    margin-bottom: 20px;

    &::before {
      content: "##### ";
      font-size: .5em;
      color: $DETAIL_THEME_ACTIVE;
    }
  }

  img {
    width: 80%;
  }

}

</style>