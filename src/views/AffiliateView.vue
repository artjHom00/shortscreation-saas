<template lang="">
    <Transition>
        <NotificationComponent :type="notification.type" :message="notification.message" v-if="notification.show"/>
    </Transition>
    <div class="dashboard container">
        <ProfileNavigation :user="user"/>
        <h2>Affiliate Program</h2>
        <p>* Here you can get your affiliate link & withdraw earnings<br>
            Withdrawals proceed manually, contact us to withdraw. <br>
            Withdrawal available on <b>USDT, TRC20</b>
        </p>
        <div class="affiliate">

            <div class="filled-section">
                <div class="filled-section-content">
                    <h4>Total Earned:</h4>
                    <h1>${{ getTotalEarnings }}</h1>
                    <h3>via {{ affiliateData?.affiliates?.length }} refferals</h3>
                </div>
                <div>
                    <Popper content="Copy link" class="action-btn" hover>
                        <BtnComponent type="primary" icon="dashboard/copy.svg" @click="copyLink"/>
                    </Popper>
                    <Popper content="Withdraw" class="action-btn" hover>
                        <a href="mailto:support@shortscreation.tech" target="_blank">
                            <BtnComponent type="primary" icon="dashboard/withdraw.svg"/>
                        </a>
                        <!-- @click="changeFormState()" -->
                    </Popper>
                </div>
            </div>
            <Transition>
                <div class="form" v-if="showForm">
                    <InputComponent label="Wallet" placeholder="Enter your USDT Wallet Address"/>
                    <InputComponent label="Amount" placeholder="Enter amount to withdraw"/>
                    <br>
                    <BtnComponent type="primary" text="Send request" />
                </div>
            </Transition>
            <div class="refferals">
                <h4>Your Refferals:</h4>
                <div v-if="affiliateData?.affiliates?.length === 0">
                    <h3 >No refferals yet! :( <br></h3>
                </div>
                <div class="refferal-list" v-else>
                    <RefferalComponent v-for="affiliate of affiliateData.affiliates" :key="affiliate._id" :affiliate="affiliate"/>
                </div>
                <BtnComponent class="loadmore" type="primary" text="Load More" @click="getData(affiliateData?.pagination?.page + 1)" v-if="affiliateData?.pagination?.page < affiliateData?.pagination?.totalPages"/>

            </div>

        </div>

    </div>
</template>
<script>
import ProfileNavigation from '@/components/dashboard/ProfileNavigation.vue';
import RefferalComponent from '@/components/dashboard/RefferalComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import BtnComponent from '@/components/BtnComponent.vue';
import NotificationComponent from '@/components/NotificationComponent.vue';
import Popper from 'vue3-popper';

import axios from 'axios'

export default {
    name: 'AffiliateView',
    props: ['user'],
    data() {
        return {
            affiliateData: {},
            showForm: false,
            notification: {
                show: false,
                type: null,
                message: null
            }
        }
    },
    components: {
        ProfileNavigation,
        RefferalComponent,
        BtnComponent,
        InputComponent,
        NotificationComponent,
        Popper,
    },
    computed: {
        getTotalEarnings() {
            let affiliates = this.affiliateData?.affiliates
            let sum = 0

            if(affiliates) {
                affiliates.forEach(affiliate => {
                    let transactions = affiliate.transactions

                    transactions.forEach(transaction => {
                        sum += transaction.amount/10
                    })
                })
    
                return sum
            }

            return 0

        }
    },
    methods: {
        getData(page = 1) {
            axios.get('users/affiliates?page=' + page)
            .then(({ data }) => {
                this.affiliateData = data
            })
            .catch(() => {

            })
        },
        changeFormState() {
            this.showForm = !this.showForm
        },
        copyLink() {
            navigator.clipboard.writeText(this.$store.state.host + '?ref=' + this.$props.user._id)
            this.showNotification('success', 'Link copied!')
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
                margin-bottom: 30px;
                & > div {
                    width: 30%;
                }
            }
            & > button {
                text-align: center;
                margin: 0 auto;
                width: 200px;
            }
        }
        & .affiliate {
            position: relative;
            & .form {
                position: absolute;
                right: 0;
                z-index: 3;
                margin-top: -70px;
                height: fit-content;
                background: $white;
                border-radius: 15px;
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                padding: 30px 40px;
                width: 300px;
                margin-left: auto;
            }
            & .filled-section {
                position: relative;
                z-index: 5;
                width: calc(100% - 100px);
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: $fade-w-image;
                background-size: cover;
                padding: 40px 50px;
                border-radius: 15px;
                color: $white;
                & > div {
                    & .action-btn:last-child {
                        padding-left: 10px;
                    }
                    & > h1, & > h3,  & > h4 {
                        margin: 0;
                    }
                    & > h4 {
                        margin-bottom: 20px
                    }
                }
            }
            & > * {
                margin-bottom: 50px;
            }
            & .refferals {
                .loadmore {
                    margin: 0 auto;
                    width: 250px;
                }
            }
            & .refferal-list {
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
    @media(max-width: 1000px) {
        .dashboard {
            & .affiliate {
                & .refferal-list {
                    & > * {
                        width: calc((100% - 50px))
                    }
                }
            }
        }
    }
    
    @media(max-width: 655px) {
        .dashboard {
            & .affiliate {
                & .form {
                    width: calc(100% - 80px);
                    & > button {
                        width: 100%;
                    }
                }
                & .filled-section {
                    flex-wrap: wrap;
                    & > div {
                        margin-bottom: 20px;
                        width: 100%;
                    }
                    & > button {
                        width: 100%;
                    }
                }
            }
            & .accounts {
                &-list {
                    & > * {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>