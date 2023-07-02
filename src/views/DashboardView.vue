<template lang="">
    <div class="dashboard container">
        <ProfileNavigation/>
        <h2>Dashboard</h2>
        <div class="filled-section">
            <div class="filled-section-content">
                <h4>Your Subscription:</h4>
                <h1>Basic Plan</h1>
                <h3>27 days left</h3>
            </div>
        </div>

        <div class="accounts">
            <h4>Your Accounts:</h4>
            <div class="accounts-list">
                <AccountComponent/>
                <AccountComponent/>
                <AccountComponent/>
                <AccountComponent/>
                <AccountComponent/>
                <AccountComponent/>
                <AccountComponent/>
                <AccountComponent/>
            </div>
        </div>

        <div class="last-shorts">
            <h4>Last shorts:</h4>
            <div class="last-shorts-list">
                <ShortComponent/>
                <ShortComponent/>
                <ShortComponent/>
                <ShortComponent/>
            </div>
        </div>
    </div>
</template>
<script>
import ProfileNavigation from '@/components/dashboard/ProfileNavigation.vue';
import AccountComponent from '@/components/dashboard/AccountComponent.vue';
import ShortComponent from '@/components/dashboard/ShortComponent.vue';

export default {
    name: 'DashboardView',
    components: {
        ProfileNavigation,
        AccountComponent,
        ShortComponent
    }
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';

    .dashboard {
        & > * {
            margin-bottom: 30px;
        }
        h2 {
            margin-bottom: 70px;
        }
        & .filled-section {
            width: calc(100% - 100px);
            background: $fade-w-image;
            background-size: cover;
            padding: 40px 50px;
            border-radius: 15px;
            color: $white;
            & > div {
                & > h1, & > h3,  & > h4 {
                    margin: 0;
                }
                & > h4 {
                    margin-bottom: 20px
                }
            }
        }
        & .accounts {
            &-list {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                & > * {
                    // margin-right: 20px;
                    margin-bottom: 20px;
                    width: calc(25% - 70px);
                }
            }
        }
        & .last-shorts {
            &-list {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                & > * {
                    margin-bottom: 20px;
                    width: calc(30% - 30px);
                }
            }
        }
    }
    
    @media(max-width: 680px) {
        .dashboard {
            & .last-shorts {
                &-list {
                    & > * {
                        width: 100%;
                    }
                }
            }
        }
    }

    @media(max-width: 655px) {
        .dashboard {
            & .accounts {
                &-list {
                    & > * {
                        width: 100%;
                    }
                }
            }
            
        }
    }
</style>