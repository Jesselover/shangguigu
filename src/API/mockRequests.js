// axios二次封装
// * 引入
import axios from 'axios';
//? 引入进度条
import nprogress from 'nprogress';
// ?引入进度条样式
import 'nprogress/nprogress.css';

// *创建axios实例
const requests = axios.create({
    // 配置对象
    baseURL: '/mock',// 基础路径，给发请求的路径上都带上api（ 整个项目，接口前缀都有`/api`）
    timeout: 5000, //超时时间为两秒
});
// *请求拦截器：发请求之前就可拦截到，在请求发出前执行
requests.interceptors.request.use((config) => {
    // config:配置对象，对象里面有请求头headers
    // ?进度条开始
    console.log('发送请求mock');
    nprogress.start();
    return config;
});
// *响应拦截器
requests.interceptors.response.use((res) => {
    // ?进度条结束
    console.log('响应请求mock');
    nprogress.done();
    return res.data;
}, (error) => {
    return Promise.reject(new Error('fail'));
});

// *对外暴露
export default requests;
