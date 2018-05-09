<template>
    <div id="Power">
        <v-card title="权限列表" :bordered="true" :noHovering="true">
            <p class="text-xxl">
                <h3>
                该列表维护的权限(Power)主要针对于开发者使用，非技术人员请勿直接对数据进行变更，以免引起部分账号的操作异常。
                <br />
                <br />
                该页的数据，主要作为权限底层权限关键字管理，在系统增添新的功能时，请先在此处添加指定权限，后而开发功能并在功能中使用权限（Power）中的Key字段拦截验证。
                </h3>
                <br />
            </p>
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
                        <v-button type="dashed" size="large" @click="openPowerDialog" class="create-btn">新建</v-button>
                    </v-col>
                    -->
                    <v-col :span="6">
                        <AddCard text="添加权限" @click="openPowerDialog" :height="111" />
                    </v-col>
                    <v-col :span="6" v-for="(power, index) in powerList" :key="index">
                        <PowerCard :power="power" @delete="deletePower" @updated="reviewPower"/>
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


    <!--  创建权限信息  -->
    <v-modal title="创建权限信息"
        :visible="createPowerVisible"
        @cancel="closePowerDialog"
        :width="700"
    >
        <PowerForm @close="closePowerDialog"/>
        <template slot="footer">
            <span></span>
        </template>
    </v-modal>
    </div>
</template>
<script>
import PowerCard from '@/components/PowerCard';
import AddCard from '@/components/AddCard';
import PowerForm from '@/components/PowerForm';
import * as roleApi from '@/request/role';
export default {
    name: "Power",
    components: {
        PowerCard, AddCard, PowerForm
    },
    data() {
        return {
            page: 1,
            pagesize: 20,
            count: 0,
            key: '',
            loading: false,
            powerList: [],

            createPowerVisible: false,

        };
    },
    mounted: function() {
        this.paginate();
    },
    methods: {
        paginate() {
            this.loading = true;
            this.powerList = [];
            roleApi.paginatePower(
                {
                    page: this.page,
                    pagesize: this.pagesize,
                    key: this.key
                }
            ).then(resp => {
                if (resp.status == true) {
                    this.powerList = resp.payload.power_list.list;
                    this.page = resp.payload.power_list.page;
                    this.pagesize = resp.payload.power_list.pagesize;
                    this.count = resp.payload.power_list.count;
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
        deletePower: function(item) {
            let index = this.powerList.findIndex(power => power.power_id === item.power_id);
            if (index >= 0) {
                this.powerList.splice(index, 1);
                this.count--;
            }
        },
        openPowerDialog: function() {
            this.createPowerVisible = true;
        },
        closePowerDialog: function(power = undefined) {
            if (power != undefined)
            {
                this.powerList.unshift(power);
            }
            this.createPowerVisible = false;
        },
        // 更新权限信息，用于PowerCard中的权限信息被修改后的回调函数。
        reviewPower: function(power) {
            let index = this.powerList.findIndex(power => power.power_id === power.power_id);
            if (index >= 0) {
                this.powerList[index] = power;
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