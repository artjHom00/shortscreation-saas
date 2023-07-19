<template lang="">
    <div class="profile-nav">
        <div>
            <Popper content="Log out" hover>
            <a class="logout" @click="logout()"><img src="@/assets/images/dashboard/logout.svg" alt=""></a>
            </Popper>
        </div>
        <Popper v-for="(button, index) in buttons" :key="index"  :content="button.tooltip" hover>
            <router-link :to="button.url">
                    <BtnComponent class="nav-btn" :type="getButtonType(index)" :icon="button.icon" @click="setPrimary(index)" v-if="!button.subscriptionRequired || this.$props.user?.subscription?.has_subscription"/>
            </router-link>
        </Popper>
    </div>
</template>
<script>
import BtnComponent from '@/components/BtnComponent.vue' 
import Popper from 'vue3-popper';

export default {
    name: 'ProfileNavigation',
    props: ['user'],
    components: {
        BtnComponent,
        Popper
    },
    data() {
        return {
            buttons: [
                {
                    'url': '/dashboard',
                    'icon': 'dashboard/home.svg',
                    'subscriptionRequired': false,
                    'tooltip': 'Dashboard'
                },
                {
                    'url': '/create-content',
                    'icon': 'dashboard/plus.svg',
                    'subscriptionRequired': true,
                    'tooltip': 'Content Creation Settings'
                },
                {
                    'url': '/accounts',
                    'icon': 'dashboard/accounts.svg',
                    'subscriptionRequired': false,
                    'tooltip': 'Manage Accounts'
                },
                {
                    'url': '/affiliate',
                    'icon': 'dashboard/refferals.svg',
                    'subscriptionRequired': false,
                    'tooltip': 'Affiliate'
                },
        ]
        }
    },
    mounted() {
        this.buttons.map((button) => {
            button.type = 'dark'

            if(button.url === this.$route.fullPath) button.type = 'primary'
            
            return button
        })

    },
    methods: {
        setPrimary(index) {
            this.buttons.map(button => {
                if(button.type === 'primary') {
                    button.type = 'dark'
                }

                return button
            })

            this.buttons[index].type = 'primary'
            
        },
        getButtonType(index) {
            return this.buttons[index].type
        },
        logout() {
            this.$cookies.remove('jwt_token')

            window.location.href = '/'
        }
    }
}
</script>
<style lang="scss">
    .profile-nav {
        width: 100%;
        margin-top: 40px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        & .logout {
            cursor: pointer;
            & > img {
                width: 30px;
            }
        }
        .nav-btn {
            margin: 0 25px;
            width: 30px;
            height: 60px;
        }
        & > * > * > * {
            margin: 0 25px;
        }
    }
    @media(max-width: 750px) {
        .profile-nav {
            
            .nav-btn {
                height: initial;
                margin: 0 15px;
            }
            & > * > * > * {
                margin: 0 10px;
            }
            & .logout > img {
                width: 25px;
                height: 20px;
            }
        }
    }
</style>