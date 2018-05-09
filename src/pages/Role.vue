<template>
    <div id="Role">
        <v-card title="角色列表" :bordered="true" :noHovering="true">
            <!-- 条件搜索开始 -->
            <v-form>
                <v-form-item label="关键词">
                    <v-input placeholder="" v-model="key"></v-input>
                </v-form-item>
                <v-form-item>
                    <v-button type="primary" @click="paginate">搜索</v-button>
                </v-form-item>
            </v-form>
        </v-card>
        
        <div class="user-content">
            <v-spin :spinning="loading">
                <v-row :gutter="16">
                    <!-- 
                    <v-col :span="24">
                        <v-button type="dashed" size="large" @click="openRoleDialog" class="create-btn">新建</v-button>
                    </v-col>
                    -->
                    <v-col :span="6">
                        <AddCard text="添加角色" @click="openRoleDialog" />
                    </v-col>
                    <v-col :span="6" v-for="(role, index) in roleList" :key="index">
                        <RoleCard :role="role" @delete="deleteRole" @updated="reviewRole"/>
                    </v-col>
                </v-row>
                <br />
                <v-pagination 
                :page-size="pagesize"
                show-size-changer
                @sizechange="pagesizeChange"
                @change="pageChange"
                :show-total="showTotal"
                :total="count"></v-pagination>
            </v-spin>
        </div>


    <!--  创建角色信息  -->
    <v-modal title="创建角色信息"
        :visible="createRoleVisible"
        @cancel="closeRoleDialog"
        :width="700"
    >
        <RoleForm @close="closeRoleDialog"/>
        <template slot="footer">
            <span></span>
        </template>
    </v-modal>
    </div>
</template>
<script>
import RoleCard from '@/components/RoleCard';
import AddCard from '@/components/AddCard';
import RoleForm from '@/components/RoleForm';
import * as roleApi from '@/request/role';
export default {
    name: "Role",
    components: {
        RoleCard, RoleForm, AddCard
    },
    data() {
        return {
            page: 1,
            pagesize: 20,
            count: 0,
            key: '',
            loading: false,
            roleList: [],

            createRoleVisible: false,

        };
    },
    mounted: function() {
        this.paginate();
    },
    methods: {
        paginate() {
            this.loading = true;
            this.roleList = [];
            roleApi.paginate(
                {
                    page: this.page,
                    pagesize: this.pagesize,
                    key: this.key
                }
            ).then(resp => {
                if (resp.status == true) {
                    this.roleList = resp.payload.role_list.list;
                    this.page = resp.payload.role_list.page;
                    this.pagesize = resp.payload.role_list.pagesize;
                    this.count = resp.payload.role_list.count;
                }
                this.loading = false;
            });
        },
        pagesizeChange: function(current, size){
            this.pagesize = size;
            this.paginate();
        },
        pageChange: function(page) {
            this.page = page;
            this.paginate();
        },
        showTotal: function(total, totalPage) {
            return `总共 ${totalPage} 页, 全部 ${total} 条`;
        },
        deleteRole: function(item) {
            let index = this.roleList.findIndex(role => role.role_id === item.role_id);
            if (index >= 0) {
                this.roleList.splice(index, 1);
                this.count--;
            }
        },
        openRoleDialog: function() {
            this.createRoleVisible = true;
        },
        closeRoleDialog: function(role = undefined) {
            if (role != undefined)
            {
                this.roleList.unshift(role);
            }
            this.createRoleVisible = false;
        },
        // 更新角色信息，用于RoleCard中的角色信息被修改后的回调函数。
        reviewRole: function(role) {
            let index = this.roleList.findIndex(role => role.role_id === role.role_id);
            if (index >= 0) {
                this.roleList[index] = role;
            }
        }
    }
}
</script>
<style lang="less">
    .user-content {
        background: #ECECEC;padding: 30px; min-height:400px;
    }
    .create-btn {
        width: 100%;
        margin: 8px 0;
    }
</style>