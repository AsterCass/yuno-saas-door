import {ref} from "vue";

export const ComplexTableColumnEnum = Object.freeze({
    POINTED: 0,
    OPERATIONS: 1,
});

export const ProjectProcessStatusEnum = {
    WILL: {code: 0, desc: "待开始"},
    ING: {code: 1, desc: "进行中"},
    ED: {code: 2, desc: "已结束"},

    getDesc: function (code) {
        for (let key in this) {
            if (this[key].code === code) {
                return this[key].desc;
            }
        }
        return null;
    }
}

export const ProjectStatusEnum = {
    DOWN: {code: 0, desc: "下架"},
    UP: {code: 1, desc: "上架"},

    getDesc: function (code) {
        for (let key in this) {
            if (this[key].code === code) {
                return this[key].desc;
            }
        }
        return null;
    }
}

export const projectProcessStatusOpt = ref([
    {
        label: ProjectProcessStatusEnum.WILL.desc,
        value: ProjectProcessStatusEnum.WILL.code,
    },
    {
        label: ProjectProcessStatusEnum.ING.desc,
        value: ProjectProcessStatusEnum.ING.code,
    },
    {
        label: ProjectProcessStatusEnum.ED.desc,
        value: ProjectProcessStatusEnum.ED.code,
    },
])


export const projectStatusOpt = ref([
    {
        label: ProjectStatusEnum.DOWN.desc,
        value: ProjectStatusEnum.DOWN.code,
    },
    {
        label: ProjectStatusEnum.UP.desc,
        value: ProjectStatusEnum.UP.code,
    },
])

export const orderStatusOpt = ref([
    {
        label: '待验房',
        value: 1,
    },
    {
        label: '待签约',
        value: 2,
    },
    {
        label: '已完成',
        value: 3,
    },
    {
        label: '已取消',
        value: 4,
    },
])

export const bookMailStatusOpt = ref([
    {
        label: '未发送',
        value: 1,
    },
    {
        label: '已发送',
        value: 2,
    },
])
export const bookGroupStatusOpt = ref([
    {
        label: '待确认',
        value: 1,
    },
    {
        label: '未组队',
        value: 2,
    },
    {
        label: '已组队',
        value: 3,
    },
])

export const rentalStyleOpt = ref([
    {
        label: '整租',
        value: 1,
    },
    {
        label: '合租',
        value: 2,
    },
])
export const houseModelOpt = ref([
    {
        label: '1室',
        value: 1,
    },
    {
        label: '2室',
        value: 2,
    },
    {
        label: '3室',
        value: 3,
    },
    {
        label: '4室',
        value: 4,
    },
    {
        label: '5室即以上',
        value: 5,
    },
])