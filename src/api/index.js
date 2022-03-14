import axios from 'axios'
const baseURL=process.env.VUE_APP_BASE_URL_REMOTE
const instant=axios.create({
  baseURL,
  withCredentials:true
})

export const  post=(url,data)=>{
  return new Promise((resolve,reject)=>{
    instant.post(url,data)
      .then((response)=>{
        resolve(response)
      })
      .catch(reason=>{
        reject(reason)
      })
  })
}

export const get=(url,data)=>{
  return new Promise((resolve,reject)=>{
    instant.get(url,data)
      .then(response=>{
        resolve(response.data)
      })
      .catch(reason=>{
        reject(reason)
      })
  })
}