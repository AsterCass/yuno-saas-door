import {serviceShiro} from '@/utils/request'


export function userDictList(param) {
    return serviceShiro({
        url: `/user/admin/dictionaries/adminAuth`,
        method: 'get',
        params: param
    })
}


export function userDictNew(body) {
    return serviceShiro({
        url: `/user/admin/dictionaries/new/adminAuth`,
        method: 'post',
        data: body
    })
}


export function userDictPair(dictId, body) {
    return serviceShiro({
        url: `/user/admin/dictionaries/${dictId}/pairs/adminAuth`,
        method: 'patch',
        data: body
    })
}
