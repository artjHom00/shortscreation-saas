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
                <btnComponent :type="type" :text="action" v-if="!disabled"/>
            </div>
        </div>
        
    </div>
</template>
<script>
import btnComponent from '@/components/BtnComponent.vue'; 

export default {
    name: 'SubscriptionComponent',
    components: {
        btnComponent
    },
    props: ['type', 'name', 'price', 'accounts', 'videos', 'videoCost', 'action', 'discount', 'oldPrice', 'disabled'],
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
            width: 80%;
        }
    }
</style>