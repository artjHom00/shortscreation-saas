<template lang="">
    <Transition>
        <NotificationComponent :type="notification.type" :message="notification.message" v-if="notification.show"/>
    </Transition>
    <div class="container">
        <div class="create">
            <h3>Create account</h3>
            <div class="form">
                <InputComponent label="Username" placeholder="Enter your username" v-model="username"/>
                <InputComponent label="Email" placeholder="Enter your email address" v-model="email"/>
                <InputComponent label="Password" password="true" placeholder="*********" v-model="password"/>
                <InputComponent label="Repeat password" password="true" placeholder="*********" v-model="repeatPassword"/>
                <!-- <InputComponent label="What’s the use of this script?" placeholder="-" v-model="useOfTheScript"/> -->
            </div>
            <!-- <div class="options"> -->
                <!-- <div>
                    <input type="checkbox" id="subscribe"/>
                    <label for="subscribe">Subscribe to latest news / releases</label>
                </div> -->
                <!-- <router-link to="/" class="text-primary">Forgot Your Password?</router-link> -->
            <!-- </div> -->
            <BtnComponent type="primary" text="Create" @click="createUser()"/>
            <p>Already have an account? <router-link to="/sign-in" class="text-primary">Sign in!</router-link></p>
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
            username: null, 
            email: null, 
            password: null,
            repeatPassword: null,
            // useOfTheScript: null,
            notification: {
                show: false,
                type: null,
                message: null
            }
        }
    },
    methods: {
        createUser() {
            if(this.password === this.repeatPassword) {

                axios.post('users/', {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    refferal: this.$cookies.get('ref')
                }).then(({ data }) => {
    
                    this.$cookies.set('jwt_token', data.jwt_token)
                    this.showNotification('success', 'Account created, redirecting')
    
                    setTimeout(() => {
                        window.location.href = '/confirm-account'
                    }, 1000)
    
                }).catch(({ response: { data }}) => {
                    this.showNotification('fail', data.error)                
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