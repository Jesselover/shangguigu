import { reqCategoryList, reqBannerList, reqFloorList } from "@/API";

const state = {
    //* state中的默认初始值不要瞎写，与服务器返回值类型一致
    //商品分类的数据,三级联动数据
    categoryList: [],
    //首页轮播图的数据
    bannerList: [],
    // floor组件数据
    floorList: [],
};
const mutations = {
    GATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    },
};
const actions = {
    async categoryList({ commit }) {
        // 通过api里面的函数接口调用，想服务器发请求，获取数据.根据接口的返回值初始化
        let result = await reqCategoryList();
        // console.log(result);
        if (result.code == 200) {
            commit("GATEGORYLIST", result.data)
        }
    },
    // 获取Home中轮播图的数据

    async getBannerList({ commit }) {
        //获取首页数据
        let result = await reqBannerList();
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data);
            // console.log(result);
        }
    },
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            commit("GETFLOORLIST", result.data);
        }
    },

};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters,
}