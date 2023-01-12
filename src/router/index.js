// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter)
// 引入路由组件
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Search from "@/pages/Search";

// 配置路由
export default new VueRouter({
    // 配置路由
    routes: [
        {
            path: "/Home",
            component: Home,
            meta: { show: true },
        },
        {
            path: "/Search/:keyword?",
            // 用param传参,?表示可传可不传
            name: "Search",
            component: Search,
            meta: { show: true },
            props: true,
        }
        ,
        {
            path: '/Login',
            component: Login,
            meta: { show: false },
        }
        ,
        {
            path: '/Register',
            component: Register,
            meta: { show: false },
        },
        // 重定向:项目跑起来后，访问“/”,立马定向到首页
        {
            path: "*",
            // redirect:路径
            redirect: "/Home",
        }

    ]
})