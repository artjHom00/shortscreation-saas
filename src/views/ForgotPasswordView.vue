<template lang="">
    <Transition>
        <NotificationComponent :type="notification.type" :message="notification.message" v-if="notification.show"/>
    </Transition>
    <div class="container">

        <div class="create">
            <h3>Restore Your Password</h3>
            <div class="form">
                <InputComponent v-model="email" label="Email" placeholder="Enter your email address"/>
            </div>
            <BtnComponent type="primary" text="Restore" @click="sendRequest()"/>
            <p>Remembered password? <router-link to="/sign-in" class="text-primary">Sign in!</router-link></p>
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
        NotificationComponent
    },
    data() {
        return {
            email: null,
            notification: {
                show: false,
                type: null,
                message: null
            },
        }
    },
    methods: {
        async sendRequest() {
            if(this.email) {
                axios.post('/users/forgot-password', {
                    email: this.email
                }).then(() => {
                    this.showNotification('success', 'Restoring password link has been sent to your email!')
                }).catch(() => {
                    this.showNotification('fail', 'Error occured while restoring password!')
                })
            }
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

        // this.isJWTValid
    }
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