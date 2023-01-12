import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from './store'
// *三级联动组件--全局组件
import TypeNav from "@/components/TypeNav"
Vue.config.productionTip = false
// *引入后全局注册Vue.component("组件名",组件)
Vue.component(TypeNav.name, TypeNav);
//  *引入使用axios请求,测试代码
// import { reqCategoryList } from "@/API";
// reqCategoryList();
// *把mockServer.js在入口文件中引入
import '@/mock/mockServe'
// *引入swiper样式
import 'swiper/css/swiper.css'
new Vue({
  render: h => h(App),
  // 注册路由(key,value一致，省略value，router小写)
  // 注册路由信息：这里注册后，组件商都拥有$route,$router属性
  router,//注册路由
  store,//注册vuex，组件上多了￥store属性
}).$mount('#app')
