<template>
<div id="UserCard" class="hoverable">
    <div class="card">
        <div class="panel">
            <div class="userinfo">
                <v-avatar shape="square">{{user.username.substr(0, 1).toUpperCase()}}</v-avatar>
                <b class="name">{{ user.username }}</b>
            </div>
            <div class="desc">
            </div>
            <div class="grid">
                <div class="grid-item">
                    <p class="title">状态</p>
                    <p class="content">
                        <v-tag color="green" v-if="user.status == 1">正常</v-tag>
                        <v-tag color="orange" v-else>冻结</v-tag>
                    </p>
                </div>
                <div class="grid-item">
                    <p class="title">创建时间</p>
                    <p class="content">
                        <v-tag> {{ util.timestampToDate('yy-MM-dd hh:mm' ,user.created) }} </v-tag>
                    </p>
                </div>
            </div>
        </div>
        <ul class="card-actions">
            <li>
                <template v-if="user.status">
                    <v-spin v-if="loading"></v-spin>
                    <v-tooltip content="禁用" v-else>
                        <span class="action-icon" @click="disable">
                            <v-icon type="lock"></v-icon>
                        </span>
                    </v-tooltip>
                </template>
                <template v-else>
                    <v-spin v-if="loading"></v-spin>
                    <v-tooltip content="启用" v-else>
                        <span class="action-icon" @click="enable">
                            <v-icon type="unlock"></v-icon>
                        </span>
                    </v-tooltip>
                </template>
            </li>
            <li>
                <v-tooltip content="角色分配">
                    <span class="action-icon" @click="password">
                        <v-icon type="usergroup-add"></v-icon>
                    </span>
                </v-tooltip>
            </li>
            <li>
                <v-tooltip content="修改密码">
                    <span class="action-icon" @click="password">
                        <v-icon type="key"></v-icon>
                    </span>
                </v-tooltip>
            </li>
        </ul>
    </div>

    <!--  修改密码  -->
    <v-modal title="修改密码"
        :visible="passwordDialogVisible"
        @cancel="closePasswordDialog"
        :maskClosable="false"
    >
        <Password @submitevent="updatePassword" />

        <template slot="footer">
            <span></span>
        </template>
    </v-modal>
</div>


</template>
<script>
import * as userApi from '@/request/user';
import md5 from 'js-md5';
import Password from '@/components/Password';
export default {
    name: 'UserCard',
    components: {
        Password
    },
    data() {
        return {
            loading: false,
            passwordDialogVisible: false
        }
    },
    props: {
        user: {
            type: Object,
            required: true,
            validator: function (user) {
                return true;
            }
        }
    },
    methods: {
        enable: function() {
            this.loading = true;
            userApi.enable({
                "user_ids": [
                    this.user.user_id
                ]
            }).then(resp => {
                this.loading = false;
                if (resp.status)
                {
                    this.user.status = 1;
                }
            });
        },
        disable: function() {
            this.loading = true;
            userApi.disable({
                "user_ids": [
                    this.user.user_id
                ]
            }).then(resp => {
                this.loading = false;
                if (resp.status)
                {
                    this.user.status = 0;
                }
            });
        },
        password: function() {
            this.passwordDialogVisible = true;
        },
        closePasswordDialog: function() {
            this.passwordDialogVisible = false;
        },
        updatePassword: function(password) {
            userApi.updatePassword({
                user_ids: [this.user.user_id],
                password: md5(password)
            }).then(resp => {
                if (resp.status)
                {
                    this.$notification.success({
                        message: `${resp.message}`,
                        duration: 3
                    });
                    this.closePasswordDialog();
                }
            });
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

#UserCard{
    -webkit-transition: all .3s;
    transition: all .3s;
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
                    font-size:18px;display: inline-block;overflow: hidden; padding: 0 4px;
                }
            }
            .desc {
                padding:5px;
                margin-left: 32px;
                font-size: 16px;
                color: rgb(138,138,138);
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