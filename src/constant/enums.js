import {ref} from "vue";

export const ComplexTableColumnEnum = Object.freeze({
    POINTED: 0,
    OPERATIONS: 1,
});


export const projectProcessStatusOpt = ref([
    {
        label: '待开始',
        value: 1,
    },
    {
        label: '进行中',
        value: 2,
    },
    {
        label: '已结束',
        value: 3,
    },
])
export const projectStatusOpt = ref([
    {
        label: '上架',
        value: 1,
    },
    {
        label: '下架',
        value: 2,
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