import {serviceShiro} from '@/utils/request'


export function bookProjectUserList(projectId, param) {
    return serviceShiro({
        url: `/book/admin/project/${projectId}/user/list/auth`,
        method: 'get',
        params: param
    })
}


export function bookProjectUserInsert(projectId, data) {
    return serviceShiro({
        url: `/book/admin/project/${projectId}/user/insert/auth`,
        method: 'post',
        data: data
    })
}

export function bookProjectUserDelete(projectId, projectUserId) {
    return serviceShiro({
        url: `/book/admin/project/${projectId}/user/${projectUserId}/delete/auth`,
        method: 'delete',
    })
}

export function bookProjectUserSendMail(projectId, param) {
    return serviceShiro({
        url: `/book/admin/project/${projectId}/user/sendMail/auth`,
        method: 'post',
        params: param,
    })
}

export function bookProjectUserImport(projectId, data) {
    return serviceShiro({
        url: `/book/admin/project/${projectId}/user/import/auth`,
        method: 'post',
        data: data
    })
}


export function bookProjectUserImportDownload() {
    return serviceShiro({
        url: `/book/admin/project/user/import/download/auth`,
        method: 'get',
        responseType: 'blob'
    })
}