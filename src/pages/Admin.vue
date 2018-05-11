<template>
    <div id="Admin">
            <Menu>
                <template slot="content">
                    <keep-alive :include="keepAliveExclude">
                        <router-view></router-view>
                    </keep-alive>
                </template>
            </Menu>
    </div>
</template>
<script>
import Menu from '@/components/Menu';
export default {
    name: "Admin",
    components: {
        Menu
    },
    data() {
        return {
            keepAliveExclude: [
                'User', 'Role', 'Power'
            ]
        };
    },
    methods: {

    }
}
</script>
<style>
    #Admin{
        height: 100%;
    }
</style>
