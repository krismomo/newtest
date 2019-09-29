<template>
    <div>
        <span>{{user.username}}</span>
        <span>你好，欢迎使用信息管理系统</span>
        
    </div>
</template>
<script> 
import {mapState} from "vuex"
export default {
    computed: {
        ...mapState(["user"])
    },
}
</script>
<style scoped>
</style>