import {createRouter, createWebHistory} from "vue-router";
import NotFound from "@/pages/NotFound.vue";
import NotAuth from "@/pages/NotAuth.vue";
import NotLogin from "@/pages/NotLogin.vue";
import SaasMain from "@/pages/SaasMain.vue";
import SaasDashboard from "@/views/SaasDashboard.vue";
import SaasCommonSettings from "@/views/SaasCommonSettings.vue";
import SaasAccountMembers from "@/views/SaasAccountMembers.vue";
import SaasAccountRoles from "@/views/SaasAccountRoles.vue";
import SaasAccountRights from "@/views/SaasAccountRights.vue";
import SaasMessageInbox from "@/views/SaasMessageInbox.vue";
import SaasMessagePostbox from "@/views/SaasMessagePostbox.vue";
import SaasDictionary from "@/views/SaasDictionary.vue";
import SaasApprovalFlux from "@/views/SaasApprovalFlux.vue";
import SaasApprovalTemplates from "@/views/SaasApprovalTemplates.vue";
import SaasApprovalTemplatesNew from "@/views/SaasApprovalTemplatesNew.vue";

const router = createRouter({
    // history: createWebHashHistory(process.env.BASE_URL),
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'saasMain',
            component: SaasMain,
            children: [
                {
                    path: '',
                    name: 'default',
                    redirect: {name: 'saasDashboard'}
                },
                {
                    path: 'dashboard',
                    name: 'saasDashboard',
                    component: SaasDashboard,
                    meta: {
                        title: 'YunoSaas仪表盘'
                    },
                },
                {
                    path: 'account',
                    name: 'sassAccount',
                    children: [
                        {
                            path: 'members',
                            name: 'saasAccountMembers',
                            component: SaasAccountMembers,
                            meta: {
                                title: 'YunoSaas成员管理'
                            },
                        },
                        {
                            path: 'roles',
                            name: 'saasAccountRoles',
                            component: SaasAccountRoles,
                            meta: {
                                title: 'YunoSaas角色管理'
                            },
                        },
                        {
                            path: 'rights',
                            name: 'saasAccountRights',
                            component: SaasAccountRights,
                            meta: {
                                title: 'YunoSaas权限管理'
                            },
                        },
                    ]
                },
                {
                    path: 'message',
                    name: 'sassMessage',
                    children: [
                        {
                            path: 'inbox',
                            name: 'saasMessageInbox',
                            component: SaasMessageInbox,
                            meta: {
                                title: 'YunoSaas消息通知'
                            },
                        },
                        {
                            path: 'postbox',
                            name: 'saasMessagePostbox',
                            component: SaasMessagePostbox,
                            meta: {
                                title: 'YunoSaas发送通知'
                            },
                        },
                    ]
                },
                {
                    path: 'approval',
                    name: 'sassApproval',
                    children: [
                        {
                            path: 'flux',
                            name: 'saasApprovalFlux',
                            component: SaasApprovalFlux,
                            meta: {
                                title: 'YunoSaas审批流程'
                            },
                        },
                        {
                            path: 'templates',
                            name: 'saasApprovalTemplates',
                            component: SaasApprovalTemplates,
                            meta: {
                                title: 'YunoSaas审批模板'
                            },
                        },
                        {
                            path: 'template/new',
                            name: 'saasApprovalTemplatesNew',
                            component: SaasApprovalTemplatesNew,
                            meta: {
                                title: 'YunoSaas创建审批模板'
                            },
                        },
                    ]
                },
                {
                    path: 'workOder',
                    name: 'saasWorkOrder',
                    children: [],
                },
                {
                    path: 'dict',
                    name: 'saasDictionary',
                    component: SaasDictionary,
                    meta: {
                        title: 'YunoSaas字典管理'
                    },
                },
                {
                    path: 'settings',
                    name: 'saasCommonSettings',
                    component: SaasCommonSettings,
                    meta: {
                        title: 'YunoSaas通用设置'
                    },
                },
            ],
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


export function backToHome(thisRouter) {
    thisRouter.push({
        name: "saasDashboard"
    })
}

export function toSpecifyPage(thisRouter, pageName) {
    thisRouter.push({
        name: pageName
    })
}

export function toSpecifyPageWithQuery(thisRouter, pageName, queryMap) {
    thisRouter.push({
        name: pageName,
        query: queryMap,
    })
}

export function toBack(thisRouter) {
    thisRouter.go(-1)
}

export default router;
