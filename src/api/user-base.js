import {serviceShiro} from '@/utils/request'

export function userLogin(body) {
    return serviceShiro({
        url: `/user/admin/user/login`,
        method: 'post',
        data: body
    })
}
