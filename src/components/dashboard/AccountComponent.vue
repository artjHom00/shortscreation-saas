<template lang="">
    <div class="account">
        <img class="account-image" :class="account.credentials_valid ? '' : 'notActive' " src="@/assets/images/dashboard/kendrick.png" alt="">
        <div>
            <h4>{{ account?.email }}</h4>
            <p><small>#{{ account?._id }}</small></p>
        </div>
        <div>
            <Popper :content="account.credentials_valid ? 'Active' : 'Not active'" hover>
                <img class="account-icon" :class="account.credentials_valid ? '' : 'notActive' " src="@/assets/images/dashboard/lightning.svg" alt="">
            </Popper>
            <img class="account-icon--delete" src="@/assets/images/dashboard/delete.svg" alt="" @click="sendDeleteAccountEvent" v-if="editing">
            <img class="account-icon--edit" src="@/assets/images/dashboard/edit.svg" alt="" @click="sendEditAccountEvent" v-if="editing">
        </div>
    </div>
</template>
<script>
import Popper from 'vue3-popper';

export default {
    name: 'AccountComponent',
    props: ['account', 'editing'],
    components: {
      Popper,
    },
    methods: {
        sendDeleteAccountEvent() {
            this.$emit('delete')
        },
        sendEditAccountEvent() {
            this.$emit('edit')
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
        // max-width: 350px;
        min-width: 250px;
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
            &--delete, &--edit {
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