import { createRouter, createWebHashHistory } from 'vue-router'
import home from "../views/home/home.vue";

//路由数组
const routes = [
    {
        path: "/",
        name: "home",
        component: home,
        meta: {
            title: "刘志鹏的主页"
        }
    },
    {
        path: "/resume",
        name: "resume",
        component: () => require('../views/resume/resume.vue'), // Vue异步组件和Webpack的代码分割
        meta: {
            title: "刘志鹏的简历-前端开发工程师"
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = "刘志鹏的个人网站"
    }
    next()
})

export default router
