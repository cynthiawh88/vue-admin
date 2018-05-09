<template>
    <div id="leftMenu">
        <v-layout>
            <v-sider collapsible :collapsed="customCollapsed" :trigger="false" :collapsed-width="64">
                <div class="logo"></div>
                <v-menu theme="dark" mode="inline" :data="menuData" @item-click="itemClick">
                    <template slot-scope="{data}">
                        <i v-if="data.icon" :class="'anticon anticon-' + data.icon"></i>
                        <router-link :to="data.href" style="display:inline"><span class="nav-text">{{data.name}}</span></router-link>
                    </template>
                </v-menu>
            </v-sider>
            <v-layout>
                <v-header :style="{ background: '#fff', padding: 0, boxShadow: '0 1px 4px rgba(0,21,41,.08)', position: 'relative' }">
                    <v-icon class="trigger" :type="this.customCollapsed ? 'menu-unfold' : 'menu-fold'" @click.native="toggle"></v-icon>
                    <!-- 用户信息下拉框 -->
                    <v-dropdown :data="data" class="userinfo-dropdown" @item-click="userInfoClick">
                        <a href="javascript:void(0)" class="ant-dropdown-link ant-dropdown-trigger">
                           {{ username }} <v-icon type="down"></v-icon>
                        </a>
                    </v-dropdown>
                </v-header>
                <v-content :style="{ padding: '0 0' }">
                    <v-breadcrumb :style="{ padding: '10px 15px', background: '#fff' }">
                        <template v-for="breadcurmb in breadcurmbs" v-if="breadcurmbs.length > 0">
                            <v-breadcrumb-item v-if="breadcurmb.href == ''">{{ breadcurmb.name}}</v-breadcrumb-item>
                            <v-breadcrumb-item v-else :href="breadcurmb.href">{{ breadcurmb.name}}</v-breadcrumb-item>
                        </template>
                    </v-breadcrumb>
                    <div style="min-height: 360px;">
                        <slot name="content">
                        </slot>
                    </div>
                </v-content>
                <v-footer :style="{ textAlign: 'center' }">
                    2014-2018 &copy Created By Himi
                </v-footer>
            </v-layout>
        </v-layout>


        <!--  修改密码  -->
        <v-modal title="修改密码"
            :visible="passwordDialogVisible"
            @cancel="closePasswordDialog"
            :maskClosable="false"
        >
            <UpdatePassword @close="closePasswordDialog"/>
            <template slot="footer">
                <span></span>
            </template>
        </v-modal>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import UpdatePassword from '@/components/UpdatePassword';
export default {
    components: {
        UpdatePassword
    },
    data() {
        return {
            customCollapsed: false,
            menuData: [
                {
                    name: '仪表盘',
                    icon: 'desktop',
                    href: '/admin/dashboard',
                    selected: false
                },
                {
                    name: '管理员资料',
                    icon: 'user',
                    expand: false,
                    children: [
                        {
                        href: '/admin/user',
                        name: "管理员列表",
                        selected: false
                        },{
                            href: '/admin/role',
                            name: "角色列表",
                            selected: false
                        },{
                            href: '/admin/power',
                            name: "权限列表",
                            selected: false
                        }
                    ]
                }
            ],
            passwordDialogVisible: false,
            data: [
                {content: '修改密码', event: 'updatePassword'},
                {content: '退出登录', event: 'logout'}
            ],
        }
    },
    computed: {
        ...mapState([
            'breadcurmbs',
            'permissions',
            'userid',
            'username'
        ])
    },
    mounted: function() {
        this.setMenuSelect();
    },
    methods: {
        toggle() {
            this.customCollapsed = !this.customCollapsed;
        },
        setMenuSelect: function() {
            for(let menuIndex in this.menuData)
            {
                if (this.menuData[menuIndex].href != undefined)
                {
                    if (this.menuData[menuIndex].href == this.$route.path)
                    {
                        this.menuData[menuIndex].selected = true;
                    }
                } else {
                    if (this.menuData[menuIndex].children != undefined)
                    {
                        for (let childIndex in this.menuData[menuIndex].children)
                        {
                            if (this.menuData[menuIndex].children[childIndex].href == this.$route.path)
                            {
                                if (this.menuData[menuIndex].expand != undefined)
                                {
                                    this.menuData[menuIndex].expand = true;
                                }
                                this.menuData[menuIndex].children[childIndex].selected = true;
                            }
                        }
                    }
                }
            }
        },
        itemClick(menus) {
        },
        userInfoClick: function(data) {
            switch(data.event) {
                case "updatePassword":
                    this.passwordDialogVisible = true;
                break;
                case "logout":
                    this.logout();
                break;
            }
        },
        closePasswordDialog: function() {
            this.passwordDialogVisible = false;
        },
        logout: function(){
            this.$store.dispatch('logout');
        }
    }
};
</script>
<style lang="less">
#leftMenu{
    height: 100%;
    .ant-layout{
        height: 100%;
    }
}
    #leftMenu .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 16px;
        cursor: pointer;
        transition: color .3s;
    }
    #leftMenu .trigger:hover {
        color: #108ee9;
    }
    #leftMenu .logo {
        height: 32px;
        background: #333;
        border-radius: 6px;
        margin: 16px;
    }
    #leftMenu .ant-layout-sider-collapsed .anticon {
        font-size: 16px;
    }
    #leftMenu .ant-layout-sider-collapsed .nav-text {
        display: none;
    }
    #leftMenu .ant-menu-submenu-title span span{
        padding-left: 14px;
    }
    #leftMenu .ant-menu-item .nav-text {
        padding-left: 14px;
    }
    #leftMenu .menu-userinfo {
        height: 100%;
        line-height: 100%;
        float: right;
    }
    #leftMenu .userinfo-dropdown {
        float: right;
        margin: 0 30px;
        font-size: 16px;
        i {
            font-size: 16px;
        }
    }
</style>