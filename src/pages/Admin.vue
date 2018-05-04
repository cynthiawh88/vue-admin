<template>
    <div id="Admin">
            <Menu>
                <template slot="content">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </template>
            </Menu>
    </div>
</template>
<script>
import Menu from '@/components/Menu';
export default {
    name: "Login",
    components: {
        Menu
    },
    data() {
        return {

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
