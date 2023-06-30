<template lang="">
    <div class="container">

        <div class="create">
            <h3>Create account</h3>
            <div class="form">
                <InputComponent label="Username" placeholder="Enter your username"/>
                <InputComponent label="Email" placeholder="Enter your email address"/>
                <InputComponent label="Password" placeholder="*********"/>
                <InputComponent label="Repeat password" placeholder="*********"/>
                <InputComponent label="What’s the use of this script?" placeholder="-"/>
            </div>
            <div class="options">
                <div>
                    <input type="checkbox" id="subscribe"/>
                    <label for="subscribe">Subscribe to latest news / releases</label>
                </div>
                <!-- <router-link to="/" class="text-primary">Forgot Your Password?</router-link> -->
            </div>
            <btnComponent type="primary" text="Log In"/>
            <p>Already have an account? <router-link to="/sign-in" class="text-primary">Sign in!</router-link></p>
        </div>
    </div>
</template>

<script>
import InputComponent from '@/components/InputComponent.vue'
import BtnComponent from '@/components/BtnComponent.vue'

export default {
    name: 'CreateAccountView',
    components: {
        InputComponent,
        BtnComponent
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