import {createRouter, createWebHistory} from "vue-router";
import SaasHome from "@/pages/SaasHome.vue";

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
        },
        {
            path: "/notLogin",
            name: 'notLogin',
        },
        {
            path: "/:catchAll(.*)",
            name: "notFound",
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
