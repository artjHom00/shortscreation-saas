<template lang="">
    <Transition>
        <NotificationComponent :type="notification.type" :message="notification.message" v-if="notification.show"/>
    </Transition>
    <div class="dashboard container">
        <ProfileNavigation :user="user"/>
        <h2>Let’s Set Up Your content!</h2>

        <div class="accounts">
            <h4>Select an account:</h4>
            <div class="accounts-list">
                <AccountComponent v-for="account in youtubeAccounts" :class="(account._id === form.forAccount) ? 'active' : ''" :key="account._id" :account="account" @click="changeFormState(account._id)"/>
            </div>
            
            <Transition>
                <div class="forms" v-if="form.isActive">
                    <div class="form youtube-upload-settings">
                        <h3>YouTube Upload Settings</h3>
                        <inputComponent v-model="form.data.settings.uploadInterval" label="Upload Interval" placeholder="Every 24 hours"/>
                        <inputComponent v-model="form.data.settings.title" label="Enter a title for every video" placeholder="Enter a title... "/>
                        <inputComponent v-model="form.data.settings.pinnedComment" label="Enter a comment to pin under every video" placeholder="Enter a comment..." textarea="true"/>
                        <inputComponent v-model="form.data.settings.description" label="Enter a description for every video" placeholder="Enter a description..." textarea="true"/>
                        <br>
                        <btnComponent type="primary" text="Save" class="save-button" @click="updateSettings()"/>
                    </div>
                    <div class="form tiktok-accounts">
                        <h3>TikTok Accounts</h3>
                        <div class="tiktok-accounts-list">
                            <TikTokAccountComponent v-for="(tiktokAccount, index) in form.data.tiktokAccounts" :key="index" :account="tiktokAccount" @delete="deleteTikTokAccount(index)"/>
                        </div>
                        <div class="input-flex">
                            <inputComponent v-model="newTikTokAccount" label="Unique Id" placeholder="@example" style="width: 80%;"/>
                            <btnComponent type="primary" icon="dashboard/plus.svg" class="add-button" style="width: calc(20% - 20px); margin-left: 20px" @click="addTikTokAccount"/>
                        </div>
                        <br>
                        <!-- <btnComponent type="primary" text="Save" class="save-button"/> -->
                    </div>
                </div>
            </Transition>
            <!-- <div class="edit-account">
                <div class="edit-account-form">
                    <inputComponent label="TikTok Account" placeholder="Enter @uniqueid"/>
                    <inputComponent label="Background Video" placeholder="YouTube video URL"/>
                    <inputComponent label="Upload Interval" placeholder="Every 24h."/>
                </div>
                <btnComponent type="primary" text="Save"/>
            </div>
        </div>
        <div class="settings-forms">
            <div class="pinned">
                <h4>Pinned comment:</h4>
                <div class="pinned-form">
                    <div class="pinned-form-wrapper">
                        <inputComponent class="pinned-form--input" textarea="true" label="Enter a comment to pin under every video:" placeholder="Enter a comment..."/>
                                                
                        <div class="checkbox">
                            <input type="checkbox" id="useDefault"/>
                            <label for="useDefault"><small>Help us grow, use our default pinned comment</small></label>
                        </div>
                    </div>
                    <btnComponent type="primary" text="Save"/>
                </div>
            </div>
            <div class="title">
                <h4>Videos title:</h4>
                <div class="title-form">
                    <div class="title-form-wrapper">
                        <inputComponent class="title-form--input" textarea="true" label="Enter a title for every video" placeholder="Enter a title..."/>
                        
                        <div class="checkbox">
                            <input type="checkbox" id="useDefault"/>
                            <label for="useDefault"><small>Help us grow, use our default title</small></label>
                        </div>
                    </div>
                        
                    <btnComponent type="primary" text="Save"/>
                </div>
            </div>
            <div class="description">
                <h4>Videos descripion:</h4>
                <div class="description-form">
                    <div class="description-form-wrapper">
                        <inputComponent class="description-form--input" textarea="true" label="Enter a description for every video" placeholder="Enter a description..."/>
                                                
                        <div class="checkbox">
                            <input type="checkbox" id="useDefault"/>
                            <label for="useDefault"><small>Help us grow, use our default description</small></label>
                        </div>
                    </div>
                        
                    <btnComponent type="primary" text="Save"/>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
import ProfileNavigation from '@/components/dashboard/ProfileNavigation.vue';
import AccountComponent from '@/components/dashboard/AccountComponent.vue';
import inputComponent from '@/components/InputComponent.vue';
import btnComponent from '@/components/BtnComponent.vue';
import NotificationComponent from '@/components/NotificationComponent.vue'
import TikTokAccountComponent from '@/components/dashboard/TikTokAccountComponent.vue'

import axios from 'axios'

