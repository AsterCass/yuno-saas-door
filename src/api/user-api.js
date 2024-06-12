import {serviceShiro} from '@/utils/request'


export function userApiList(param) {
    return serviceShiro({
        url: `/user/apis/auth`,
        method: 'get',
        params: param
    })
}
