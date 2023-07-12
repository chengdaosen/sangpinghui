import { v4 as uuidv4 } from 'uuid'
export const getUUID = () => {
  //先从本地存储中获取uuid看一下本地存储里面是否有
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  //如果没有就生成
  if (!uuid_token) {
    uuid_token = uuidv4()
    localStorage.getItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}
