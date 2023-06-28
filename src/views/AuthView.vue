<template lang="">
    <div class="container">

        <div class="auth">
            <h3>Hello!</h3>
            <div class="form">
                <InputComponent label="Email" placeholder="Enter your email address"/>
                <InputComponent label="Password" placeholder="*********"/>
            </div>
            <div class="options">
                <div>
                    <input type="checkbox" id="rememberMe"/>
                    <label for="rememberMe">Remember me</label>
                </div>
                <router-link to="/" class="text-primary" style="text-align:right">Forgot Your Password?</router-link>
            </div>
            <btnComponent type="primary" text="Log In"/>
            <p>Don’t have an account? <router-link to="/create-account" class="text-primary">Create an account!</router-link></p>
        </div>
    </div>
</template>

<script>
import InputComponent from '@/components/InputComponent.vue'
import BtnComponent from '@/components/BtnComponent.vue'

export default {
    name: 'AuthView',
    components: {
        InputComponent,
        BtnComponent
    }
}
</script>
<style scoped lang="scss">
    @import '../assets/styles/_variables.scss';

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
        }
    }
</style>