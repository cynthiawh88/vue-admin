<template>
<div id="RoleCard" class="hoverable">
    <div class="card">
        <div class="panel">
            <div class="userinfo">
                <b class="name">{{ role.name }}</b>
            </div>
            <div class="desc">
            {{ role.desc }}
            </div>
        </div>
        <ul class="card-actions">
            <li>
                <template>
                    <v-tooltip content="编辑">
                        <span class="action-icon" @click="update">
                            <v-icon type="edit"></v-icon>
                        </span>
                    </v-tooltip>
                </template>
            </li>
            <li>
                <span class="action-icon" v-if="deleteLoading">
                    <v-icon type="loading"></v-icon>
                </span>
                <v-popconfirm  title="确认删除吗？" ok-text="是" cancel-text="否" @confirm="deleteRole"  v-else>
                    <span class="action-icon">
                        <v-icon type="delete"></v-icon>
                    </span>
                </v-popconfirm>
            </li>
        </ul>
    </div>

    <!--  编辑角色信息  -->
    <v-modal title="编辑角色信息"
        :visible="updateDialogVisible"
        @cancel="closeUpdateDialog"
        :width="700"
    >
        <RoleForm :role="role" @close="closeUpdateDialog"/>
        <template slot="footer">
            <span></span>
        </template>
    </v-modal>
</div>


</template>
<script>
import RoleForm from '@/components/RoleForm';
import * as roleApi from '@/request/role';
import md5 from 'js-md5';
export default {
    name: 'RoleCard',
    components: {
        RoleForm
    },
    data() {
        return {
            loading: false,
            deleteLoading: false,
            updateDialogVisible: false
        }
    },
    props: {
        role: {
            type: Object,
            required: true,
            validator: function (role) {
                return true;
            }
        }
    },
    methods: {
        update: function() {
            this.updateDialogVisible = true;
        },
        deleteRole: function() {
            this.deleteLoading = true;
            roleApi.deleteRole({
                role_ids: [this.role.role_id]
            }).then(resp => {
                this.deleteLoading = false;
                if(resp.status) {
                    this.$message.success('删除成功。');
                    this.$emit('delete', this.role);
                }
            });
        },
        closeUpdateDialog: function(role = undefined) {
            if (role != undefined)
            {
                this.role.name = role.name;
                this.role.desc = role.desc;
                this.$emit('updateRole', this.role);
            }
            this.updateDialogVisible = false;
        }
    }
}
</script>
<style lang="less">
.hoverable{
    cursor:pointer;
}
.hoverable:hover {
    -webkit-box-shadow: 0 2px 8px rgba(0,0,0,.09);
    box-shadow: 0 2px 8px rgba(0,0,0,.09);
    border-color: rgba(0,0,0,.09);
}

#RoleCard{
    margin: 5px 0;
    -webkit-transition: all .3s;
    transition: all .3s;
    height: 171px;
    .card {
        border-radius:16px;
        .panel {
            background: #fff; 
            padding: 15px; 
            border-radius: 2px; 
            font-size: 12px; 
            position: relative;     
            -webkit-transition: all .3s;
            transition: all .3s;
            .userinfo {
                height: 32px;
                line-height: 32px;
                .name {
                    padding-left: 20px;font-size:18px;display: inline-block;overflow: hidden; padding: 0 4px;
                }
            }
            .desc {
                padding:5px;
                font-size: 14px;
                color: rgb(138,138,138);
                height: 60px;
                line-height: 20px;
            }
            .grid {
                padding: 5px;
                margin-left: 32px;
                display: flex;
                flex-wrap: wrap;
                .grid-item {
                    width: 50%;
                    .title {
                        font-size: 12px;
                        color: rgb(138,138,138);
                    }
                    .content {
                        padding:12px 0;
                        font-size: 16px;
                        color: #333;
                    }
                }
            }
        }
        .card-actions{
            background:#f7f9fa; display: flex; border-top: 1px solid #e8e8e8; list-style: none; margin: 0; padding: 0;
            li{
                width: 50%; text-align: center;margin: 12px 0; 
            }
            li:not(:last-child) {
                border-right: 1px solid #e8e8e8;
            }
            .action-icon {
                cursor: pointer; font-size: 20px; line-height: 22px; width: 100%; display: block;
            }
        }
    }
}
</style>