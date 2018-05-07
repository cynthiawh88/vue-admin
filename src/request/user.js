import request from '@/request';

export async function paginate(params) {
    return request('/users/paginate', {
        params: params,
        method: 'get'
    });
}

export async function enable(params) {
    return request('/user/enable', {
        data: params,
        method: 'post'
    });
}

export async function disable(params) {
    return request('/user/disable', {
        data: params,
        method: 'post'
    });
}

export async function updatePassword(params) {
    return request('/user/password/update', {
        data: params,
        method: 'post'
    });
}