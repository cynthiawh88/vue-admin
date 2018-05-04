<template>
<div id="UserCard" class="hoverable">
    <div class="card">
        <div class="panel">
            <div class="userinfo">
                <v-avatar icon="user"></v-avatar>
                <b class="name">admin</b>
            </div>
        </div>
        <ul class="card-actions">
            <li>
                <v-tooltip content="禁用">
                    <span class="action-icon">
                        <v-icon type="lock"></v-icon>
                    </span>
                </v-tooltip>
            </li>
            <li>
                <v-tooltip content="修改密码">
                    <span class="action-icon">
                        <v-icon type="key"></v-icon>
                    </span>
                </v-tooltip>
            </li>
        </ul>
    </div>
</div>
</template>
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
<script>
export default {
    name: 'UserCard'
}
</script>