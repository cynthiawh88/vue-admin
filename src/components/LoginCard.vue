<template>
    <div id="LoginCard">
        <div class="head">
            <div class="title">
            <!--
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABKCAYAAAA7fkOZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkY5ODg2RjAyOTAyMTFFOEFEQTFDMTA2NjVDNkQ1MUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkY5ODg2RjEyOTAyMTFFOEFEQTFDMTA2NjVDNkQ1MUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2Rjk4ODZFRTI5MDIxMUU4QURBMUMxMDY2NUM2RDUxRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2Rjk4ODZFRjI5MDIxMUU4QURBMUMxMDY2NUM2RDUxRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pgyp0fYAABbmSURBVHja3F0JkBzF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" />
            -->
                <h1>微蚁儿</h1>
            </div>
            <div class="desc">
                微蚁工作室旗下产品
            </div>
        </div>
        <v-form direction="horizontal" :rules="loginRules" ref="loginForm" :model="loginForm" class="form">
            <v-form-item label="用户名" :label-col="labelCol" :wrapper-col="wrapperCol" prop="username" has-feedback>
                <v-input type="username" size="large" v-model="loginForm.username"></v-input>
            </v-form-item>
            <v-form-item label="密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="password" has-feedback>
                <v-input type="password" size="large" v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')"></v-input>
            </v-form-item>
            <v-form-item>
                <v-row type="flex" justify="start">
                    <v-col span="6"></v-col>
                    <v-col span="14">
                        <v-button type="primary" style="width:100%;"  @click.prevent="submitForm('loginForm')" :loading="loading">提交</v-button>
                    </v-col>
                </v-row>
            </v-form-item>
        </v-form>
    </div>
</template>
<script>
import md5 from 'js-md5';
import * as api from '@/request/api';
export default {
    name: "LoginCard",
    data() {
        return {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            },
            loginRules: {
                username: [{
                    required: true,
                    message: '请输入账号'
                }],
                password: [{
                    required: true,
                    message: '请输入密码'
                }]
            },
            loginForm: {
                username: '',
                password: ''
            },
            loading: false
        };
    },
    methods: {
        submitForm: function(formName) {
            this.loading = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.login({
                        username: this.loginForm.username,
                        password: md5(this.loginForm.password)
                    }).then(resp => {
                        this.loading = false;
                        if (resp.status == true)
                        {
                            let payload = resp.payload;
                            let permissionResult = resp.payload.permission;
                            // 提交Token
                            this.$store.dispatch('login', payload.login.token);
                            // 提交用户信息
                            this.$store.dispatch('userinfo', {userid: payload.user.user_id, username: payload.user.username});
                            // 提交权限信息
                            this.$store.dispatch('permission', permissionResult.power);

                            // 清除密码
                            this.loginForm.password = '';
                        }
                    });
                } else {
                    this.loading = false;
                    return false;
                }
            });
        },
        resetForm: function(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style lang="less">
    #LoginCard{
        margin:0 auto;
        width: 600px;
        height: auto;
        .head {
            margin: 5px auto;
            text-align:center;
            .title{
                img {
                    width: 90px;
                    height: 74px;
                }
                h1{
                    margin: 3px auto;
                }
            }
            .desc {
                margin:15px auto;
                color: rgba(0,0,0,.45);
            }
        }
        .form{
            padding: 5px;
            text-align: left;
        }
    }
</style>
