<template>
    <div id="UserRole">
        <v-spin :spinning="componentLoading">
            <v-form direction="horizontal" class="form" >
                <v-form-item label="角色" :label-col="labelCol" :wrapper-col="wrapperCol" prop="textarea" has-feedback>
                    <v-transfer :data="role_list" :target-keys="has_role" :titles="['所有','已选中']" :label="powerLabel" @change="powerChange" v-if="role_list != undefined"></v-transfer>
                </v-form-item>
                <v-form-item>
                    <v-row type="flex" justify="start">
                        <v-col span="4"></v-col>
                        <v-col span="16">
                            <v-button type="primary" style="width:100%;"  @click.prevent="submitForm()" :loading="loading">保存</v-button>
                        </v-col>
                    </v-row>
                </v-form-item>
            </v-form>
        </v-spin>
    </div>
</template>
<script>
import * as roleApi from '@/request/role';
export default {
    name: "UserRole",
    props: {
        userid: {
            type: Number,
            required: true,
            validator: function (userid) {
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
            role_list: undefined,
            has_role: [],
            loading: false,
            componentLoading: true
        };
    },
    methods: {
        submitForm: function() {
            if (this.has_role.length < 1)
            {
                this.$message.error('至少赋予一个角色');
                return ;
            }
            this.loading = true;
            // 执行HTTP请求
            roleApi.setUserRole({
                user_id: this.userid,
                role_ids: this.has_role
            }).then(resp => {
                this.loading = false;
                if (resp.status) {
                    this.$message.success("保存成功");
                    this.$emit('close');
                }
            });
        },
        findUserRole: function() {
            roleApi.getUserRole({
                user_id: this.userid
            }).then(resp => {
                if (resp.status) {
                    let role_list = resp.payload.role_list;
                    for (let i in role_list) {
                        this.has_role.push(role_list[i].role_id);
                    }
                }
            })
        },
        initRoleList: function() {
            roleApi.get({
            }).then(resp => {
                this.componentLoading = false;
                this.role_list = [];
                if(resp.status) {
                    let role_list = resp.payload.role_list.list;
                    for (let i in role_list) {
                        this.role_list.push({
                            key: role_list[i].role_id,
                            name: role_list[i].name
                        });
                    }
                }
            });
        },
        powerLabel: function(item) {
            return item.name;
        },
        powerChange(targetKeys, direction, moveKeys) {
            this.has_role = targetKeys;
        }
    },
    created: function() {
        this.initRoleList();
        this.findUserRole();
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
