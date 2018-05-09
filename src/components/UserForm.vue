<template>
    <div id="UserForm">
        <v-spin :spinning="componentLoading">
            <v-form direction="horizontal" :rules="userRules" ref="userForm" :model="userForm" class="form" >
                <v-form-item label="账号" :label-col="labelCol" :wrapper-col="wrapperCol" prop="username" has-feedback>
                    <v-input type="text" size="large" v-model="userForm.username"></v-input>
                </v-form-item>
                <v-form-item label="密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="password" has-feedback>
                    <v-input type="password" size="large" v-model="userForm.password"></v-input>
                </v-form-item>
                <v-form-item>
                    <v-row type="flex" justify="start">
                        <v-col span="4"></v-col>
                        <v-col span="16">
                            <v-button type="primary" style="width:100%;"  @click.prevent="submitForm('userForm')" :loading="loading">创建</v-button>
                        </v-col>
                    </v-row>
                </v-form-item>
            </v-form>
        </v-spin>
    </div>
</template>
<script>
import md5 from 'js-md5';
import * as userApi from '@/request/user';
export default {
    name: "UserForm",
    props: {
    },
    data() {
        return {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 16
            },
            userRules: {
                username: [
                    {
                        required: true,
                        message: '请输入账号'
                    },
                    {
                        min: 5,
                        max: 15,
                        message: '账号长度5-15位'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码'
                    },
                    {
                        min: 8,
                        max: 20,
                        message: '密码长度8-20位'
                    }
                ]
            },
            userForm: {
                username: '',
                password: ''
            },
            loading: false,
            componentLoading: false
        };
    },
    methods: {
        submitForm: function(formName) {
            this.loading = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let route = 'createRole';
                    let params = {
                        username: this.userForm.username,
                        password: md5(this.userForm.password)
                    };
                    // 执行HTTP请求
                    userApi.create(params).then(resp => {
                        this.loading = false;
                        if (resp.status) {
                            this.$message.success("创建成功");
                            this.$emit('close', resp.payload.result.user);
                        }
                    });

                } else {
                    this.loading = false;
                    return false;
                }
            });
        },
    },
    mounted: function() {
    }
}
</script>
<style lang="less">
    #UpdateRole{
        margin:0 auto;
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
