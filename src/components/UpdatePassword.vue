<template>
    <div id="UpdatePassword">
        <v-form direction="horizontal" :rules="passwordRules" ref="passwordForm" :model="passwordForm" class="form">
            <v-form-item label="原密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="old_password" has-feedback>
                <v-input type="password" size="large" v-model="passwordForm.old_password"></v-input>
            </v-form-item>
            <v-form-item label="新密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="password" has-feedback>
                <v-input type="password" size="large" v-model="passwordForm.password"></v-input>
            </v-form-item>
            <v-form-item label="重复密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="confirm_password" has-feedback>
                <v-input type="password" size="large" v-model="passwordForm.confirm_password" @keyup.enter.native="submitForm('passwordForm')"></v-input>
            </v-form-item>
            <v-form-item>
                <v-row type="flex" justify="start">
                    <v-col span="6"></v-col>
                    <v-col span="14">
                        <v-button type="primary" style="width:100%;"  @click.prevent="submitForm('passwordForm')" :loading="loading">提交</v-button>
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
    name: "UpdatePassword",
    data() {
        var confirmPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.passwordForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            },
            passwordRules: {
                old_password: [{
                    required: true,
                    message: '请输入原密码'
                }],
                password: [{
                    required: true,
                    message: '请输入密码'
                }],
                confirm_password: [{
                        required: true,
                        message: '请再次输入密码'
                    },
                    {
                        validator: confirmPassword
                    }
                ],
            },
            passwordForm: {
                old_password: '',
                password: '',
                comfirm_password: ''
            },
            loading: false
        };
    },
    methods: {
        submitForm: function(formName) {
            this.loading = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.update_password({
                        old_password: md5(this.passwordForm.old_password),
                        password: md5(this.passwordForm.password)
                    }).then(resp => {
                        this.loading = false;
                        if (resp.status == true)
                        {
                            // 上报关闭事件
                            this.$emit('close');
                            // 旋转一下Loading
                            this.$message.info("修改成功！即将退出后台，请重新登录。", 2);
                            let _this = this;
                            setTimeout(function() {
                                // 退出登录
                                _this.$store.dispatch('logout');
                            }, 2100);
                        }
                    });
                } else {
                    this.loading = false;
                    return false;
                }
            });
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