export default {
    name: 'DashboardView',
    props: ['user'],
    components: {
        ProfileNavigation,
        AccountComponent,
        btnComponent,
        inputComponent,
        NotificationComponent,
        TikTokAccountComponent
    },
    data() {
        return {
            youtubeAccounts: [],
            showForm: false,
            form: {
                isActive: false,
                forAccount: 0,
                data: {
                    tiktokAccounts: [],
                    settings: {
                        title: null,
                        pinnedComment: null,
                        description: null,
                        uploadInterval: null
                    },
                }
            },
            newTikTokAccount: null,
            notification: {
                show: false,
                type: null,
                message: null
            }
        }
    },
    methods: {
        getData() {
            axios.get(`youtube-accounts/`)
            .then(({ data }) => {
                this.youtubeAccounts = data
            }).catch(({ response: { data }}) => {
                console.log("🚀 ~ file: DashboardView.vue:62 ~ .then ~ data:", data.error)
                // this.$router.push('/')
            })
        },
        changeFormState(accountId) {
            if(this.form.forAccount === accountId) {
                this.form.forAccount = false
                this.form.isActive = false
                return
            }
            this.form.isActive = true
            this.form.forAccount = accountId
            
            let account = this.youtubeAccounts.find((obj) => {
                return obj._id === accountId
            })

            this.form.data.settings = account.settings
            this.form.data.tiktokAccounts = account.tiktok_accounts
            
        },
        addTikTokAccount() {
            this.form.data.tiktokAccounts = [...this.form.data.tiktokAccounts, this.newTikTokAccount]
            axios.patch('youtube-accounts/' + this.form.forAccount, {
                tiktok_accounts: this.form.data.tiktokAccounts
            }).then(() => {
                this.showNotification('success', 'Tiktok source account successully added')
            }).catch(({ response: { data }}) => {
                this.showNotification('fail', 'Error occured while adding')

            })
        },
        deleteTikTokAccount(index) {
            this.form.data.tiktokAccounts.splice(index, 1)
            axios.patch('youtube-accounts/' + this.form.forAccount, {
                tiktok_accounts: this.form.data.tiktokAccounts
            }).then(() => {
                this.showNotification('success', 'Tiktok source account successully deleted')
            }).catch(({ response: { data }}) => {
                this.showNotification('fail', 'Error occured while deleting')

            })
        },
        updateSettings() {
            axios.patch('youtube-accounts/' + this.form.forAccount, {
                settings: this.form.data.settings
            }).then(() => {
                this.showNotification('success', 'Account settings successully updated')
            }).catch(({ response: { data }}) => {
                this.showNotification('fail', 'Error occured while updating account settings')

            })
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
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';

    .dashboard {
        h2 {
            margin-bottom: 70px;
        }
        & .filled-section {
            width: calc(100% - 100px);
            background: $fade-w-image;
            background-size: cover;
            padding: 40px 50px;
            border-radius: 15px;
            color: $white;
            & > div {
                & > h1, & > h3,  & > h4 {
                    margin: 0;
                }
                & > h4 {
                    margin-bottom: 20px
                }
            }
        }
        & .accounts {
            &-list {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                & > * {
                    margin-bottom: 20px;
                    width: calc(50% - 70px);
                    position: relative;
                    top: 0;
                    border: 2px dashed $white;
                    transition: 0.2s top ease-in-out;

                    &:hover {
                        top: -2px;
                        cursor: pointer;
                    }
                    &.active {
                        border: 2px dashed $primary;
                    }
                }
            }
        }

        & .forms {
            display: grid;
            grid-template-columns: 50% 50%;
            width:100%;
            & .form {
                height: fit-content;
                background: $white;
                border-radius: 15px;
                padding: 20px 40px;
                width: calc(100% - 100px);
                margin: 0 auto;
                & .save-button {
                    margin: 0 auto;
                    width: 200px;
                }
                & .input-flex {
                    display: flex;
                    align-items: flex-end;
                    & .add-button {
                        height: 56px;
                    }
                }
            }
            & .tiktok-accounts-list {
                display: flex;
                flex-wrap: wrap;
                & > * {
                    margin: 5px;
                }
            }
        }
        & .edit-account {
            border-radius: 15px;
            background: $white;
            padding: 30px 50px;
            &-form {
                display:flex;
                justify-content: space-between;
                // flex-wrap: wrap;
                margin-bottom: 30px;
                & > div {
                    width: 30%;
                }
                &.tiktok-accounts {
                    &-list {
                        display: flex;
                    }
                }
            }
            & > .add-button {
                text-align: center;
                margin: 0 auto;
                width: 200px;
            }
        }

        .settings-forms {
            margin-top: 50px;
            display: flex;
            flex-wrap: wrap;
            & .pinned, .title, .description {
                width: calc(50% - 80px);
                margin: 0 auto;
                text-align: center;
                &-form {
                    border-radius: 15px;
                    text-align: center;
                    padding: 10px 40px 30px 40px;
                    background: $white;
                    // display: flex;
                    justify-content: center;
                    &-wrapper {
                        min-height: 210px;
                        width: 100%;
                        align-self: center;
                        margin-bottom: 15px;
                    }
                    & .checkbox {
                        text-align: left;
                    }
                    &--input {
                        text-align: initial;
                        max-width: 500px;
                        margin: 0 auto;
                        margin-bottom: 20px;
                    }
                    & button {
                        margin-top: 20px;
                        margin: 0 auto;
                        width: 200px;
                    }
                }
            }
        }
    }

    @media(max-width: 990px) {
        .dashboard {
            .accounts {
                &-list {
                    display: block;
                    & > * {
                        width: calc(100% - 40px);
                    }
                }
                & .forms {
                    display: block;
                    & > * {
                        margin-bottom: 20px;
                    }
                }
            }
        }
    }

    @media(max-width: 796px) {
        .dashboard {
            & .accounts {
                & .edit-account {
                    &-form {
                        flex-wrap: wrap;
                        & > div {
                            width: 100%;
                        }

                    }
                }
            }
            & .settings-forms {
                & .pinned, .title {
                    width: 100%;
                }
            }
        }
    }

    @media(max-width: 750px) {
        .dashboard {
            .accounts {
                .form {
                    & .add-button {
                        height: 48px !important;
                    }

                }
            }
        }
    }

</style>