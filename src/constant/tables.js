export const bookHouseProjectColumns = [
    {
        name: 'projectId',
        required: true,
        label: '活动编号',
        align: 'center',
        field: 'projectId',
    },
    {
        name: 'projectName',
        required: false,
        label: '活动名称',
        align: 'center',
        field: 'projectName',
    },
    {
        name: 'houseSum',
        required: false,
        label: '活动房源',
        align: 'center',
        field: 'houseSum',
    },
    {
        name: 'personSum',
        required: false,
        label: '活动租客',
        align: 'center',
        field: 'personSum',
    },
    {
        name: 'projectProcessStatusName',
        required: false,
        label: '进行状态',
        align: 'center',
        field: 'projectProcessStatusName',
    },
    {
        name: 'projectStatusName',
        required: false,
        label: '上架状态',
        align: 'center',
        field: 'projectStatusName',
    },
    {
        name: 'createUserName',
        required: false,
        label: '创建人',
        align: 'center',
        field: 'createUserName',
    },
    {
        name: 'createTime',
        required: false,
        label: '创建时间',
        align: 'center',
        field: 'createTime',
    },
    {
        name: 'operation',
        required: false,
        label: '操作',
        align: 'center',
        field: 'operation',
    },
]


export const bookHouseOrderColumns = [
    {
        name: 'orderNo',
        required: true,
        label: '订单编号',
        align: 'center',
        field: 'orderNo',
    },
    {
        name: 'projectNo',
        required: true,
        label: '活动编号',
        align: 'center',
        field: 'projectNo',
    },
    {
        name: 'projectName',
        required: false,
        label: '活动名称',
        align: 'center',
        field: 'projectName',
    },
    {
        name: 'houseNo',
        required: false,
        label: '房源编号',
        align: 'center',
        field: 'houseNo',
    },
    {
        name: 'houseProfile',
        required: false,
        label: '房源信息',
        align: 'center',
        field: 'houseProfile',
    },
    {
        name: 'bookUserName',
        required: false,
        label: '姓名',
        align: 'center',
        field: 'bookUserName',
    },
    {
        name: 'bookUserPhone',
        required: false,
        label: '手机号',
        align: 'center',
        field: 'bookUserPhone',
    },
    {
        required: false,
        label: '身份证号',
        align: 'center',
        field: 'bookUserIdCard',
    },
    {
        name: 'orderStatus',
        required: false,
        label: '订单状态',
        align: 'center',
        field: 'orderStatus',
    },
    {
        name: 'createTime',
        required: false,
        label: '创建时间',
        align: 'center',
        field: 'createTime',
    },
]


export const bookUserColumns = [
    {
        name: 'bookOrder',
        required: true,
        label: '选房顺序',
        align: 'center',
        field: 'bookOrder',
    },
    {
        name: 'bookUserName',
        required: true,
        label: '姓名',
        align: 'center',
        field: 'bookUserName',
    },
    {
        name: 'bookUserPhone',
        required: false,
        label: '手机号',
        align: 'center',
        field: 'bookUserPhone',
    },
    {
        name: 'bookUserIdCard',
        required: false,
        label: '身份证号',
        align: 'center',
        field: 'bookUserIdCard',
    },
    {
        name: 'bookMailStatusName',
        required: false,
        label: '短信发送状态',
        align: 'center',
        field: 'bookMailStatusName',
    },
    {
        name: 'bookTeamStatusName',
        required: false,
        label: '组队状态',
        align: 'center',
        field: 'bookTeamStatusName',
    },
    {
        name: 'bookUserRealStartTime',
        required: false,
        label: '选房起始时间',
        align: 'center',
        field: 'bookUserRealStartTime',
    },
    {
        name: 'operation',
        required: false,
        label: '操作',
        align: 'center',
        field: 'operation',
        style: 'color: #027BE3;cursor: pointer',
    },
]

export const bookHouseColumns = [
    {
        name: 'projectHouseId',
        required: true,
        label: '房源编号',
        align: 'center',
        field: 'projectHouseId',
    },
    {
        name: 'houseProjectId',
        required: true,
        label: '项目编号',
        align: 'center',
        field: 'houseProjectId',
    },
    {
        name: 'houseProjectName',
        required: true,
        label: '项目名称',
        align: 'center',
        field: 'houseProjectName',
    },
    {
        name: 'divisionName',
        required: false,
        label: '所在区域',
        align: 'center',
        field: 'divisionName',
    },
    {
        name: 'houseAddress',
        required: false,
        label: '房源信息',
        align: 'center',
        field: 'houseAddress',
    },
    {
        name: 'rentStyle',
        required: false,
        label: '租赁方式',
        align: 'center',
        field: 'rentStyle',
    },
    {
        name: 'houseModel',
        required: false,
        label: '房型',
        align: 'center',
        field: 'houseModel',
    },
    {
        name: 'orientation',
        required: false,
        label: '朝向',
        align: 'center',
        field: 'orientation',
    },
    {
        name: 'area',
        required: false,
        label: '面积',
        align: 'center',
        field: 'area',
    },
    {
        name: 'houseFloor',
        required: false,
        label: '楼层',
        align: 'center',
        field: 'houseFloor',
    },
    {
        name: 'rentalCharge',
        required: false,
        label: '租金',
        align: 'center',
        field: 'rentalCharge',
    },
    {
        name: 'operation',
        required: false,
        label: '操作',
        align: 'center',
        field: 'operation',
        style: 'color: #027BE3;cursor: pointer',
    },
]

export const importHouseProjectColumns = [
    {
        name: 'houseProjectId',
        required: true,
        label: '项目编号',
        align: 'center',
        field: 'houseProjectId',
    },
    {
        name: 'houseProjectName',
        required: true,
        label: '项目名称',
        align: 'center',
        field: 'houseProjectName',
    },
    {
        name: 'houseProjectNum',
        required: true,
        label: '可关联房源',
        align: 'center',
        field: 'houseProjectNum',
    },
    {
        name: 'operation',
        required: true,
        label: '操作',
        align: 'center',
        field: 'operation',
        style: 'color: #027BE3;cursor: pointer',
    },
]