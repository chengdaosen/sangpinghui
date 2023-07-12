import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
//封装临时身份模块
import { getUUID } from '@/utils/uuid_token'
const state = {
  goodInfo: {},
  uuid_token: getUUID(),
}
//！！！！注意是mutations不是mutation！！！！！
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  },
}
const actions = {
  //获取产品信息的action
  async getGoodInfo({ commit }, id) {
    let result = await reqGoodsInfo(id)
    if (result.code === 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  //将产品添加到购物车中
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    //加入购物车返回的解构
    //加入购物车以后，前台将参数带给服务器
    //因为服务器没有返回其余数据，因此不需要三连环存储数据
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if (result.code == 200) {
      //代表服务器加入购物车成功
      return 'ok'
    } else {
    }
    //代表加入购物车失败
    return Promise.reject(new Error('faile'))
  },
}
const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {}
    //！！！记得加上||[]不然显示undefine
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  },
}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}
