<template>
    <div id="User">
        <v-card title="管理员列表" :bordered="true" :noHovering="true">
            该页面我也不知道该怎么描述
        </v-card>
        
        <div class="user-content">
            <v-spin :spinning="loading">
                <v-row :gutter="16">
                    <v-col :span="6" v-for="(user, index) in userList" :key="index">
                        <UserCard :user="user"/>
                    </v-col>
                </v-row>
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
            loading: true,
            userList: []
        };
    },
    mounted: function() {
        this.paginate();
    },
    methods: {
        paginate() {
            userApi.paginate(
                {
                    page: this.page,
                    pagsize: this.pagesize,
                    key: this.key
                }
            ).then(resp => {
                if (resp.status == true) {
                    this.userList = resp.payload.user_list.list.list;
                    this.page = resp.payload.user_list.page;
                    this.pagesize = resp.payload.user_list.pagesize;
                    this.count = resp.payload.user_list.count;
                }
                this.loading = false;
            });
        }
    }
}
</script>
<style lang="less">
    .user-content {
        background: #ECECEC;padding: 30px; min-height:400px;
    }
</style>