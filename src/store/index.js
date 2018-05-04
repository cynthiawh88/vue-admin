import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        accessToken: '',
        userId: undefined,
        username: '',
        permissions: [],

        breadcurmbs: [],
        historyPath: ''
    },
    mutations: {
        // 登录登出
        login: function(state, token) {
            state.accessToken = token;
        },
        userinfo: function (state, userid, username) {
            state.userid = userid;
            state.username = username;
        },
        permission: function(state, permissions) {
            state.permissions = permissions;
        },
        logout: function(state) {
            state.accessToken = '';
            state.userId = '';
            state.username = '';
            state.permissions = [];
        },
        setHistory: function(state, path) {
            state.historyPath = path;
        },
        // 导航栏
        changeBreadcurmbs: function(state, breadcurmbs) {
            state.breadcurmbs = breadcurmbs;
        },
        pushBreadcurmbs: function(state, breadcurmbs)
        {
            for (let i in breadcurmbs)
            {
                state.breadcurmbs.push(breadcurmbs[i]);
            }
        },
    },
    actions: {
        login(store, token){
            // 本地存储
            window.localStorage.setItem('token', token);
            // 设置State
            store.commit('login', token);
        },
        userinfo(store, userinfo){
            // 本地存储
            window.localStorage.setItem('userid', userinfo.user_id);
            window.localStorage.setItem('username', userinfo.username);
            // 设置State
            store.commit('userinfo', userinfo.user_id, userinfo.username);
        },
        permission(store, permissions){
            window.localStorage.setItem('permissions', JSON.stringify(permissions));
            store.commit('permission', permissions);
        },
        logout(store, param) {
            window.localStorage.removeItem('userid');
            window.localStorage.removeItem('username');
            window.localStorage.removeItem('permissions');
            window.localStorage.removeItem('token');
            store.commit('logout');
        },
        changeBreadcurmbs(store, breadcurmbs) {
            store.commit('changeBreadcurmbs', breadcurmbs);
        },
        pushBreadcurmbs(store, breadcurmbs) {
            store.commit('pushBreadcurmbs', breadcurmbs);
        },
        reload(store) {
            // 重新加载本地存储，并导入数据
            let userid = window.localStorage.getItem('userid');
            let username = window.localStorage.getItem('username');
            let permissions = window.localStorage.getItem('permissions');
            let accessToken = window.localStorage.getItem('token');
            store.commit('login', accessToken);
            store.commit('userinfo', userid, username);
            store.commit('permission', JSON.parse(permissions));
        },
        setHistory(store, path) {
            window.localStorage.setItem('history', path);
            store.commit('setHistory', path);
        }
    }
});

export default store