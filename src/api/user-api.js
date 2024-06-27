import {serviceShiro} from '@/utils/request'

export function userApiList(param) {
    return serviceShiro({
        url: `/user/admin/apis/adminAuth`,
        method: 'get',
        params: param
    })
}
