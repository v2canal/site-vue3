import {post,get} from './index'

export const getCommentList=()=>{
  return get('/getCommentList')
}
export const publishComment=({comment,username})=>{
  return post('/publishComment',{
    comment,
    username
  })
}