<template>
    <div id="PowerForm">
        <v-spin :spinning="componentLoading">
            <v-form direction="horizontal" :rules="powerRules" ref="powerForm" :model="powerForm" class="form" >
                <v-form-item label="名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="name" has-feedback>
                    <v-input type="text" size="large" v-model="powerForm.name"></v-input>
                </v-form-item>
                <v-form-item label="KEY" :label-col="labelCol" :wrapper-col="wrapperCol" prop="key" has-feedback>
                    <v-input type="text" size="large" v-model="powerForm.key"></v-input>
                </v-form-item>
                <v-form-item>
                    <v-row type="flex" justify="start">
                        <v-col span="4"></v-col>
                        <v-col span="16">
                            <v-button type="primary" style="width:100%;"  @click.prevent="submitForm('powerForm')" :loading="loading">保存</v-button>
                        </v-col>
                    </v-row>
                </v-form-item>
            </v-form>
        </v-spin>
    </div>
</template>
<script>
import md5 from 'js-md5';
import * as roleApi from '@/request/role';
export default {
    name: "PowerForm",
    props: {
        power: {
            type: Object,
            required: false,
            validator: function (power) {
                return true;
            }
        }
    },
    data() {
        return {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 16
            },
            powerRules: {
                name: [
                    {
                        required: true,
                        message: '请输入名称'
                    },{
                        min: 2,
                        max: 6,
                        message: '字数限制2-6个'
                    }
                ],
                key: [
                    {
                        required: true,
                        message: '请输入KEY'
                    },{
                        min: 2,
                        max: 10,
                        message: '字符限制2-10个'
                    }
                ]
            },
            powerForm: {
                name: '',
                key: ''
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
                    let params = {
                        name: this.powerForm.name,
                        key: this.powerForm.key
                    };
                    if (this.power != undefined)
                    {
                        params.power_id = this.power.power_id;
                        // 执行HTTP请求
                        roleApi.updatePower(params).then(resp => {
                            this.loading = false;
                            if (resp.status) {
                                this.$message.success("保存成功");
                                this.$emit('close', this.power);
                            }
                        });
                    } else {
                        // 执行HTTP请求
                        roleApi.createPower(params).then(resp => {
                            this.loading = false;
                            if (resp.status) {
                                this.$message.success("创建成功");
                                this.$emit('close', resp.payload.power.power);
                            }
                        });
                    }
                } else {
                    this.loading = false;
                    return false;
                }
            });
        }
    },
    created: function() {
        if (this.power != undefined)
        {
            this.powerForm = this.power;
        }
    }
}
</script>
<style lang="less">
    #PowerForm{
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
