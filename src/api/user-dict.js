import {serviceShiro} from '@/utils/request'


export function userDictList(param) {
    return serviceShiro({
        url: `/user/dictionaries/auth`,
        method: 'get',
        params: param
    })
}


export function userDictNew(body) {
    return serviceShiro({
        url: `/user/dictionaries/new/auth`,
        method: 'post',
        data: body
    })
}


export function userDictPair(dictId, body) {
    return serviceShiro({
        url: `/user/dictionaries/${dictId}/pairs/auth`,
        method: 'patch',
        data: body
    })
}
