<template lang="">
    <div class="dashboard container">
        <ProfileNavigation :user="user"/>
        <h2>Dashboard</h2>
        <div class="filled-section">
            <div class="filled-section-content" v-if="user?.subscription?.has_subscription === false">
                <h4>Your Subscription:</h4>
                <h1>No Subscription</h1>
                <br>
                <BtnComponent type="primary" text="Buy subscription"/>
            </div>
            <div class="filled-section-content" v-else>
                <h4>Your Subscription:</h4>
                <h1>{{ user?.subscription?.type }} Plan</h1>
                <h3>27 days left</h3>
            </div>
        </div>

        <div class="accounts">
            <h4>Your Accounts:</h4>
            <div class="accounts-list">
                <AccountComponent v-for="account in youtubeAccounts" :key="account._id" :account="account"/>
            </div>
        </div>

        <div class="last-shorts">
            <h4>Last shorts:</h4>
            <div class="last-shorts-list">
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
            user: {},
            youtubeAccounts: [],
            shorts: [],
        }
    },
    methods: {
        getData() {
            axios.get('users/me')
            .then(({ data }) => {
                this.user = data
              
                axios.get(`youtube-accounts/${this.user.id}`)
                .then(({ data }) => {
                    this.youtubeAccounts = data
                }).catch(({ response: { data }}) => {
                    console.log("🚀 ~ file: DashboardView.vue:62 ~ .then ~ data:", data.error)
                    // this.$router.push('/')
                })

                axios.get(`users/shorts/${this.user.id}`)
                .then(({ data }) => {
                    this.shorts = data
                }).catch(({ response: { data }}) => {
                    console.log("🚀 ~ file: DashboardView.vue:62 ~ .then ~ data:", data.error)
                    // this.$router.push('/')
                })

            }).catch(({ response: { data }}) => {
                console.log("🚀 ~ file: DashboardView.vue:62 ~ .then ~ data:", data.error)
                this.$router.push('/')
            })
        },
 
    },
    beforeMount() {
        
        axios.defaults.baseURL = this.$store.state.host
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.$cookies.get('jwt_token')}`
        
        this.getData()
    }
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';

    .dashboard {
        & > * {
            margin-bottom: 30px;
        }
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
                    // margin-right: 20px;
                    margin-bottom: 20px;
                    width: calc(50% - 70px);
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
            & .last-shorts {
                &-list {
                    & > * {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>