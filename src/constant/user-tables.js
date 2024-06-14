export const UserApiColumns = [
    {
        name: 'apiId',
        required: true,
        label: '接口编号',
        align: 'center',
        field: 'apiId',
        miniCardHaveLabel: true,
    },
    {
        name: 'apiName',
        required: false,
        label: '接口名称',
        align: 'center',
        field: 'apiName',
        miniCardHaveLabel: false,
    },
    {
        name: 'apiAddress',
        required: false,
        label: '接口地址',
        align: 'center',
        field: 'apiAddress',
        miniCardHaveLabel: false,
        miniCardSite: "subscript",
    },
    {
        name: 'apiRegex',
        required: false,
        label: '匹配正则',
        align: 'center',
        field: 'apiRegex',
        miniCardHaveLabel: true,
    },
    {
        name: 'apiMark',
        required: false,
        label: '接口备注',
        align: 'center',
        field: 'apiMark',
        miniCardHaveLabel: true,
    },
    {
        name: 'statusName',
        required: false,
        label: '接口状态',
        align: 'center',
        field: 'statusName',
        miniCardHaveLabel: true,
    },
    {
        name: 'createTime',
        required: false,
        label: '创建时间',
        align: 'center',
        field: 'createTime',
        miniCardHaveLabel: false,
        miniCardSite: "footerRight",
    },
    {
        name: 'operation',
        required: false,
        label: '操作',
        align: 'center',
        field: 'operation',
        miniCardHaveLabel: false,
    },
]


export const UserDictColumns = [
    {
        name: 'dictId',
        required: true,
        label: '字典编号',
        align: 'center',
        field: 'dictId',
        miniCardHaveLabel: true,
    },
    {
        name: 'dictCode',
        required: false,
        label: '字典编码',
        align: 'center',
        field: 'dictCode',
        miniCardHaveLabel: false,
        miniCardSite: "subscript",
    },
    {
        name: 'dictName',
        required: false,
        label: '字典名称',
        align: 'center',
        field: 'dictName',
        miniCardHaveLabel: false,
    },
    {
        name: 'dictValueList',
        required: false,
        label: '字典值',
        align: 'center',
        field: 'dictValueList',
        miniCardHaveLabel: true,
    },
    {
        name: 'dictMark',
        required: false,
        label: '字典备注',
        align: 'center',
        field: 'dictMark',
        miniCardHaveLabel: true,
    },
    {
        name: 'createTime',
        required: false,
        label: '创建时间',
        align: 'center',
        field: 'createTime',
        miniCardHaveLabel: false,
        miniCardSite: "footerRight",
    },
    {
        name: 'operation',
        required: false,
        label: '操作',
        align: 'center',
        field: 'operation',
        miniCardHaveLabel: false,
    },
]
