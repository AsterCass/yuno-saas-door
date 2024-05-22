import {serviceShiro} from '@/utils/request'


export function bookProjectList(param) {
    return serviceShiro({
        url: `/book/admin/project/list/auth`,
        method: 'get',
        params: param
    })
}

export function bookProjectUp(id) {
    return serviceShiro({
        url: `/book/admin/project/${id}/up/auth`,
        method: 'patch',
    })
}


export function bookProjectDown(id) {
    return serviceShiro({
        url: `/book/admin/project/${id}/down/auth`,
        method: 'patch',
    })
}


export function bookProjectDelete(id) {
    return serviceShiro({
        url: `/book/admin/project/delete/${id}/auth`,
        method: 'delete',
    })
}


