import Vue from 'vue';
import App from './App.vue';
//引入路由
import router from '@/router';
// 引入仓库
import store from '@/store/index.js';
//注册全局组件
import TypeNav from '@/components/TypeNav/index.vue';
import Pagination from '@/components/Pagination/index.vue';
//第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);
//引入MockServer.js----mock数据，虽然没有暴露，但是只引进来执行一次就行
import '@/mock/mockServe';
Vue.config.productionTip = false;
//测试
// import { reqCategoryList } from './api/index.js'
// reqCategoryList()
// 引入swiper样式
import 'swiper/css/swiper.css';
//统一接口API文件夹里面全部请求函数
import * as API from '@/api';
//按需引入elementui组件
import { Button, MessageBox } from 'element-ui';
Vue.use(Button);
//饿了么ui注册组件是另一种写法，挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入路由懒加载
import VueLazyload from 'vue-lazyload';
import atm from '@/assets/R-C.gif';
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: atm,
});

//引入自定义插件
// import myPlugins from './plugins/myPlugins';
// Vue.use(myPlugins, {
//   name: 'upper',
// });
//引入表单校验插件
import '@/plugins/validate';
new Vue({
  render: (h) => h(App),
  //注册路由
  router,
  // 注册仓库,在每个组件的身上都拥有$store这个属性
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
}).$mount('#app');
