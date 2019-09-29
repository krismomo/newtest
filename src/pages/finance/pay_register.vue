<template>
    <div>
        <span>付款登记</span>
        <finance payorget_text="付款" poidorsoid="poId" showurl="/api/main/purchase/pomain/show" payorgeturl="/api/main/finance/pay"></finance>
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