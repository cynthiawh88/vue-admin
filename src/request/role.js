import request from '@/request';

export async function paginate(params) {
    return request('/roles/paginate', {
        params: params,
        method: 'get'
    });
}

export async function find(params) {
    console.log(params);
    return request('/role', {
        params: params,
        method: 'get'
    });
}
export async function createRole(params) {
    return request('/role/create', {
        data: params,
        method: 'post'
    });
}
export async function updateRole(params) {
    return request('/role/update', {
        data: params,
        method: 'post'
    });
}
export async function deleteRole(params) {
    return request('/role/delete', {
        data: params,
        method: 'post'
    });
}

export async function paginatePower(params) {
    return request('/powers/paginate', {
        params: params,
        method: 'get'
    })
}

export async function getPower(params) {
    return request('/powers', {
        params: params,
        method: 'get'
    })
}