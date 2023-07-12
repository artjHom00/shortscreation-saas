<template lang="">
    <div class="account">
        <img class="account-image" :class="account.credentials_valid ? '' : 'notActive' " src="@/assets/images/dashboard/kendrick.png" alt="">
        <div>
            <h4>{{ account?.email }}</h4>
            <p><small>#{{ account?._id }}</small></p>
        </div>
        <div>
            <img class="account-icon" :class="account.credentials_valid ? '' : 'notActive' " src="@/assets/images/dashboard/lightning.svg" alt="">
        </div>
    </div>
</template>
<script>
export default {
    name: 'AccountComponent',
    props: ['account']
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
        min-width: 350px;
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
        .notActive {
                filter:grayscale(100%)
        }
    }
</style>