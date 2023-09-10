<template lang="">
    <Transition>
        <NotificationComponent :type="notification.type" :message="notification.message" v-if="notification.show"/>
    </Transition>
    <div class="container">

        <div class="create">
            <h3>Restore Your Password</h3>
            <div class="form">
                <InputComponent v-model="password" label="New Password" placeholder="*********"/>
                <InputComponent v-model="repeatPassword" label="Confirm password" placeholder="*********"/>
            </div>
            <BtnComponent type="primary" text="Update" @click="updatePassword"/>
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
            password: null,
            repeatPassword: null,
            notification: {
                show: false,
                type: null,
                message: null
            },
        }
    },
    methods: {
        updatePassword() {

            if(this.password && this.password === this.repeatPassword) {
                axios.patch('users/me', {
                    password: this.password
                }).then(() => {
                    this.showNotification('success', 'Password succesfully changed! Authorize now')
                    setTimeout(() => {
                        window.location.href = '/sign-in'
                    }, 3000)
                }).catch(() => {
                    this.showNotification('fail', 'Failed updating password! Redirecting...')

                    setTimeout(() => {
                        window.location.href = '/'
                    }, 3000)
                })
            } else {
                this.showNotification('fail', "Passwords don't match!")
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
        
        if(this.$route.query?.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.$route.query?.token}`
        } else {
            window.location.href = '/'
        }

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