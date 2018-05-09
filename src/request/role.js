import request from '@/request';

export async function paginate(params) {
    return request('/roles/paginate', {
        params: params,
        method: 'get'
    });
}

export async function get(params) {
    return request('/roles', {
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

export async function createPower(params) {
    return request('/power/create', {
        data: params,
        method: 'post'
    })
}

export async function updatePower(params) {
    return request('/power/update', {
        data: params,
        method: 'post'
    })
}

export async function deletePower(params) {
    return request('/power/delete', {
        data: params,
        method: 'post'
    })
}

export async function getPower(params) {
    return request('/powers', {
        params: params,
        method: 'get'
    })
}

export async function getUserRole(params) {
    return request('/user/roles', {
        params: params,
        method: 'get'
    });
}

export async function setUserRole(params) {
    return request('/user/role/set', {
        data: params,
        method: 'post'
    });
}