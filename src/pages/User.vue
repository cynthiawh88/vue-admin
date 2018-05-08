<template>
    <div id="User">
        <v-card title="管理员列表" :bordered="true" :noHovering="true">
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
    </div>
</template>
<script>
import UserCard from '@/components/UserCard'
import * as userApi from '@/request/user';
export default {
    name: "User",
    components: {
        UserCard
    },
    data() {
        return {
            page: 1,
            pagesize: 20,
            count: 0,
            key: '',
            loading: false,
            userList: []
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
                    key: this.key
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
        }
    }
}
</script>
<style lang="less">
    .user-content {
        background: #ECECEC;padding: 30px; min-height:400px;
    }
</style>