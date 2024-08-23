<template lang="">
    <router-link to="/dashboard" class="no-decoration alert">
        🎉 We're launched! FREE 1 MONTH TRIAL WITHOUT CREDIT CARDS. GET STARTED NOW! 
    </router-link>
</template>
<script>
export default {
    name: 'AlertComponent'
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';
    .alert {
        width: 100%;
        display: block;
        position: fixed;
        top: 0;
        background: $primary-fade;
        color: white;
        text-align: center;
        font-weight: bold;
        font-size: 13px;
        padding: 5px 0;
        z-index: 333;
    }
</style>