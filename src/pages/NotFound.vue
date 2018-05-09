<template>
    <div id="NotFound">
        <v-row :gutter="20">
            <v-col :span="3"></v-col>
            <v-col :span="10">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg" />
            </v-col>
            <v-col :span="8">
                <h1 style="font-size: 70px;">404</h1>
                <h4 style="font-size: 30px;">抱歉，您访问的页面不存在</h4>
            </v-col>
        </v-row>
    </div>
</template>
<style lang="less">
    #NotFound{
        background: #ECECEC;padding: 30px; min-height:500px;
        margin: 100px 0;
    }
</style>