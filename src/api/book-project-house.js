import {serviceShiro} from '@/utils/request'


export function projectHouseList(param) {
    return serviceShiro({
        url: `/book/admin/project/house/list/auth`,
        method: 'get',
        params: param
    })
}
