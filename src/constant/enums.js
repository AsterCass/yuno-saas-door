import {ref} from "vue";

export const ComplexTableColumnEnum = Object.freeze({
    POINTED: 0,
    STYLE: 1,
    EDIT_ICON: 2,
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

export const DataBaseStatusEnum = {
    DELETED: {code: -1, desc: "已删除"},
    NORMAL: {code: 0, desc: "正常"},
    DISABLE: {code: 1, desc: "停用"},

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

export const BookMailStatusEnum = {
    N: {code: 0, desc: "未发送"},
    Y: {code: 1, desc: "已发送"},

    getDesc: function (code) {
        for (let key in this) {
            if (this[key].code === code) {
                return this[key].desc;
            }
        }
        return "已发送";
    }
}

export const BookTeamStatusEnum = {
    UNKNOWN: {code: 0, desc: "待确认"},
    N: {code: 1, desc: "未组队"},
    Y: {code: 2, desc: "已组队"},

    getDesc: function (code) {
        for (let key in this) {
            if (this[key].code === code) {
                return this[key].desc;
            }
        }
        return null;
    }
}

export const OrientationEnum = {
    S: {code: 1, desc: "朝南"},
    N: {code: 2, desc: "朝北"},
    W: {code: 3, desc: "朝西"},
    E: {code: 4, desc: "朝东"},
    SE: {code: 5, desc: "东南"},
    NE: {code: 6, desc: "东北"},
    SW: {code: 7, desc: "西南"},
    NW: {code: 8, desc: "西北"},
    getDesc: function (code) {
        for (let key in this) {
            if (this[key].code === code) {
                return this[key].desc;
            }
        }
        return null;
    }
}

export const HouseOrderStatusEnum = {
    //目前逻辑：将原有待验房页显示为待签约
    BOOK: {code: 1, desc: "待签约"},
    CHECKED: {code: 2, desc: "待签约"},
    FINISH: {code: 3, desc: "已完成"},
    CANCEL: {code: 4, desc: "已取消"},
    getDesc: function (code) {
        for (let key in this) {
            if (this[key].code === code) {
                return this[key].desc;
            }
        }
        return null;
    }
}

export const HouseBookStatusEnum = {
    WAIT: {code: 0, desc: "待选"},
    SELECTED: {code: 1, desc: "已选"},
    DROP: {code: 2, desc: "未选"},
    getDesc: function (code) {
        for (let key in this) {
            if (this[key].code === code) {
                return this[key].desc;
            }
        }
        return null;
    }
}

export const DataBaseStatusOpt = ref([
    {
        label: DataBaseStatusEnum.DELETED.desc,
        value: DataBaseStatusEnum.DELETED.code,
    },
    {
        label: DataBaseStatusEnum.NORMAL.desc,
        value: DataBaseStatusEnum.NORMAL.code,
    },
    {
        label: DataBaseStatusEnum.DISABLE.desc,
        value: DataBaseStatusEnum.DISABLE.code,
    },
])

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

export const bookMailStatusOpt = ref([
    {
        label: BookMailStatusEnum.N.desc,
        value: BookMailStatusEnum.N.code,
    },
    {
        label: BookMailStatusEnum.Y.desc,
        value: BookMailStatusEnum.Y.code,
    },
])
export const bookTeamStatusOpt = ref([
    {
        label: BookTeamStatusEnum.UNKNOWN.desc,
        value: BookTeamStatusEnum.UNKNOWN.code,
    },
    {
        label: BookTeamStatusEnum.N.desc,
        value: BookTeamStatusEnum.N.code,
    },
    {
        label: BookTeamStatusEnum.Y.desc,
        value: BookTeamStatusEnum.Y.code,
    },
])

export const orderStatusOpt = ref([
    // {
    //     label: HouseOrderStatusEnum.BOOK.desc,
    //     value: HouseOrderStatusEnum.BOOK.code,
    // },
    {
        label: HouseOrderStatusEnum.CHECKED.desc,
        value: HouseOrderStatusEnum.CHECKED.code,
    },
    {
        label: HouseOrderStatusEnum.FINISH.desc,
        value: HouseOrderStatusEnum.FINISH.code,
    },
    {
        label: HouseOrderStatusEnum.CANCEL.desc,
        value: HouseOrderStatusEnum.CANCEL.code,
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
        label: '3室及以上',
        value: 3,
    },
])