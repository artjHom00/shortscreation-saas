<template lang="">
    <div class="subscription" :class="[type, disabled ? 'disabled' : '']">
        <div class="subscription-header">
            <h3>{{ name }}</h3>
            
            <div>
                <h2 v-if="!discount">{{ price }} USDT</h2>
                <h2 v-else>
                    <small style="opacity: 0.75;"><s>{{ oldPrice }} USDT</s></small>
                    <br>
                    {{ price }} USDT
                </h2>
                <p>Per Month</p>
            </div>
        </div>

        <div class="subscription-content container">
            <div class="subscription-content--el">
                <h4>Number of accounts</h4>
                <h3>{{ accounts }} accounts</h3>
            </div>
            <div class="subscription-content--el">
                <h4>Consistency</h4>
                <h3>{{ videos }} videos / day</h3>
            </div>
            <div class="subscription-content--el">
                <h4>Cost per video</h4>
                <h3><small>{{ videoCost }}</small></h3>
            </div>
            <div class="subscription-content--el">
                <h4>Fully automated content</h4>
                <h3>
                    <img src="../assets/images/home/verified.svg" alt="">
                </h3>
            </div>
            <div>
                <router-link class="no-decoration" :to="link" v-if="!disabled && link">
                    <btnComponent :type="type" :text="action"/>
                </router-link>
                <btnComponent @click="getInvoiceLink" :type="type" :text="action" v-else-if="!disabled && getInvoice"/>
            </div>
        </div>
        
    </div>
</template>
<script>
import btnComponent from '@/components/BtnComponent.vue'; 
import axios from 'axios'

export default {
    name: 'SubscriptionComponent',
    components: {
        btnComponent
    },
    props: ['user', 'type', 'name', 'price', 'accounts', 'videos', 'videoCost', 'action', 'discount', 'oldPrice', 'disabled', 'link', 'getInvoice'],
    methods: {
        getInvoiceLink() {
            let orderId = this.$props.user?.email + Date.now()
            this.$emit('notification', {
                type: 'success',
                message: 'Creating payment, redirecting...'
            })
            axios.post('https://api.cryptocloud.plus/v1/invoice/create', {
                amount: this.$props.price,
                shop_id: 'zhyCwMMOKR0A9I0u',
                email: this.$props.user?.email,
                order_id: orderId
            }, {
                'headers': {
                    'Authorization': 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiTVRRMk9EUT0iLCJ0eXBlIjoicHJvamVjdCIsInYiOiJlMzQ5NzM1OWIyMjdiZGMwMDM3YWI2MGYzM2EwM2RhMDEzNGY5MGNjMmI0ZDg3MzM1YzEzOTJlYzdmMzdlMmMwIiwiZXhwIjo4ODA5MDg4MjU4OX0.14FJfVCWIFI0h_oWewOcFTzq5zvmaXU3PL-TAvTrQKI'
                }
            }).then(({ data: { status, pay_url } }) => {
                if(status === 'success') {
                    axios.post(this.$store.state.host + 'payment/create', {
                        user_id: this.$props.user._id,
                        type: this.$props.name,
                        order_id: orderId,
                        amount: this.$props.price 
                    }).then(() => {
                        
                        window.location.href = pay_url
                        console.log("🚀 ~ file: SubscriptionComponent.vue:67 ~ getInvoiceLink ~ pay_url:", pay_url)

                    }).catch((e) => {
                        console.log("🚀 ~ file: SubscriptionComponent.vue:85 ~ getInvoiceLink ~ e:", e)
                        this.$emit('notification', {
                            type: 'fail',
                            message: 'Error while creating transaction'
                        })
                    })
                }
            }).catch((e) => {
                console.log("🚀 ~ file: SubscriptionComponent.vue:92 ~ getInvoiceLink ~ e:", e)
                this.$emit('notification', {
                    type: 'fail',
                    message: 'Error while creating transaction'
                })
            })
        }
    }
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';
    
    .subscription {
        border-radius: 15px;
        margin-bottom: 30px !important;
        width: 30%;
        padding-bottom: 30px;
        &.primary {
            border: 2px solid $primary;
            .subscription-header {
                background: $primary-fade;
            }
        }
        &.dark {
            border: 2px solid $dark;
            .subscription-header {
                background: $dark-fade;
            }
            .subscription-content {
                &--el {
                    margin: 20px;
                }
            }
        }
        &-header {
            padding: 30px 50px;
            color: $gray-white;
            border-radius: 12px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            & > h3 {
                margin: 0;
            }
            & > div > h2 {
                margin-bottom: 0;
            }
            & > div > p {
                margin: 0;
            }
        }
        &-content {
            text-align: center;
            padding: 30px auto;
            &--el {
                margin: 40px 0;
                & > h3 {
                    margin-top: 0;
                }
                & > h4 {
                    margin-bottom: 10px;
                }
            }
            button {
                margin: 0 auto;
                width: 90%;
            }
        }
    }

    @media(max-width: 1200px) {
        .subscription {
            width: 100%;
        }
    }
</style>