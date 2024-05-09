import {extend, LocalStorage} from 'quasar'

const YUNO_USER_BEHAVIOR = "yuno-user-behavior"

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
        }
    }
    return data;
}