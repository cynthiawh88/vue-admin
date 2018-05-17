import request from '@/request';

// 登录
export async function login(params) {
    return request('/login', {
        data: params,
        method: 'post'
    });
}

// 修改密码
export async function update_password(params) {
    return request('/password/update', {
        data: params,
        method: 'post'
    });
}

// 退出登录
export async function exit(params) {
    return request('/exit', {
        data: params,
        method: 'post'
    });
}