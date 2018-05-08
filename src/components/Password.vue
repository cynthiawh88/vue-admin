<template>
    <div id="Password">
        <v-form direction="horizontal" :rules="passwordRules" ref="passwordForm" :model="passwordForm" class="form">
            <v-form-item label="新密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="password" has-feedback>
                <v-input type="password" size="large" v-model="passwordForm.password"></v-input>
            </v-form-item>
            <v-form-item label="重复密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="confirm_password" has-feedback>
                <v-input type="confirm_password" size="large" v-model="passwordForm.confirm_password" @keyup.enter.native="submitForm('passwordForm')"></v-input>
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
import * as userApi from '@/request/user';
export default {
    name: "Password",
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
                password: [{
                    required: true,
                    message: '请输入密码'
                },{
                    min: 8,
                    max: 20,
                    message: '长度限制8-20位'
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
                    this.loading = false;
                   // 回调
                   this.$emit('submitevent', this.passwordForm.password);
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
