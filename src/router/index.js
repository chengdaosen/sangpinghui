//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '@/pages/Home/index.vue';
import Search from '@/pages/Search/index.vue';
import Login from '@/pages/Login/index.vue';
import Register from '@/pages/Register/index.vue';
import Detail from '@/pages/Detail/index.vue';
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue';
import ShopCart from '@/pages/ShopCart/index.vue';
import Trade from '@/pages/Trade/index.vue';
import Pay from '@/pages/Pay/index.vue';
import PaySuccess from '@/pages/PaySuccess/index.vue';
import Center from '@/pages/Center/index.vue';
import store from '@/store';
//引入二级路由
import MyOrder from '@/pages/Center/myOrder/index.vue';
import GroupOrder from '@/pages/Center/groupOrder/index.vue';
Vue.use(VueRouter);
// 重写push和replace
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
let router = new VueRouter({
  // 滚动行为
  scrollBehavior(to, from, savedPosion) {
    //返回的这个y=e，代表的滚动条在最上方
    return { y: 0 };
  },
  routes: [
    {
      //路由懒加载
      path: '/home',
      component: () => import('@/pages/Home/index.vue'),
      meta: { show: true },
    },
    {
      path: '/search/:keyword', //：keyword是params的占位
      component: Search,
      meta: { show: true },
      name: 'search',
    },
    {
      path: '/login',
      component: Login,
      meta: { show: false },
    },
    {
      path: '/register',
      component: Register,
      meta: { show: false },
    },
    {
      path: '/detail/:id',
      component: Detail,
      meta: { show: true },
    },
    {
      path: '/AddCartSuccess',
      name: 'AddCartSuccess',
      component: AddCartSuccess,
      meta: { show: true },
    },
    {
      path: '/ShopCart',
      component: ShopCart,
      meta: { show: true },
    },
    {
      path: '/Trade',
      component: Trade,
      meta: { show: true },
      //路由独享守卫
      beforeEnter: (to, from, next) => {
        //去交易页面必须从购物车而来
        if (from.path == '/shopcar') {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      path: '/Pay',
      component: Pay,
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        //去交易页面必须从交易而来
        if (from.path == '/trade') {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      path: '/PaySuccess',
      component: PaySuccess,
      meta: { show: true },
    },
    {
      path: '/Center',
      component: Center,
      meta: { show: true },
      //注册二级路由
      children: [
        {
          path: 'myOrder',
          component: MyOrder,
          meta: { show: true },
        },
        {
          path: 'groupOrder',
          component: GroupOrder,
          meta: { show: true },
        },
        {
          path: '/Center',
          redirect: '/center/myorder',
        },
      ],
    },

    //重定向，在项目跑起来的时候，访问/,立马让他定到首页
    {
      path: '*',
      redirect: '/home',
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  // to and from are both route objects. must call `next`.
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if (token) {
    //用户已经登录；不能去login
    if (to.path == '/login' || to.path == '/register') {
      next('/home');
    } else {
      //登录了不是去login,如果用户名已有
      if (name) {
        next();
      } else {
        //没有用户信息，派发action让仓库储存用户信息再跳转
        try {
          //获取用户信息成功
          await store.dispatch('user/getUserInfo');
          next();
        } catch (error) {
          //token失效了，清除token,重新登录
          await store.dispatch('user/userLogout');
          //再去login
          next('/login');
        }
      }
    }
  } //未登录
  else {
    //未登录不能去交易相关，不能去支付相关
    let toPath = to.path;
    if (
      toPath == '/trade' ||
      toPath == '/pay' ||
      toPath == '/paysuccess' ||
      toPath == '/center'
    ) {
      next('/login?redirect=' + toPath);
    } else {
      next();
    }
  }
});
export default router;
