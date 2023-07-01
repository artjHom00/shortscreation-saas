<template lang="">
    <div class="dashboard container">
        <ProfileNavigation/>
        <h2>Affiliate Program</h2>

        <div class="affiliate">

            <div class="filled-section">
                <div class="filled-section-content">
                    <h4>Total Earned:</h4>
                    <h1>$35.00</h1>
                    <h3>via 5 refferals</h3>
                </div>
                <btnComponent type="primary" icon="dashboard/copy.svg"/>
            </div>
            
            <div class="refferals">
                <h4>Your Refferals:</h4>
                <div class="refferal-list">
                    <RefferalComponent/>
                    <RefferalComponent/>
                    <RefferalComponent/>
                    <RefferalComponent/>
                    <RefferalComponent/>
                </div>
                <btnComponent class="loadmore" type="primary" text="Load More"/>

            </div>

        </div>

    </div>
</template>
<script>
import ProfileNavigation from '@/components/dashboard/ProfileNavigation.vue';
import RefferalComponent from '@/components/dashboard/RefferalComponent.vue';
import btnComponent from '@/components/BtnComponent.vue';

export default {
    name: 'DashboardView',
    components: {
        ProfileNavigation,
        RefferalComponent,
        btnComponent,
    }
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';

    .dashboard {
        h2 {
            margin-bottom: 70px;
        }
        & .add-account {
            border-radius: 15px;
            background: $white;
            padding: 30px 50px;
            &-form {
                display:flex;
                justify-content: space-between;
                // flex-wrap: wrap;
                margin-bottom: 30px;
                & > div {
                    width: 30%;
                }
            }
            & > button {
                text-align: center;
                margin: 0 auto;
                width: 200px;
            }
        }
        & .affiliate {
            & .filled-section {
                width: calc(100% - 100px);
                display: flex;
                justify-content: space-between;
                align-items: center;
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
            & > * {
                margin-bottom: 50px;
            }
            & .refferals {
                .loadmore {
                    margin: 0 auto;
                    width: 250px;
                }
            }
            & .refferal-list {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                & > * {
                    margin-bottom: 20px;
                    width: calc(50% - 70px);
                }
            }
        }
    }
    @media(max-width: 1200px) {
        .dashboard {
            & .affiliate {
                & .refferal-list {
                    & > * {
                        width: calc((100% - 70px))
                    }
                }
            }
        }
    }
    
    @media(max-width: 655px) {
        .dashboard {
            & .affiliate {
                & .filled-section {
                    flex-wrap: wrap;
                    & > div {
                        margin-bottom: 20px;
                        width: 100%;
                    }
                    & > button {
                        width: 100%;
                    }
                }
            }
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