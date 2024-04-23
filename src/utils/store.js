import {extend, LocalStorage} from 'quasar'

const YUNO_USER_STYLE_MODEL = "yuno-user-style-model"
const YUNO_USER_BEHAVIOR = "yuno-user-behavior"


//============================== style model ==============================

export function saveStyleModel(styleModel) {
    LocalStorage.set(YUNO_USER_STYLE_MODEL, styleModel)
    return getStyleModel()
}

export function getStyleModel() {
    let styleModel = LocalStorage.getItem(YUNO_USER_STYLE_MODEL)
    if (!styleModel) {
        styleModel = "light"
    }
    return styleModel
}

//============================== user behavior ==============================

export function saveUserBehavior(data) {
    let oldData = getUserBehavior()
    LocalStorage.set(YUNO_USER_BEHAVIOR, extend(true, oldData, data))
}

export function getUserBehavior() {
    let data = LocalStorage.getItem(YUNO_USER_BEHAVIOR)
    if (!data) {
        data = {
            leftMenuMini: false,
            rightMenuShow: false,
            sidebarBg: 'black',
            styleModel: 'light',
            sidebarImg: 'img1',
            themeColor: 'black',
        }
    }
    return data;
}