<template lang="">
    <div class="account">
        <img class="account-image" src="@/assets/images/dashboard/kendrick.png" alt="">
        <div>
            <h4>Mariantic</h4>
            <p><small>example@gmail.com</small></p>
        </div>
        <div>
            <img class="account-icon" src="@/assets/images/dashboard/lightning.svg" alt="">
        </div>
    </div>
</template>
<script>
export default {
    name: 'AccountComponent'
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';

    .account {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        border-radius: 15px;
        border: 1px solid $gray-white;
        background: $white;
        // max-width: 350px;
        min-width: 220px;
        & > div {
            & > h4, & > p {
                margin: 0;
            }
            & > p {
                opacity: 0.75;
            }
        }
        &-image {
            width: 50px;
        }
        &-icon {
            width: 15px;
        }
    }
</style>