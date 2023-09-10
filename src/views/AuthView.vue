<template lang="">
    <Transition>
        <NotificationComponent :type="notification.type" :message="notification.message" v-if="notification.show"/>
    </Transition>
    <div class="container">

        <div class="auth">
            <h3>Hello!</h3>
            <div class="form">
                <InputComponent label="Email" v-model="email" placeholder="Enter your email address"/>
                <InputComponent label="Password" password="true" v-model="password" placeholder="*********"/>
            </div>
            <div class="options">
                <div>
                    <!-- <input type="checkbox" id="rememberMe"/>
                    <label for="rememberMe">Remember me</label> -->
                </div>
                <router-link style="text-align:right" to="/forgot-password"><span class="text-primary forgot">Forgot Your Password?</span></router-link>
            </div>
            <!-- <router-link to="/dashboard" class="no-decoration"> -->
                <BtnComponent type="primary" text="Log In" @click="authUser"/>
            <!-- </router-link> -->
            <p>Don’t have an account? <router-link to="/create-account" class="text-primary">Create an account!</router-link></p>
        </div>
    </div>
</template>

<script>
import InputComponent from '@/components/InputComponent.vue'
import BtnComponent from '@/components/BtnComponent.vue'
import NotificationComponent from '@/components/NotificationComponent.vue'

import axios from 'axios';

export default {
    name: 'AuthView',
    data() {
        return {
            email: null, 
            password: null,
            notification: {
                show: false,
                type: null,
                message: null
            }
        }
    },
    components: {
        InputComponent,
        BtnComponent,
        NotificationComponent
    },
    methods: {
        authUser() {
            axios.post('users/auth', {
                email: this.email,
                password: this.password
            }).then(({ data }) => {
                
                this.$cookies.set('jwt_token', data.jwt_token)
                this.showNotification('success', 'You’re authorized, redirecting')
                if(data.confirmation.status === false) {
                    setTimeout(() => {
                        window.location.href = '/confirm-account'
                    }, 1000)
                } else {
                    
                    setTimeout(() => {
                        window.location.href = '/dashboard'
                    }, 1000)

                }


            }).catch(({ response: { data }}) => {
                console.log("🚀 ~ file: AuthView.vue:59 ~ authUser ~ data:", data)
                this.showNotification('fail', data.error)                
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
            }, 1000)

        }
    },
    mounted() {
        axios.defaults.baseURL = this.$store.state.host
    }
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';

    .auth {
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
        & .forgot {
            text-align:right;
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
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
            & > div {
                width: 50%;
            }
        }
        & button {
            width: 100%;
        }
    }
    
    @media(max-width: 750px) {
        .auth {
            padding: 30px;
            & label {
                margin-left: 5px;
            }
            & > .options {
                & > * {
                    width: 50%;
                }
            }
        }
    }
</style>