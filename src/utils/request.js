import axios from 'axios'
import Qs from 'qs'
import {Notify} from 'quasar'
import {notifyTopNegative, notifyTopWarning} from "@/utils/global-notify";
import {getUserToken, saveUserToken} from "@/utils/store";
import emitter from "@/utils/bus";

const BASE_ADD = process.env.VUE_APP_BASE_ADD


const requestConfig = config => {
    const userToken = getUserToken()
    if (userToken) {
        config.headers.set('User-Token', userToken)
    } else {
        config.headers.set('User-Token', "")
    }
    return config
}

const responseConfig = response => {
    if (200 === response.status) {
        const serverData = response.data
        if (serverData instanceof Object) {
            const status = serverData.status
            if (600 === status) {
                saveUserToken()
                emitter.emit("yunoWebLoginEvent", false)
            }
            if (400 === status) {
                notifyTopNegative("系统繁忙，请稍后再试", 3000, Notify.create)
                return null
            }
            if (500 === status) {
                notifyTopWarning(serverData.message, 5000, Notify.create)
                return null
            }
        }
    } else {
        notifyTopNegative("系统繁忙，请稍后再试", 3000, Notify.create)
        return null
    }
    return response.data;
}


const serviceShiro = axios.create({
    baseURL: BASE_ADD,
    timeout: 60000,
    paramsSerializer: {
        paramsSerializer: function (params) {
            return Qs.stringify(params, {arrayFormat: 'repeat'})
        }
    }
})

serviceShiro.interceptors.request.use(requestConfig)

serviceShiro.interceptors.response.use(responseConfig)


export {
    serviceShiro
}