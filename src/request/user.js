import request from '@/request';

export async function paginate(params) {
    return request('/users/paginate', {
        params: params,
        method: 'get'
    });
}