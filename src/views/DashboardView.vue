<template lang="">
    <div class="dashboard container">
        <ProfileNavigation :user="getUser"/>
        <h2>Dashboard</h2>
        <p>* Here you can access basic information about your subscription / dashboard</p>
        <div class="filled-section">
            <div class="filled-section-content" v-if="!getUser?.subscription?.has_subscription">
                <h4>Your Subscription:</h4>
                <h1>No Subscription</h1>
                <br>
                <router-link to="/subscriptions" class="no-decoration">
                    <BtnComponent type="primary" text="Buy subscription"/>
                </router-link>
            </div>
            <div class="filled-section-content" v-else>
                <h4>Your Subscription:</h4>
                <h1>{{ getUser?.subscription?.type }} Plan</h1>
                <h3>Expires: {{ getSubscriptionExpirationDate }}</h3>
            </div>
            <div v-if="getUser?.subscription?.has_subscription && youtubeAccounts.length > 0" class="next-upload">
                <h4>Next closest upload:</h4>
                <div>
                    <h3>In {{ getClosestNextUpload?.date?.hours }} hours</h3>
                    <h4>and {{ getClosestNextUpload?.date?.minutes }} minutes for <i>#{{ shortenId(getClosestNextUpload?.account) }}</i></h4>
                </div>
            </div>
        </div>

        <div class="accounts">
            <h4>Your Accounts:</h4>
            <div v-if="youtubeAccounts?.length === 0">
                <h3 >No accounts yet! :(<br>
                <small>Connect your first YouTube account in <router-link class="text-primary" to="/accounts">"Manage Accounts"</router-link> tab, <br>
                using instruction provided there </small>
                </h3>
            </div>
            
            <div class="accounts-list" v-else>
                <router-link to="/accounts" v-for="account in getYoutubeAccountsPreview" :key="account._id">
                    <AccountComponent :account="account"/>
                </router-link>
            </div>
        </div>

        <div class="last-shorts">
            <h4>Last shorts:</h4>
            <div v-if="!shorts?.shorts || shorts?.shorts?.length === 0">
                <h3 >No shorts yet! :(</h3>
            </div>
            <div class="last-shorts-list" v-else>
                <ShortComponent v-for="short in shorts.shorts" :key="short._id" :short="short"/>
                <BtnComponent style="text-align: center; margin: 0 auto;" class="loadmore" type="primary" text="Load More" @click="getData(shorts?.pagination?.page + 1)" v-if="shorts?.pagination?.page < shorts?.pagination?.totalPages"/>
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

import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'DashboardView',
    components: {
        ProfileNavigation,
        AccountComponent,
        BtnComponent,
        ShortComponent,
    },
    data() {
        return {
            shorts: [],
        }
    },
    methods: {
        ...mapActions(['getYoutubeAccounts']),
        shortenId(id) {
            return id.slice(-5)
        },
        getData(page = 1) {
            axios.get(`youtube-accounts/`)
            .then(({ data }) => {
                this.youtubeAccounts = data
            }).catch(({ response: { data }}) => {
                console.log("🚀 ~ file: DashboardView.vue:87 ~ .then ~ data:", data)
                // happens when token is 'Bearer null', which means user is not authorized
                // if(data.name === 'JsonWebTokenError') {
                //     window.location.href = '/create-account'
                // }
                // this.$router.push('/')
            })

            axios.get(`users/shorts?page=` + page)
            .then(({ data }) => {
                this.shorts = data
            }).catch(({ response: { data }}) => {
                console.log("🚀 ~ file: DashboardView.vue:99 ~ .then ~ data:", data)
                // happens when token is 'Bearer null', which means user is not authorized
                // if(data.name === 'JsonWebTokenError') {
                //     window.location.href = '/create-account'
                // }
                // this.$router.push('/')
            })
        },
 
    },
    computed: {
        ...mapGetters({
            getYoutubeAccountsPreview: 'getYoutubeAccountsPreview', 
            getUser: 'user/getUser'
        }),
        getSubscriptionExpirationDate() {
            return moment(this.getUser.subscription?.expires).format('Do MMM YYYY')
        },
        getClosestNextUpload() {
            function padTo2Digits(num) {
                return num.toString().padStart(2, '0');
            }
            function convertMsToHM(milliseconds) {
                let seconds = Math.floor(milliseconds / 1000);
                let minutes = Math.floor(seconds / 60);
                let hours = Math.floor(minutes / 60);

                seconds = seconds % 60;
                // 👇️ if seconds are greater than 30, round minutes up (optional)
                minutes = seconds >= 30 ? minutes + 1 : minutes;

                minutes = minutes % 60;

                // 👇️ If you don't want to roll hours over, e.g. 24 to 00
                // 👇️ comment (or remove) the line below
                // commenting next line gets you `24:00:00` instead of `00:00:00`
                // or `36:15:31` instead of `12:15:31`, etc.
                // hours = hours % 24;

                return {
                    hours: padTo2Digits(hours),
                    minutes: padTo2Digits(minutes)
                };
            }
            let closest = {
                account: null,
                date: null,
                ms: null
            }

            let now = moment(new Date())
            
            for(let account of this.youtubeAccounts) {
                let uploadTime = moment(account.last_upload)
    
                let timePassed = moment.duration(now.diff(uploadTime))
                let uploadInterval = account.settings.uploadInterval*60*60*1000; // in milliseconds
    
                if(uploadInterval - timePassed._milliseconds <= 0) {
                    return {
                        account: account._id,
                        date: {
                            hours: 0,
                            minutes: 'less than 30'
                        },
                        ms: null
                    }
                }
                
                let nextUpload = uploadInterval - timePassed._milliseconds
                // console.log("🚀 ~ file: DashboardView.vue:164 ~ this.youtubeAccounts.forEach ~ account: account._id:", account._id)
                // console.log("🚀 ~ file: DashboardView.vue:159 ~ this.youtubeAccounts.forEach ~ convertMsToHM(nextUpload):", convertMsToHM(nextUpload))
    
                if(nextUpload < closest.ms || closest.ms === null) {
    
                    closest = {
                        account: account._id,
                        date: convertMsToHM(nextUpload),
                        ms: nextUpload
                    }
    
                }
                
            }
            return closest
            
        }
    },  
    async mounted() {
        
        await this.getYoutubeAccounts()

        // if(this.$props.user?.confirmation?.status === false) {
        //     // window.location.href = '/confirm-account'
        // }
        

        // if(!this.$props.user) {
        //     // window.location.href = '/create-account'
        // }
        
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

    @media(max-width: 1200px) {
        .dashboard {

            & .last-shorts {
                    &-list {
                        & > * {
                            width: 100%;
                        }
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