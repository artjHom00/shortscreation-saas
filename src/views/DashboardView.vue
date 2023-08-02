<template lang="">
    <div class="dashboard container">
        <ProfileNavigation :user="user"/>
        <h2>Dashboard</h2>
        <p>* Here you can access basic information about your subscription / dashboard</p>
        <div class="filled-section">
            <div class="filled-section-content" v-if="!user?.subscription?.has_subscription">
                <h4>Your Subscription:</h4>
                <h1>No Subscription</h1>
                <br>
                <router-link to="/subscriptions" class="no-decoration"><BtnComponent type="primary" text="Buy subscription"/></router-link>
            </div>
            <div class="filled-section-content" v-else>
                <h4>Your Subscription:</h4>
                <h1>{{ user?.subscription?.type }} Plan</h1>
                <h3>Expires: {{ getSubscriptionExpirationDate }}</h3>
            </div>
            <div v-if="user?.subscription?.has_subscription && youtubeAccounts.length > 0" class="next-upload">
                <h4>Next closest upload:</h4>
                <div>
                    <h3>In {{ getClosestNextUpload.hours }} hours</h3>
                    <h4>On {{ getClosestNextUpload.account }}</h4>
                </div>
            </div>
        </div>

        <div class="accounts">
            <h4>Your Accounts:</h4>
            <div v-if="youtubeAccounts.length === 0">
                <h3 >No accounts yet! :( <br></h3>
            </div>
            
            <div class="accounts-list" v-else>
                <router-link to="/accounts" v-for="account in youtubeAccounts" :key="account._id"><AccountComponent :account="account"/></router-link>
            </div>
        </div>

        <div class="last-shorts">
            <h4>Last shorts:</h4>
            <div v-if="shorts.length === 0">
                <h3 >No shorts yet! :(</h3>
            </div>
            <div class="last-shorts-list" v-else>
                <ShortComponent v-for="short in shorts" :key="short._id" :short="short"/>
            </div>
        </div>
    </div>
</template>
<script>
import ProfileNavigation from '@/components/dashboard/ProfileNavigation.vue';
import AccountComponent from '@/components/dashboard/AccountComponent.vue';
import BtnComponent from '@/components/BtnComponent.vue';
import ShortComponent from '@/components/dashboard/ShortComponent.vue';

import axios from 'axios';
import moment from 'moment';


export default {
    name: 'DashboardView',
    props: ['user'],
    components: {
        ProfileNavigation,
        AccountComponent,
        BtnComponent,
        ShortComponent,
    },
    data() {
        return {
            youtubeAccounts: [],
            shorts: [],
        }
    },
    methods: {
        getData() {
            axios.get(`youtube-accounts/`)
            .then(({ data }) => {
                this.youtubeAccounts = data
            }).catch(({ response: { data }}) => {
                // happens when token is 'Bearer null', which means user is not authorized
                if(data.name === 'JsonWebTokenError') {
                    window.location.href = '/create-account'
                }
                // this.$router.push('/')
            })

            axios.get(`users/shorts/`)
            .then(({ data }) => {
                this.shorts = data
            }).catch(({ response: { data }}) => {
                // happens when token is 'Bearer null', which means user is not authorized
                if(data.name === 'JsonWebTokenError') {
                    window.location.href = '/create-account'
                }
                // this.$router.push('/')
            })
        },
 
    },
    computed: {
        getSubscriptionExpirationDate() {
            return moment(this.$props.user?.subscription?.expires).format('Do MMM YYYY')
        },
        getClosestNextUpload() {
            let closest = {
                account: null,
                hours: null
            }

            let now = moment(new Date())
            
            this.youtubeAccounts.forEach((account) => {
                let uploadTime = moment(account.last_upload)

                let timePassed = moment.duration(now.diff(uploadTime))._data
                let nextUpload = account.settings.uploadInterval - timePassed.hours

                if(nextUpload < closest.hours || closest.hours === null) {

                    closest = {
                        account: account.email,
                        hours: nextUpload
                    }

                }
            })

            return closest
        }
    },  
    mounted() {
        
        axios.defaults.baseURL = this.$store.state.host
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.$cookies.get('jwt_token')}`
        
        this.getData()

        if(this.$props.user?.confirmation?.status === false) {
            window.location.href = '/confirm-account'
        }
        

        if(!this.$props.user) {
            window.location.href = '/create-account'
        }
        
    }
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';

    .dashboard {
        & > .accounts, & > .last-shorts {
            margin-top: 50px;
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
            display: flex;
            justify-content: space-between;
            & > div {
                & > h1, & > h3,  & > h4 {
                    margin: 0;
                }
                & > h4 {
                    margin-bottom: 20px
                }
            }
            & > .next-upload {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                & > div > h3, h4 {
                    margin: 0;
                }
            }
        }
        & .accounts {
            &-list {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                & > * {
                    // margin-right: 20px;
                    text-decoration: none;
                    margin-bottom: 20px;
                    width: calc(50% - 70px);
                    transition: 0.2s opacity ease-in-out;
                    &:hover {
                        opacity: 0.75;
                    }
                }
            }
        }
        & .last-shorts {
            &-list {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                & > * {
                    margin-bottom: 20px;
                    width: calc(30% - 30px);
                }
            }
        }
    }

    @media(max-width: 978px) {
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
    
    @media(max-width: 680px) {
        .dashboard {
            & .filled-section {
                flex-wrap: wrap;
                & > * {
                    margin: 30px 0;
                }
            }
            & .last-shorts {
                &-list {
                    & > * {
                        width: 100%;
                    }
                }
            }
        }
        h1 {
            font-size: 36px;
        }
    }
</style>