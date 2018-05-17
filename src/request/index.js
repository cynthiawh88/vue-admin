import axios from 'axios';
import { notification } from 'vue-beauty'
import store from '@/store';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://user.api.88hao.cn';

// 处理错误
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;

    notification['danger']({
        message: `请求错误 ${response.status}: ${response.url}`,
        description: errortext,
        duration: 2
    });
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
}
function checkException(e) {
    notification['danger']({
        message: '请求超时',
        // description: e.message,
        duration: 2
    });
}

function checkResponse(response){
    if (response.data) {
        // 大于1000 的是业务错误，弹框
        switch (response.data.code) {
            case 200:
                return response.data;
                break;
            case 401:
                // 清空state
                store.dispatch('logout');
                break;
            case 403: 
                // 清空state
                store.dispatch('logout');
                break;
            case 1001:
                let message = '';
                let errors = response.data.payload.errors;
                for(let errorIndex in errors)
                {
                    for (let index in errors[errorIndex])
                    {
                        message += errors[errorIndex][index];
                    }
                }
                notification['warning']({
                    message: `[${response.data.code}] ${response.data.message}`,
                    description: message,
                    duration: 0
                });
                break;
            default:
                notification['warning']({
                    message: `[${response.data.code}] ${response.data.message}`,
                    duration: 3
                });
                break;
        }
        return response.data;
    }
}

export default function request(url, options)
{
    // 判断本地是否存储有Token，自动携带
    if (store.state.accessToken)
    {
        if (options.method.toLowerCase() == 'get')
        {
            options.params.token = store.state.accessToken;
        } else {
            options.data.token =  store.state.accessToken;
        }
    }


    options.url = url;
    return axios.request(options)
            .then(checkStatus)
            .then(checkResponse)
            .catch(checkException);
}