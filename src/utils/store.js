import {LocalStorage} from 'quasar'

const YUNO_USER_STYLE_MODEL = "yuno-user-style-model"


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



