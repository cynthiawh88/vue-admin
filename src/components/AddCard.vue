<template>
<div id="AddCard" class="hoverable" :style="{height: height+'px', lineHeight: height + 'px'}">
    <div class="card" @click="onClick">
        <v-icon type="plus"></v-icon> {{ text }}
    </div>
</div>


</template>
<script>
import md5 from 'js-md5';
export default {
    name: 'AddCard',
    props: {
        text: {
            type: String,
            default: '添加组件'
        },
        height: {
            type: Number,
            default: 171
        }
    },
    components: {
        
    },
    data() {
        return {
        }
    },
    methods: {
        onClick: function() {
            this.$emit('click');
        }
    }
}
</script>
<style lang="less">
.hoverable{
    cursor:pointer;
}
.hoverable:hover {
    -webkit-box-shadow: 0 2px 8px rgba(0,0,0,.09);
    box-shadow: 0 2px 8px rgba(0,0,0,.09);
    border-color: rgba(0,0,0,.09);
    color: #49a9ee !important;
    border-color: #49a9ee !important;
}

#AddCard{
    margin: 5px 0;
    -webkit-transition: all .3s;
    transition: all .3s;
    background: #fff; 
    line-height: 100%;
    text-align: center;
    color: rgb(138,138,138);
    border: #ccc 1px dashed;
}
</style>