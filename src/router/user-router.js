//用户感知到的导航，为index.js导航的子集

export const leftBarRouter = [
    {
        pageCode: "saasDashboard",
        pageTitle: "仪表盘",
        pageIcon: "fa-solid fa-chart-line",
        haveChild: false,
        webIsOpenChild: false,
        child: []
    },
    {
        pageCode: "saasHouseBook",
        pageTitle: "选房管理",
        pageIcon: "fa-solid fa-house-circle-check",
        haveChild: true,
        webIsOpenChild: true,
        child: [
            {
                pageCode: "saasHouseBookProject",
                pageTitle: "选房活动",
                pageIcon: "fa-solid fa-house-chimney-user",
                haveChild: false,
                webIsOpenChild: false,
                child: []
            },
            {
                pageCode: "saasHouseBookOrder",
                pageTitle: "选房订单",
                pageIcon: "fa-solid fa-house-lock",
                haveChild: false,
                webIsOpenChild: false,
                child: []
            },
        ],
    },
    {
        pageCode: "sassMessage",
        pageTitle: "消息管理",
        pageIcon: "fa-regular fa-envelope",
        haveChild: true,
        webIsOpenChild: false,
        child: [
            {
                pageCode: "saasMessageInbox",
                pageTitle: "消息通知",
                pageIcon: "fa-solid fa-inbox",
                haveChild: false,
                webIsOpenChild: false,
                child: []
            },
            {
                pageCode: "saasMessagePostbox",
                pageTitle: "发送通知",
                pageIcon: "fa-solid fa-signs-post",
                haveChild: false,
                webIsOpenChild: false,
                child: []
            },
        ],
    },
    {
        pageCode: "sassApproval",
        pageTitle: "审批管理",
        pageIcon: "fa-solid fa-check-to-slot",
        haveChild: true,
        webIsOpenChild: false,
        child: [
            {
                pageCode: "saasApprovalFlux",
                pageTitle: "审批流程",
                pageIcon: "fa-solid fa-bars-progress",
                haveChild: false,
                webIsOpenChild: false,
                child: []
            },
            {
                pageCode: "saasApprovalTemplates",
                pageTitle: "审批模板",
                pageIcon: "fa-solid fa-gears",
                haveChild: false,
                webIsOpenChild: false,
                child: []
            },
        ],
    },
    {
        pageCode: "sassAccount",
        pageTitle: "账户管理",
        pageIcon: "fa-solid fa-file-invoice",
        haveChild: true,
        webIsOpenChild: false,
        child: [
            {
                pageCode: "saasAccountMembers",
                pageTitle: "成员管理",
                pageIcon: "fa-solid fa-users-viewfinder",
                haveChild: false,
                webIsOpenChild: false,
                child: []
            },
            {
                pageCode: "saasAccountRoles",
                pageTitle: "角色管理",
                pageIcon: "fa-solid fa-id-card-clip",
                haveChild: false,
                webIsOpenChild: false,
                child: []
            },
            {
                pageCode: "saasAccountRights",
                pageTitle: "权限管理",
                pageIcon: "fa-solid fa-wand-sparkles",
                haveChild: false,
                webIsOpenChild: false,
                child: []
            },
        ],
    },
    {
        pageCode: "saasDictionary",
        pageTitle: "字典管理",
        pageIcon: "fa-regular fa-address-book",
        haveChild: false,
        webIsOpenChild: false,
        child: []
    },
    {
        pageCode: "saasCommonSettings",
        pageTitle: "通用设置",
        pageIcon: "fa-solid fa-wrench",
        haveChild: false,
        webIsOpenChild: false,
        child: []
    },
]