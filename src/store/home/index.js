import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'
//home模块的小仓库
const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
}

const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  },
}
const actions = {
  //通过API里面的接口函数调用，向服务器发送请求，获取服务器数据
  async categoryList({ commit }) {
    let result = await reqCategoryList()
    if (result.code == 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  //获取首页轮播图的数据getBannerList
  async getBannerList({ commit }) {
    let result = await reqGetBannerList()
    if (result.code == 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  //获取家电数据
  async getFloorList({ commit }) {
    let result = await reqFloorList()
    if (result.code == 200) commit('GETFLOORLIST', result.data)
  },
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}
