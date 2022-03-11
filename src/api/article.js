import {get} from './index'
export const getArticleListData = (category) => {
  return get('/getArticleList',{
    params:{
      category
    }
  })
}
export const getArticleById = (id)=>{
  return get('/getArticleById',{
    params:{
      id
    }
  })
}