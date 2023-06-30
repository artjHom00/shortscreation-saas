<template lang="">
    <div class="profile-nav">
        <div>
            <img src="@/assets/images/dashboard/logout.svg" alt="">
        </div>
        <BtnComponent type="primary" icon="dashboard/home.svg"/>
        <BtnComponent type="dark" icon="dashboard/plus.svg"/>
        <BtnComponent type="dark" icon="dashboard/accounts.svg"/>
        <BtnComponent type="dark" icon="dashboard/refferals.svg"/>
    </div>
</template>
<script>
import BtnComponent from '@/components/BtnComponent.vue' 

export default {
    name: 'ProfileNavigation',
    components: {
        BtnComponent
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
        & > * {
            margin: 0 25px;
            width: 30px;
            height: 30px;
        }
    }
    @media(max-width: 750px) {
        .profile-nav {
            
            & > button {
                height: initial;
            }
            & > * {
                margin: 0 10px;
            }
            & > * > img {
                width: 25px;
                height: 34px;
            }
        }
    }
</style>