<template lang="">
    <div class="account">
        <div>
            <p><small>@{{ account }}</small></p>
        </div>
        <div>
            <img class="account-icon--delete" src="@/assets/images/dashboard/delete.svg" alt="" @click="sendDeleteAccountEvent">
        </div>
    </div>
</template>
<script>

export default {
    name: 'TikTokAccountComponent',
    props: ['account'],
    methods: {
        sendDeleteAccountEvent() {
            this.$emit('delete')
        }
    }
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
        min-width: 150px;
        width: auto;
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
            position: relative;
        }
        &-icon {
            width: 15px;
            &--delete {
                margin-left: 15px;
                position: relative;
                top: 1px;
                transition: 0.2s all ease-in-out;
                &:hover {
                    cursor: pointer;
                    top: -2px;
                    
                }
            }
            // &--edit {
            //     margin-left: 15px;
            //     &:hover {
            //         cursor: pointer;
            //     }
            // }
        }
        .notActive {
                filter: grayscale(100%);
                opacity: 0.5;
        }
    }
</style>