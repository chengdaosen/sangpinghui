//这个模块api进行统一管理
import requests from './reqest.js';
import mockRequests from './mockAjax';

export const reqCategoryList = () =>
  requests.get('/api/product/getBaseCategoryList');

export const reqGetBannerList = () => mockRequests.get('/banner');
export const reqFloorList = () => mockRequests.get('/floor');
//请求搜索模块数据
//当前这个接口给服务器传递参数至少是一个空对象
//url前面要加api！！！
export const reqGetSearchInfo = (params) =>
  requests({ url: '/api/list', method: 'post', data: params });

//获取产品详情页信息的接口
export const reqGoodsInfo = (id) =>
  requests({ url: `/api/item/${id}`, method: 'get' });
//将产品添加到购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({
    url: `/api/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
  });
//删除购物产品的接口
//URL:/api/cart/deleteCart/{skuId}   method:DELETE
export const reqDeleteCartById = (skuId) =>
  requests({
    url: `/api/cart/deleteCart/${skuId}`,
    method: 'delete',
  });
//修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get
export const reqUpdateCheckedByid = (skuId, isChecked) =>
  requests({ url: `/api/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });
//获取购物车列表数据接口
export const reqCartList = () =>
  requests({
    url: '/api/cart/cartList',
    method: 'get',
  });
//获取验证码
export const reqGetCode = (phone) =>
  requests({
    url: `/api/user/passport/sendCode/${phone}`,
    method: 'get',
  });
//注册
export const reqUserRegister = (data) =>
  requests({
    url: '/api/user/passport/register',
    data,
    method: 'post',
  });
//登录
export const reqUserLogin = (data) =>
  requests({
    url: '/api/user/passport/login',
    data,
    method: 'post',
  });
//获取用户信息
export const reqUserInfo = () =>
  requests({
    url: '/api/user/passport/auth/getUserInfo',
    method: 'get',
  });
//退出登录
export const reqlogout = () =>
  requests({ url: '/api/user/passport/logout', method: 'get' });
//获取用户地址信息
export const reqAddressInfo = () =>
  requests({
    url: '/api/user/userAddress/auth/findUserAddressList/',
    method: 'get',
  });
//获取商品清单
//URL:/api/order/auth/trade   method:get
export const reqOrderInfo = () =>
  requests({ url: '/api/order/auth/trade', method: 'get' });

//提交订单的接口
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post',
  });
//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = (orderId) =>
  requests({
    url: `/api/payment/weixin/createNative/${orderId}`,
    method: 'get',
  });
//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) =>
  requests({
    url: `/api/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get',
  });
//获取个人中心的数据
//api/order/auth/{page}/{limit}  get
export const reqMyOrderList = (page, limit) =>
  requests({ url: `/api/order/auth/${page}/${limit}`, method: 'get' });
