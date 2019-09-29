<template>
    <div>
        <span>收款登记</span>
        <finance payorget_text="收款" poidorsoid="soId" showurl="/api/main/sell/somain/show" payorgeturl="/api/main/finance/receipt"></finance>
    </div>
</template>
<script>
    import finance from "@/components/finance_components.vue"
export default {
    data(){
        return{

        }
    },
    components:{finance}
}
</script>
<style scoped>
</style>