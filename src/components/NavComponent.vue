<template lang="">
    <nav class="nav container">
        <div>
            <a href="mailto:support@shortscreation.tech" target="_blank" class="no-decoration">
                <Popper content="Contact Us" hover>
                    <span class="nav_langChange"><img src="../assets/images/support.svg" alt=""></span>
                </Popper>
            </a>
        </div>
        <div>
            <router-link to="/" class="no-decoration">
                <img width="120" src="../assets/images/logo.svg" alt="">
            </router-link>
        </div>
        <div>
            <router-link to="/sign-in" class="no-decoration" v-if="!getUser?.id">
                <btnComponent class="pc" icon="person.svg" text="Sign In" type="dark"/>
                <btnComponent class="mobile" icon="person.svg" type="dark"/>
            </router-link>
            <router-link to="/dashboard" class="no-decoration" v-else>
                <btnComponent class="pc" icon="person.svg" type="primary"/>
                <btnComponent class="mobile" icon="person.svg" type="primary"/>
            </router-link>

        </div>
    </nav>
</template>

<script>
import btnComponent from '@/components/BtnComponent.vue' 
import Popper from 'vue3-popper';
// import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'NavComponent',
    computed: mapGetters({
        getUser: 'user/getUser'
    }),
    components: {
        btnComponent,
        Popper
    },
    mounted() {
        
    }

}
</script>

<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';
    .nav {
        margin-top: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > div {
            min-width: 100px;
            text-align: center;
        }
        button {
            height: 43px;
            &.mobile {
                display: none;
            }
        }
        &_langChange {
            border-radius: 15px;
            border: 2px solid $dark;
            color: $dark;
            font-size: 12px;
            display:flex;
            justify-content: center;
            align-items: center;
            position: relative;
            top: 0;
            // -3px by border
            height: 40px;
            width: 40px;

            font-weight: 900;
            text-decoration: none;
            
            transition: 0.2s all ease-in-out;
            &:hover {
                top: -2px;
            }
        }
        
    }
    @media(max-width: 750px) {
        .nav {
            & > div {
                min-width: 0px;
            }
            & img {
                width: 80px;
            }
            & button {
                height: 34px;
                width: 34px;
                border-radius: 10px;
                // border: 2px solid $dark;
                padding: 0;
                &.pc {
                    display: none;
                }
                &.mobile {
                    display: block;
                }
            }
            
            &_langChange {
                font-weight: 700;
                border-radius: 10px;
                border: 1.4px solid $dark;
                height: 30px;
                width: 30px;
                & > img {
                    width: 15px
                }
            }
        }
    }
</style>