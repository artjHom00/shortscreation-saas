<template lang="">
    <div class="dashboard container">
        <ProfileNavigation :user="user"/>
        <h2>Affiliate Program</h2>

        <div class="affiliate">

            <div class="filled-section">
                <div class="filled-section-content">
                    <h4>Total Earned:</h4>
                    <h1>${{ getTotalEarnings }}</h1>
                    <h3>via {{ affiliateData?.affiliates?.length }} refferals</h3>
                </div>
                <btnComponent type="primary" icon="dashboard/copy.svg"/>
            </div>
            
            <div class="refferals">
                <h4>Your Refferals:</h4>
                <div v-if="affiliateData?.affiliates?.length === 0">
                    <h3 >No refferals yet! :( <br></h3>
                </div>
                <div class="refferal-list" v-else>
                    <RefferalComponent v-for="affiliate of affiliateData.affiliates" :key="affiliate._id" :affiliate="affiliate"/>
                </div>
                <btnComponent class="loadmore" type="primary" text="Load More" @click="getData(affiliateData?.pagination?.page + 1)" v-if="affiliateData?.pagination?.page < affiliateData?.pagination?.totalPages"/>

            </div>

        </div>

    </div>
</template>
<script>
import ProfileNavigation from '@/components/dashboard/ProfileNavigation.vue';
import RefferalComponent from '@/components/dashboard/RefferalComponent.vue';
import btnComponent from '@/components/BtnComponent.vue';

import axios from 'axios'

export default {
    name: 'AffiliateView',
    props: ['user'],
    data() {
        return {
            affiliateData: {}
        }
    },
    components: {
        ProfileNavigation,
        RefferalComponent,
        btnComponent,
    },
    computed: {
        getTotalEarnings() {
            let affiliates = this.affiliateData?.affiliates
            let sum = 0

            if(affiliates) {
                affiliates.forEach(affiliate => {
                    let transactions = affiliate.transactions

                    transactions.forEach(transaction => {
                        sum += transaction.amount
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
                console.log("🚀 ~ file: AffiliateView.vue:53 ~ .then ~ data:", data)
                this.affiliateData = data
            })
            .catch(() => {

            })
        },
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
            & .filled-section {
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