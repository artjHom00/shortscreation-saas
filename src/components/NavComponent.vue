<template lang="">
    <nav class="nav">
        <div>
            <router-link to="/">
                <span class="nav_langChange">EN</span>
            </router-link>
        </div>
        <div>
            <router-link to="/">
                <img width="120" src="../assets/shortscreation.svg" alt="">
            </router-link>
        </div>
        <div>
            <router-link to="/sign-in">
                <btnComponent/>
            </router-link>
        </div>
    </nav>
</template>

<script>
import btnComponent from '@/components/BtnComponent.vue' 

export default {
    name: 'NavComponent',
    components: {
        btnComponent
    }
}
</script>

<style scoped lang="scss">
    @import '../assets/styles/_variables.scss';
    .nav {
        // tmp
        margin:0 100px;
        
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        a {
            text-decoration: none !important;
        }
        
        & > div {
            width: auto;
            text-align: center;
        }
        &_langChange {
            border-radius: 15px;
            border: 3px solid $dark;
            color: $dark;
            font-size: 12px;
            display:flex;
            justify-content: center;
            align-items: center;
            
            // -3px by border
            height: 40px;
            width: 40px;

            font-weight: 900;
            text-decoration: none;
        }
    }
</style>