import {serviceShiro} from '@/utils/request'


export function projectHouseList(param) {
    return serviceShiro({
        url: `/book/admin/project/house/list/auth`,
        method: 'get',
        params: param
    })
}


export function projectHouseImportList(param) {
    return serviceShiro({
        url: `/book/admin/project/house/import/list/auth`,
        method: 'get',
        params: param
    })
}

export function unImportAll(projectId, houseProjectId) {
    return serviceShiro({
        url: `/book/admin/project/house/${projectId}/unImport/houseProject/${houseProjectId}/auth`,
        method: 'delete',
    })
}

export function unImport(projectId, projectHouseId) {
    return serviceShiro({
        url: `/book/admin/project/house/${projectId}/unImport/house/${projectHouseId}/auth`,
        method: 'delete',
    })
}


export function toImport(projectId, houseProjectId) {
    return serviceShiro({
        url: `/book/admin/project/house/${projectId}/import/${houseProjectId}/auth`,
        method: 'post',
    })
}