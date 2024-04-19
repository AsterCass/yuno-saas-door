import {createRouter, createWebHistory} from "vue-router";
import SaasHome from "@/pages/SaasHome.vue";
import NotFound from "@/pages/NotFound.vue";
import NotAuth from "@/pages/NotAuth.vue";
import NotLogin from "@/pages/NotLogin.vue";

const router = createRouter({
    // history: createWebHashHistory(process.env.BASE_URL),
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "saasHome",
            component: SaasHome,
            meta: {
                title: 'Saas主页'
            },
        },
        {
            path: "/404",
            name: '404',
            component: NotFound,
            meta: {
                title: 'PageNotFound'
            },
        },
        {
            path: "/notLogin",
            name: 'notLogin',
            component: NotLogin,
            meta: {
                title: 'UserNotLogin'
            },
        },
        {
            path: "/notAuth",
            name: 'notAuth',
            component: NotAuth,
            meta: {
                title: 'UserNotPermission'
            },
        },
        {
            path: "/:catchAll(.*)",
            name: "notFound",
            component: NotFound,
            meta: {
                title: 'PageNotFound'
            },
        },
    ],
});


router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

router.afterEach(() => {
    window.scrollTo(0, 0)
})

export default router;
