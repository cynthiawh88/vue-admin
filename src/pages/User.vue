<template>
    <div id="User">
        <v-card title="管理员列表" :bordered="true" :noHovering="true">
            该页面主要哒哒哒哒哒
        </v-card>

        <div style="background: #ECECEC;padding: 30px">
            <v-row :gutter="16">
                <v-col :span="6">
                    <UserCard />
                </v-col>
            </v-row>
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
                    this.userList = resp.payload.user_list.list;
                    this.page = resp.payload.user_list.page;
                    this.pagesize = resp.payload.user_list.pagesize;
                    this.count = resp.payload.user_list.count;
                }
            });
        }
    }
}
</script>