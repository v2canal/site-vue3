import {post} from './index'
export const register = ({username,password}) => {
  return post('/register',{
    username,password
  })
}
export const logIn=({username,password})=>{
  return post('/login',{
    username,password
  })
}
export const verify=()=>{
  return post('/verify')
}
export const logOut=()=>{
  return post('/logout')
}