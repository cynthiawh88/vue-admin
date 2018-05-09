<template>
    <div id="RoleForm">
        <v-spin :spinning="componentLoading">
            <v-form direction="horizontal" :rules="roleRules" ref="roleForm" :model="roleForm" class="form" >
                <v-form-item label="名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="name" has-feedback>
                    <v-input type="text" size="large" v-model="roleForm.name"></v-input>
                </v-form-item>
                <v-form-item label="简介" :label-col="labelCol" :wrapper-col="wrapperCol" prop="textarea" has-feedback>
                    <v-input type="textarea" size="large" v-model="roleForm.desc" :autosize="{ minRows: 2, maxRows: 6 }"></v-input>
                </v-form-item>
                <v-form-item label="权限" :label-col="labelCol" :wrapper-col="wrapperCol" prop="textarea" has-feedback>
                    <v-transfer :data="power_list" :target-keys="has_power" :titles="['所有','已选中']" :label="powerLabel" @change="powerChange" v-if="power_list != undefined"></v-transfer>
                </v-form-item>
                <v-form-item>
                    <v-row type="flex" justify="start">
                        <v-col span="4"></v-col>
                        <v-col span="16">
                            <v-button type="primary" style="width:100%;"  @click.prevent="submitForm('roleForm')" :loading="loading">保存</v-button>
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
    name: "RoleForm",
    props: {
        role: {
            type: Object,
            required: false,
            validator: function (role) {
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
            power_list: undefined,
            has_power: [],
            roleRules: {
                name: [{
                    required: true,
                    message: '请输入名称'
                }],
                desc: [{
                    required: true,
                    message: '请输入简介'
                }]
            },
            roleForm: {
                name: '',
                desc: '',
                powers: ''
            },
            loading: false,
            componentLoading: true
        };
    },
    methods: {
        submitForm: function(formName) {
            this.loading = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let route = 'createRole';
                    let params = {
                        name: this.roleForm.name,
                        desc: this.roleForm.desc,
                        power_ids: this.has_power
                    };
                    if (this.role != undefined)
                    {
                        params.role_id = this.role.role_id;
                        // 执行HTTP请求
                        roleApi.updateRole(params).then(resp => {
                            this.loading = false;
                            if (resp.status) {
                                this.$message.success("保存成功");
                                this.$emit('close', this.roleForm);
                            }
                        });
                    } else {
                        // 执行HTTP请求
                        roleApi.createRole(params).then(resp => {
                            this.loading = false;
                            if (resp.status) {
                                this.$message.success("创建成功");
                                this.$emit('close', resp.payload.role.role);
                            }
                        });
                    }

                } else {
                    this.loading = false;
                    return false;
                }
            });
        },
        findRole: function() {
            roleApi.find({
                role_id: this.role.role_id
            }).then(resp => {
                if (resp.status) {
                    this.roleForm = resp.payload.role.role;
                    for (let i in this.roleForm.powers) {
                        this.has_power.push(this.roleForm.powers[i].power_id);
                    }
                }
            })
        },
        initPowerList: function() {
            roleApi.getPower({

            }).then(resp => {
                this.componentLoading = false;
                this.power_list = [];
                if(resp.status) {
                    let power_list = resp.payload.power_list.list;
                    for (let i in power_list) {
                        this.power_list.push({
                            key: power_list[i].power_id,
                            name: power_list[i].name,
                            value: power_list[i].key
                        });
                    }
                }
            });
        },
        powerLabel: function(item) {
            return item.name + " [" + item.value + "]"
        },
        powerChange(targetKeys, direction, moveKeys) {
            this.has_power = targetKeys;
        }
    },
    created: function() {
        if (this.role != undefined)
        {
            this.findRole();
        }
        this.initPowerList();
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
