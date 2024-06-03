import {serviceShiro} from '@/utils/request'

export function preLoginTmp(param) {
    return serviceShiro({
        url: `/book/admin/project/preLoginTmp`,
        method: 'post',
        params: param
    })
}

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

export function bookProjectNew(projectId, body) {
    return serviceShiro({
        url: `/book/admin/project/upsert/auth`,
        method: 'post',
        data: body,
        params: {projectId: `${projectId}`}
    })
}


export function bookProjectDetail(id) {
    return serviceShiro({
        url: `/book/admin/project/${id}/detail/auth`,
        method: 'get',
    })
}


