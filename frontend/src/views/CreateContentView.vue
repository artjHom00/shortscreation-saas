<template lang="">
    <Transition>
        <NotificationComponent :type="notification.type" :message="notification.message" v-if="notification.show"/>
    </Transition>
    <div class="dashboard container">
        <ProfileNavigation :user="user"/>
        <h2>Let’s Set Up Your content!</h2>
        <p>* Here you can set default uploading settings for the account</p>
        <div class="accounts">
            <h4>Select an account:</h4>
            <div class="accounts-list" v-if="youtubeAccounts.length > 0">
                <AccountComponent v-for="account in youtubeAccounts" :class="(account._id === form.forAccount) ? 'active' : ''" :key="account._id" :account="account" @click="changeFormState(account._id)"/>
            </div>
            <div v-else>
                <h3>No accounts yet! :( <br>Add one in "Manage Accounts" tab</h3>
            </div>
            <Transition>
                <div class="forms" v-if="form.isActive">
                    <div class="form youtube-upload-settings">
                        <h3>YouTube Upload Settings</h3>
                        <p><small>#{{ form.forAccount }}</small></p>
                        <InputComponent v-model="form.data.settings.uploadInterval" label="Upload Interval" placeholder="Every 24 hours" option="true" :user="user"/>
                        <InputComponent v-model="form.data.settings.title" label="Enter a title for every video" placeholder="Enter a title... "/>
                        <div class="checkbox">
                            <input type="checkbox" v-model="form.useTiktokTitle" id="default"/>
                            <label for="default"><small>Set title as tiktok's title</small></label>
                        </div>
                        <InputComponent v-model="form.data.settings.hashtags" label="Enter default hashtags for every video" placeholder="Enter hashtags... "/>
                        <p class="input-caption"><small>Hashtags will increase your chances to get into recommended section<br>
                        Example: #shorts #comedy #tiktok
                        </small></p>
                        <!-- <InputComponent v-model="form.data.settings.pinnedComment" label="Enter a comment to pin under every video" placeholder="Enter a comment..." textarea="true"/> -->
                        <InputComponent v-model="form.data.settings.description" label="Enter a description for every video" placeholder="Enter a description..." textarea="true"/>
                        <h4>Background video</h4>
                        <small>Recommended video aspect ratio: 9:16. Limit 300mb.</small>
                        <!--default html file upload button-->
                        <input type="file" id="actual-btn" accept=".mp4" hidden @change="fileChange"/>

                        <!--our custom file upload button-->
                        <label for="actual-btn" id="file-upload">
                            <img src="../assets/images/dashboard/upload.svg" alt=""><br>
                            {{ form.data.background_video ? form.data.background_video : 'Upload a file' }}
                        </label>
                        <br>
                        <BtnComponent type="primary" text="Save" class="save-button" @click="updateSettings()"/>
                    </div>
                    <div class="form tiktok-accounts">
                        <h3>TikTok Accounts</h3>
                        <p><small>#{{ form.forAccount }}</small></p>
                        <div class="tiktok-accounts-list"  v-if="form.data.tiktokAccounts.length > 0">
                            <TikTokAccountComponent v-for="(tiktokAccount, index) in form.data.tiktokAccounts" :key="index" :account="tiktokAccount" @delete="deleteTikTokAccount(index)"/>
                        </div>
                        <h4 v-else>No source accounts provided. Add one now!</h4>
                        <div class="input-flex">
                            <InputComponent v-model="newTikTokAccount" label="Unique Id" placeholder="@example" style="width: 80%;"/>
                            <BtnComponent type="primary" icon="dashboard/plus.svg" class="add-button" style="width: calc(20% - 20px); margin-left: 20px" @click="addTikTokAccount"/>
                        </div>
                        <br>
                        <!-- <BtnComponent type="primary" text="Save" class="save-button"/> -->
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>
<script>
import ProfileNavigation from '@/components/dashboard/ProfileNavigation.vue';
import AccountComponent from '@/components/dashboard/AccountComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import BtnComponent from '@/components/BtnComponent.vue';
import NotificationComponent from '@/components/NotificationComponent.vue'
import TikTokAccountComponent from '@/components/dashboard/TikTokAccountComponent.vue'

import axios from 'axios'

export default {
    name: 'DashboardView',
    props: ['user'],
    components: {
        ProfileNavigation,
        AccountComponent,
        BtnComponent,
        InputComponent,
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
                useTiktokTitle: false,
                data: {
                    tiktokAccounts: [],
                    settings: {
                        title: null,
                        pinnedComment: null,
                        description: null,
                        uploadInterval: null,
                        hashtags: []
                    },
                    background_video: null
                }
            },
            newTikTokAccount: null,
            uploadedFile: false,
            notification: {
                show: false,
                type: null,
                message: null
            },
        }
    },
    methods: {
        fileChange(event) {
            console.log("🚀 ~ file: CreateContentView.vue:106 ~ fileChange ~ event.target.files[0].name:", event.target.files[0].name)
            this.form.data.background_video = event.target.files[0].name
            this.uploadedFile = true
        },
        removeAtSymbol(string) {
            if (string.startsWith('@')) {
                return string.slice(1);
            }
            return string;
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
        changeFormState(accountId) {
            this.getData()
            
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

            this.form.useTiktokTitle = account.use_tiktok_title
            this.form.data.settings = account.settings
            this.form.data.background_video = account?.background_video
            this.form.data.tiktokAccounts = account.tiktok_accounts
            
        },
        addTikTokAccount() {
            let formattedTikTokAccount = this.removeAtSymbol(this.newTikTokAccount)

            axios.patch('youtube-accounts/' + this.form.forAccount, {
                tiktok_accounts: [...new Set([...this.form.data.tiktokAccounts, formattedTikTokAccount])]
            }).then(() => {
                this.form.data.tiktokAccounts = [...new Set([...this.form.data.tiktokAccounts, formattedTikTokAccount])]
                this.showNotification('success', 'Tiktok source account successully added')
                this.getData()
            }).catch(() => {
                this.showNotification('fail', 'Error occured while adding')

            })
        },
        deleteTikTokAccount(index) {
            this.form.data.tiktokAccounts.splice(index, 1)
            axios.patch('youtube-accounts/' + this.form.forAccount, {
                tiktok_accounts: this.form.data.tiktokAccounts
            }).then(() => {
                this.showNotification('success', 'Tiktok source account successully deleted')
            }).catch(() => {
                this.showNotification('fail', 'Error occured while deleting')

            })
        },
        updateSettings() {
            axios.patch('youtube-accounts/' + this.form.forAccount, {
                use_tiktok_title: this.form.useTiktokTitle,
                settings: this.form.data.settings
            }).then(() => {
                if(this.form.data.background_video) {
                    var formData = new FormData();
                    var video = document.querySelector('#actual-btn');
                    formData.append("background_video", video.files[0]);

                    if(this.uploadedFile) {
                        this.showNotification('success', "Started uploading your file. Don't close this page, it might take 3-10 minutes!")
                        this.uploadedFile = false
                        axios.patch('youtube-accounts/' + this.form.forAccount, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(({ data }) => {
                            this.form.data.background_video = data.background_video
                            this.showNotification('success', 'Account settings successully updated')
                        }).catch(() => {
                            this.showNotification('fail', 'Error occured while uploading video.')
                        })
                    } else {
                        this.showNotification('success', 'Account settings successully updated')
                        this.uploadedFile = false
                    }
                    
                } else {
                    
                    this.showNotification('success', 'Account settings successully updated')
                
                }
                
            }).catch(({response: { data }}) => {
                this.showNotification('fail', data.error)

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
    watch: {
        'form.data.settings.uploadInterval': function(newVal) {
            this.form.data.settings.uploadInterval = parseInt(newVal)
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

        #file-upload {
            background: $dark-fade;
            width: 70%;
            display: block;
            font-weight: bold;
            text-align: center;
            color: white;
            padding: 30px 0;
            font-family: sans-serif;
            border-radius: 15px;
            cursor: pointer;
            margin: 0 auto;
            margin-top: 1rem;
            transition: 0.1s opacity ease-in-out;
            & > img {
                width: 30px;
                margin-bottom: 5px;
            }
            &:hover {
                opacity: 0.8;
            }
        }

        & > p {
            margin-bottom: 40px;
            opacity: 0.75;
        }

        h2 {
            margin-top: 50px;
            margin-bottom: 0;
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
                & .checkbox, & .input-caption {
                    margin-top: 10px;
                }
                & > p {
                    margin-top: 0;
                    opacity: 0.8;
                    margin-left: 4px;
                }
                & > h3 {
                    margin-bottom: 0;
                }
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
            #file-upload {
                width: 100%;
            }
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