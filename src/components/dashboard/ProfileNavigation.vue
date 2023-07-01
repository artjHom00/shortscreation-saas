<template lang="">
    <div class="profile-nav">
        <div>
            <router-link to="/dashboard"><img src="@/assets/images/dashboard/logout.svg" alt=""></router-link>
        </div>
        <router-link v-for="(button, index) in buttons" :key="index" :to="button.url">
            <BtnComponent :type="getButtonType(index)" :icon="button.icon" @click="setPrimary(index)"/>
        </router-link>
    </div>
</template>
<script>
import BtnComponent from '@/components/BtnComponent.vue' 

export default {
    name: 'ProfileNavigation',
    components: {
        BtnComponent
    },
    data() {
        return {
            buttons: [
                {
                    'url': '/dashboard',
                    'icon': 'dashboard/home.svg',
                },
                {
                    'url': '/create-content',
                    'icon': 'dashboard/plus.svg',
                },
                {
                    'url': '/accounts',
                    'icon': 'dashboard/accounts.svg',
                },
                {
                    'url': '/affiliate',
                    'icon': 'dashboard/refferals.svg',
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
        & > * > * {
            margin: 0 25px;
            width: 30px;
            height: 30px;
        }
    }
    @media(max-width: 750px) {
        .profile-nav {
            
            & > * > button {
                height: initial;
            }
            & > * > * {
                margin: 0 10px;
            }
            & > * > a > img {
                width: 25px;
                height: 34px;
            }
        }
    }
</style>