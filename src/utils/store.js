import {extend, LocalStorage} from 'quasar'

const YUNO_USER_BEHAVIOR = "yuno-user-behavior"

const YUNO_USER_TOKEN = "user-token"

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
            leftFocusOne: false,
            tenantId: '',
            userPhone: '',
            userPasswd: '',
            rememberLogin: false,
        }
    }
    return data;
}


//============================== user token ==============================


export function saveUserToken(data = "") {
    LocalStorage.set(YUNO_USER_TOKEN, data)
}

export function getUserToken() {
    let data = LocalStorage.getItem(YUNO_USER_TOKEN)
    if (!data) {
        data = ""
    }
    return data;
}