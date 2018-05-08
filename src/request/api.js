import request from '@/request';

export async function login(params) {
    return request('/login', {
        data: params,
        method: 'post'
    });
}

export async function updatePassword(params) {
    return request('/password/update', {
        data: params,
        method: 'post'
    });
}