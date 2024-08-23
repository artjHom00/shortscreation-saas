<template lang="">
    <Transition>
        <NotificationComponent :type="notification.type" :message="notification.message" v-if="notification.show"/>
    </Transition>
    <div class="dashboard container">
        <ProfileNavigation :user="user"/>
        <h2>Accounts</h2>
        <p>
            ⚠️ Notice, after <b> adding account / updating account's credentials </b> <br>
            it might show "Not active" till the next upload & reset all account's settings <br><br>
            <a href="/instruction.pdf" class="text-primary" target="_blank">Instruction how to add your youtube account here</a>
        </p>
        <div class="accounts">

            <BtnComponent type="primary" text="Add New Account" @click="changeStateOfForm" v-if="isAllowedToAddAccounts"/>

            <transition>

            <div class="add-account" v-if="showForm">

                <div class="add-account-form">
                    <InputComponent label="Event Trigger URL" placeholder="Enter Event Trigger URL" v-model="newAccount.event_trigger_url"/>
                    <!-- <InputComponent v-model="newAccount.email" label="Email*" placeholder="Email"/>
                        <InputComponent v-model="newAccount.password" password="true" label="Password*" placeholder="*********"/>
                        <InputComponent v-model="newAccount.recoveryEmail" label="Recovery Email" placeholder="Recovery email"/> -->
                </div>
                <a href="/instruction.pdf" class="text-primary" target="_blank">What is "Event Trigger URL" and where to get it?</a>
                <BtnComponent type="primary" text="Save" @click="createAccount()"/>

            </div>

            </transition>

            <div v-if="youtubeAccounts.length > 0">

                <h4>Your Accounts:</h4>
                <div class="accounts-list">
                    <AccountComponent v-for="account in youtubeAccounts" :key="account._id" :account="account" editing="true" @delete="deleteAccount(account._id)" @edit="editAccount(account._id)"/>
                </div>

            </div>

        </div>

    </div>
</template>
<script>
import ProfileNavigation from '@/components/dashboard/ProfileNavigation.vue';
import AccountComponent from '@/components/dashboard/AccountComponent.vue';
import NotificationComponent from '@/components/NotificationComponent.vue'
import InputComponent from '@/components/InputComponent.vue';
import BtnComponent from '@/components/BtnComponent.vue';

import axios from 'axios';

export default {
    name: 'DashboardView',
    props: ['user'],
    data() {
        return {
            showForm: false,
            youtubeAccounts: [],
            newAccount: {
                event_trigger_url: null,
            },
            notification: {
                show: false,
                type: null,
                message: null
            }
        }
    },
    methods: {
        changeStateOfForm() {
            this.showForm = !this.showForm
        },
        createAccount() {
            axios.post('youtube-accounts/', {
                ...this.newAccount
            })
            .then(() => {
                this.getData()
                this.showForm = false

                this.newAccount = {
                    event_trigger_url: null
                }

                this.showNotification('success', 'Account successfully added!')
            }).catch(({ response: { data }}) => {
                console.log("🚀 ~ file: DashboardView.vue:62 ~ .then ~ data:", data.error)
                this.showNotification('fail', data.error)
                // this.$router.push('/')
            })  
        },
        getData() {
            axios.get(`youtube-accounts/`)
            .then(({ data }) => {
                this.youtubeAccounts = data
            }).catch(({ response: { data }}) => {
                console.log("🚀 ~ file: DashboardView.vue:62 ~ .then ~ data:", data.error)
                // this.$router.push('/')
            })
        },
        deleteAccount(id, isEditing = false) {
            axios.delete('youtube-accounts/' + id)
            .then(() => {
                if(!isEditing) {
                    this.showNotification('success', 'Account successfully deleted!')
                }
                this.getData()
            }).catch(({ response: { data }}) => {
                this.showNotification('fail', data.error || 'Error occured while deleting')
                // this.$router.push('/')
            })  
        },
        editAccount(id) {
            let youtubeAccount = this.youtubeAccounts.find(account => {
                return account._id === id
            })

            this.newAccount = {
                ...youtubeAccount,
                email: youtubeAccount.email,
                password: youtubeAccount.password,
                recoveryEmail: youtubeAccount.recoveryEmail
            }
            
            this.showForm = true

            this.deleteAccount(id, true)
        },
        showNotification(type, message) {

            this.notification = {
                show: true,
                type,
                message
            }
            
            setTimeout(() => {
                this.notification.show = false
            }, 3000)

        }
            
    },
    mounted() {

        axios.defaults.baseURL = this.$store.state.host
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.$cookies.get('jwt_token')}`
        
        this.getData()

    },
    computed: {
        isAllowedToAddAccounts() {
            if(this.$props.user?.subscription?.type === 'Basic' && this.youtubeAccounts.length < 1) {
                return true
            }
            if(this.$props.user?.subscription?.type === 'Premium' && this.youtubeAccounts.length < 3) {
                return true
            }
            if(this.$props.user?.subscription?.type === 'Ultimate' && this.youtubeAccounts.length < 3) {
                return true
            }
            return false
        }
    },  
    components: {
        ProfileNavigation,
        AccountComponent,
        BtnComponent,
        InputComponent,
        NotificationComponent
    }
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';

    .dashboard {
        & > p {
            margin-bottom: 40px;
            opacity: 0.75;
        }

        h2 {
            margin-top: 50px;
            margin-bottom: 0;
        }
        & .add-account {
            border-radius: 15px;
            background: $white;
            padding: 30px 50px;
            &-form {
                display:flex;
                justify-content: space-between;
                // flex-wrap: wrap;
                margin-bottom: 10px;
                & > div {
                    width: 100%;
                }
            }
            & > button {
                text-align: center;
                margin: 0 auto;
                margin-top: 30px;
                width: 200px;
            }
        }
        & .accounts {
            & > * {
                margin-bottom: 50px;
            }
            &-list {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                & > * {
                    margin-bottom: 20px;
                    width: calc(50% - 70px);
                }
            }
        }
    }

    @media(max-width: 1050px) {
        .dashboard {
            & .accounts {
                &-list {
                    & > * {
                        width: 100%;
                    }
                }
            }
            
        }
    }

    @media(max-width: 796px) {
        .dashboard {
            &  .accounts {
                & > button {
                    width: 100%;
                }
                & .add-account {
                    &-form {
                        flex-wrap: wrap;
                        & > div {
                            width: 100%;
                        }

                    }
                }
            }
        }
    }
</style>