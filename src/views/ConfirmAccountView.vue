<template lang="">
    <Transition>
        <NotificationComponent :type="notification.type" :message="notification.message" v-if="notification.show"/>
    </Transition>
    <div class="container">

        <div class="create">
            <h3>Confirm Your Email</h3>
            <p>Confirmation code has been sent to your email address. Enter confirmation code from a mail.</p>
            <div class="form">
                <InputComponent label="Code" placeholder="Enter your confirmation code" v-model="code"/>
            </div>
            <BtnComponent type="primary" text="Verify" @click="confirmAccount()"/>
            <p>Don't see a code? 
                <span class="resend text-primary" @click="resendConfirmation()" v-if="resendAvailable">Resend confirmation code</span>
                <span class="text-primary" v-else>Wait 15 seconds until resending...</span>
            
            </p>
        </div>
    </div>
</template>

<script>
import InputComponent from '@/components/InputComponent.vue'
import BtnComponent from '@/components/BtnComponent.vue'
import NotificationComponent from '@/components/NotificationComponent.vue'


import axios from 'axios'

export default {
    name: 'CreateAccountView',
    components: {
        InputComponent,
        BtnComponent,
        NotificationComponent,
    },
    props: ['user'],
    data() {
        return {
            code: null,
            notification: {
                show: false,
                type: null,
                message: null
            },
            resendAvailable: true
        }
    },
    methods: {
        confirmAccount() {
            axios.post('users/confirm', {
                code: this.code
            }).then(() => {
            this.showNotification('success', 'Email confirmed, redirecting...')
            
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 1000)

            }).catch(({ response: { data }}) => {
            this.showNotification('fail', data.error)

            })
        },
        resendConfirmation() {
            axios.post('users/resend')
            .then(() => {
            this.showNotification('success', 'Message has been resent!')
            }).catch(({ response: { data }}) => {
            this.showNotification('fail', data.error)
            }).finally(() => {
                this.resendAvailable = false

                setTimeout(() => {
                    this.resendAvailable = true
                }, 15000)
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

        if(this.$props.user?.confirmation?.status === true) {
            window.location.href = '/dashboard'
        }
        

    },
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';

    .create {
        max-width: 500px;
        display: block;
        margin: 0 auto;
        margin-top: 80px;
        border-radius: 30px;
        padding: 30px 50px;
        background: $white;
        & label {
            opacity: 0.75;
            margin-left: 12px;
        }
        & > * {
            margin-bottom: 40px;
        }
        & > h3, & > p {
            text-align: center;
        }
        & > .form {
            & > * {
                margin: 25px 0;
            }
        }
        & .resend {
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
        & > .options {
            display: flex;
            justify-content: space-between;
        }
        & button {
            width: 100%;
        }
    }

    @media(max-width: 750px) {
        .create {
            padding: 30px;
        }
    }
</style>