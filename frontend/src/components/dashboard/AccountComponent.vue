<template lang="">
    <div class="account">
        <div class="account-image" :class="account.credentials_valid ? '' : 'notActive' ">{{ getAccountFirstLetter }}</div>
        <div class="account-info">
            <h4>{{ extractedSubstring }}</h4>
            <p><small>#{{ shortenId }}</small></p>
        </div>
        <div class="account-icons">
            <Popper :content="account.credentials_valid ? 'Active' : 'Not active'" hover>
                <img class="account-icon" :class="account.credentials_valid ? '' : 'notActive' " src="@/assets/images/dashboard/lightning.svg" alt="">
            </Popper>
            <Popper :content="`${formatUploadDate}, ${account.last_log}`" hover v-if="!editing">
                <img class="account-icon--info" src="@/assets/images/dashboard/info.svg" alt="">
            </Popper>
            <img class="account-icon--delete" src="@/assets/images/dashboard/delete.svg" alt="" @click="sendDeleteAccountEvent" v-if="editing">
            <img class="account-icon--edit" src="@/assets/images/dashboard/edit.svg" alt="" @click="sendEditAccountEvent" v-if="editing">
        </div>
    </div>
</template>
<script>
import Popper from 'vue3-popper';
import moment from 'moment';

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
    },
    computed: {
        getAccountFirstLetter() {
            return this.$props.account.event_trigger_url[7] || '-'
        },
        formatUploadDate() {
            return moment(this.$props.account.last_upload).format('MMMM Do YYYY, HH:mm')
        },
        extractedSubstring() {
            //eslint-disable-next-line
            const match = this.account?.event_trigger_url.match(/https:\/\/([^\.]+)\.m\.pipedream\.net/);
            if (match && match[1]) {
                return match[1]
            } else {
                return "Not found";
            }
        },
        shortenId() {
            return this.$props.account?.id.slice(-5)
        }
    },
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
            background: $dark;
            height: 50px;
            display:flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: $white;
            border-radius: 15px;
            text-transform: uppercase;
            width: 50px;
            position: relative;
        }
        &-info {
            overflow:auto;
        }
        &-icons {
            display: flex;
            flex-wrap: nowrap;
            align-items: baseline;
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
                    top: -1px;
                    
                }
            }
            &--info {
                margin-left: 15px;
                height: 21px;
                position: relative;
                top: 1px;
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

    @media(max-width: 500px) {
        .account {
            &-image {
                display: none;
            }
        }
    }
</style>