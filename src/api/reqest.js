//对于axios进行二次封装
import axios from 'axios';
//引入进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
//引入store
import store from '@/store';
const requests = axios.create({
  //配置对象，基础路径，发请求的时候，路径当中会出现api
  baseURL: '/api',
  //代表请求发送的时间5s
  timeout: 5000,
});
//请求拦截器：在发请求时，请求拦截器可以检测到，可以在请求发出去时做一些事情
requests.interceptors.request.use((config) => {
  //config配置对象，对象里有一个属性很重要。headers请求头
  if (store.state.detail.uuid_token) {
    //请求头添加一个字段：和后台商量好的
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  //需要携带token带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  nprogress.start();
  return config;
});
//响应拦截器
requests.interceptors.response.use(
  (res) => {
    //成功的回调函数
    nprogress.done();
    return res.data;
  },
  (error) => {
    //响应失败的回调函数
    return Promise.reject(new Error('failed'));
  }
);
export default requests;
