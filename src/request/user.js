import request from '@/request';

export async function paginate(params) {
    return request('/user/paginate', {
        params: params,
        method: 'get'
    });
}

export async function create(params) {
    return request('/user/create', {
        data: params,
        method: 'post'
    });
}

export async function enable(params) {
    return request('/user/multi/enable', {
        data: params,
        method: 'post'
    });
}

export async function disable(params) {
    return request('/user/multi/disable', {
        data: params,
        method: 'post'
    });
}

export async function update_password(params) {
    return request('/user/multi/password', {
        data: params,
        method: 'post'
    });
}