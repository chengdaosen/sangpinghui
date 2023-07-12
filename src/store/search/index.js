import { reqGetSearchInfo } from '@/api'
const state = {
  searchList: {},
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  },
}
const actions = {
  //获取search模块的数据
  async getSearchList({ commit }, params = {}) {
    //至少传递一个参数（空对象）
    //params形参是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    const result = await reqGetSearchInfo(params)
    if (result.code == 200) {
      commit('GETSEARCHLIST', result.data)
    }
  },
}
const getters = {
  goodsList(state) {
    //假如没有网网络不给力返回的应该是undefined
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  },
} //为简化数据而生
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}
