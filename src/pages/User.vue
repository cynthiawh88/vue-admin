<template>
    <div id="User">
        <v-card title="管理员列表" :bordered="true" :noHovering="true">
            <!-- 条件搜索开始 -->
            <v-form>
                <v-form-item label="关键词">
                    <v-input placeholder="" v-model="key"></v-input>
                </v-form-item>
                <v-form-item label="状态">
                    <v-select placeholder="账号状态" style="width: 120px;" :data="statusOptions" v-model="status"></v-select>
                </v-form-item>
                <v-form-item>
                    <v-button type="primary" @click="paginate">搜索</v-button>
                </v-form-item>
            </v-form>
        </v-card>
        
        <div class="user-content">
            <v-spin :spinning="loading">
                <v-row :gutter="16">
                    <v-col :span="6">
                        <AddCard text="添加" :height="197" @click="openUserDialog"/>
                    </v-col>
                    <v-col :span="6" v-for="(user, index) in userList" :key="index">
                        <UserCard :user="user"/>
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
    <!--  添加账号信息  -->
    <v-modal title="添加账号"
        :visible="createUserVisible"
        @cancel="closeUserDialog"
        :width="700"
    >
        <UserForm @close="closeUserDialog"/>
        <template slot="footer">
            <span></span>
        </template>
    </v-modal>
    </div>
</template>
<script>
import UserCard from '@/components/UserCard';
import UserForm from '@/components/UserForm';
import AddCard from '@/components/AddCard';
import * as userApi from '@/request/user';
export default {
    name: "User",
    components: {
        UserCard, AddCard, UserForm
    },
    data() {
        return {
            page: 1,
            pagesize: 20,
            count: 0,
            key: '',
            status: 0,
            statusOptions: [
                {
                    value: 0,
                    label: '全部状态'
                },
                {
                    value: 1,
                    label: '正常'
                },
                {
                    value: 2,
                    label: '冻结'
                }
            ],
            loading: false,
            userList: [],
            createUserVisible: false
        };
    },
    mounted: function() {
        this.paginate();
    },
    methods: {
        paginate() {
            this.loading = true;
            this.userList = [];
            userApi.paginate(
                {
                    page: this.page,
                    pagesize: this.pagesize,
                    key: this.key,
                    status: this.status
                }
            ).then(resp => {
                if (resp.status == true) {
                    this.userList = resp.payload.user_list.list;
                    this.page = resp.payload.user_list.page;
                    this.pagesize = resp.payload.user_list.pagesize;
                    this.count = resp.payload.user_list.count;
                }
                this.loading = false;
            });
        },
        pagesizeChange: function(current, size){
            this.pagesize = size;
            this.paginate();
        },
        pageChange: function(page)
        {
            this.page = page;
            this.paginate();
        },
        showTotal: function(total, totalPage) {
            return `总共 ${totalPage} 页, 全部 ${total} 条`;
        },
        openUserDialog: function() {
            this.createUserVisible = true;
        },
        closeUserDialog: function(user = undefined) {
            if (user != undefined)
            {
                this.userList.unshift(user);
            }
            this.createUserVisible = false;
        },
    }
}
</script>
<style lang="less">
    .user-content {
        background: #ECECEC;padding: 30px; min-height:400px;
    }
</style>