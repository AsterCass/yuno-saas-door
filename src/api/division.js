import {serviceShiro} from '@/utils/request'


export function divisionAddress(param) {
    return serviceShiro({
        url: `/book/admin/division/data/auth`,
        method: 'get',
        params: param
    })
}

