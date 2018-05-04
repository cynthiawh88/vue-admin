import request from '@/request';

export async function login(params) {
    return request('/login', {
        data: params,
        method: 'post'
    });
}