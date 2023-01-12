// *作用：对所有的api进行统一管理
import requests from "./request";
import mockRequests from "./mockRequests"
export const reqCategoryList = () => {
    // 发请求，返回promise对象
    return requests({
        url: '/product/getBaseCategoryList',
        // 不用写api，因为写了baseURL

    })
}
// 获取Banner （Home首页轮播图）的接口
export const reqBannerList = () => mockRequests({ url: '/banner', method: 'get' });
// 获取floor数据
export const reqFloorList = () => mockRequests({ url: '/floor', method: 'get' });