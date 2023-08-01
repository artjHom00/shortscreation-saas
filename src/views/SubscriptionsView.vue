<template lang="">
    <div class="subscriptions container">
        <ProfileNavigation :user="user"/>
        <h2>Buy a Subscription</h2>
        <p>* Here you can purchase a subscription to our service & start making content. <br>
<b>Note:</b> Yearly subscriptions off price</p>
        
        <div class="subscriptions-buttons">
            <BtnComponent text="Monthly" :type="activeSection === 'monthly' ? 'primary' : 'dark'" @click="activeSection = 'monthly'"/>    
            <BtnComponent text="Yearly (Discount)" :type="activeSection === 'yearly' ? 'primary' : 'dark'" @click="activeSection = 'yearly'"/>    
        </div>

        <div class="subscriptions-elements">
            <subscriptionComponent v-for="(subscription, index) of subscriptions[activeSection]" :key="index" :type="subscription.type" :videos="subscription.videos" :accounts="subscription.accounts" :name="subscription.name" :price="subscription.price" :videoCost="subscription.videoCost" :discount="activeSection === 'yearly'" :oldPrice="(subscriptions['monthly'][index].price*12).toFixed(2)" :disabled="user.subscription?.has_subscription && index <= getUserSubscriptionLevel" action="Purchase"/>
            <!-- <subscriptionComponent type="primary" videos="1-4" accounts="3" name="Premium" price="39.99" videoCost="$0.11" action="Purchase"/>
            <subscriptionComponent type="dark" videos="1-8" accounts="5" name="Ultimate" price="69.99" videoCost="$0.06" action="Purchase"/> -->
        </div>
    </div>
</template>
<script>
import ProfileNavigation from '@/components/dashboard/ProfileNavigation.vue';
import BtnComponent from '@/components/BtnComponent.vue';
import subscriptionComponent from '@/components/SubscriptionComponent.vue'; 

import axios from 'axios';


export default {
    name: 'SubscriptionsView',
    props: ['user'],
    components: {
        ProfileNavigation,
        BtnComponent,
        subscriptionComponent
    },
    data() {
        return {
            activeSection: 'monthly',
            subscriptions: {
                monthly: [
                    {
                        type: 'dark',
                        videos: '1-2',
                        accounts: '1',
                        name: 'Basic',
                        price: '24.99',
                        videoCost: '$0.42',
                    },
                    {
                        type: 'primary',
                        videos: '1-4',
                        accounts: '3',
                        name: 'Premium',
                        price: '39.99',
                        videoCost: '$0.11',
                    },
                    {
                        type: 'dark',
                        videos: '1-8',
                        accounts: '5',
                        name: 'Ultimate',
                        price: '69.99',
                        videoCost: '$0.06',
                    },
                ],
                yearly: [
                    {
                        type: 'dark',
                        videos: '1-2',
                        accounts: '1',
                        name: 'Basic',
                        price: '249.99',
                        videoCost: '$0.33',
                    },
                    {
                        type: 'primary',
                        videos: '1-4',
                        accounts: '3',
                        name: 'Premium',
                        price: '399.99',
                        videoCost: '$0.09',
                    },
                    {
                        type: 'dark',
                        videos: '1-8',
                        accounts: '5',
                        name: 'Ultimate',
                        price: '699.99',
                        videoCost: '$0.04',
                    },
                ]
            },
        }
    },
    computed: {
        getUserSubscriptionLevel() {
            let usersSubscriptionType = this.$props.user?.subscription?.type

            if(usersSubscriptionType) {

                for(let i = 0; i < this.subscriptions[this.activeSection].length; i++) {
                    if(this.subscriptions[this.activeSection][i].name === this.$props.user?.subscription?.type) return i
                }
            
            }
            return 0
        }
    },  
    mounted() {
        
        axios.defaults.baseURL = this.$store.state.host
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.$cookies.get('jwt_token')}`
        
        if(this.$props.user?.confirmation?.status === false) {
            window.location.href = '/confirm-account'
        }
        
    }
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';

    .subscriptions {
        & > p {
            margin-bottom: 40px;
            opacity: 0.75;
        }

        h2 {
            margin-top: 50px;
            margin-bottom: 0;
        }
        &-buttons {
            margin-top: 60px;
            display: flex;
            & > * {
                margin-right: 15px;
            }
        }
        &-elements {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            & > * {
                height: fit-content;
            }
        }
    }
    
    @media(max-width: 1200px) {
    }
</style>