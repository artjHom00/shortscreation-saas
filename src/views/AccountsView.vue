<template lang="">
    <div class="dashboard container">
        <ProfileNavigation/>
        <h2>Account</h2>

        <div class="accounts">

            <btnComponent type="primary" text="Add New Account" @click="changeStateOfForm"/>

            
            <div class="add-account" v-if="showForm">

                <div class="add-account-form">
                    <inputComponent label="Email" placeholder="Email"/>
                    <inputComponent label="Password" placeholder="*********"/>
                    <inputComponent label="Recovery Email (if nedeed)" placeholder="Recovery email"/>
                </div>
                <btnComponent type="primary" text="Save"/>

            </div>

            <div>

                <h4>Your Accounts:</h4>
                <div class="accounts-list">
                    <AccountComponent/>
                    <AccountComponent/>
                    <AccountComponent/>
                    <AccountComponent/>
                </div>

            </div>

        </div>

    </div>
</template>
<script>
import ProfileNavigation from '@/components/dashboard/ProfileNavigation.vue';
import AccountComponent from '@/components/dashboard/AccountComponent.vue';
import inputComponent from '@/components/InputComponent.vue';
import btnComponent from '@/components/BtnComponent.vue';

export default {
    name: 'DashboardView',
    data() {
        return {
            showForm: false
        }
    },
    methods: {
        changeStateOfForm() {
            this.showForm = !this.showForm
        }
    },
    components: {
        ProfileNavigation,
        AccountComponent,
        btnComponent,
        inputComponent
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
        & .accounts {
            & > * {
                margin-bottom: 50px;
            }
            &-list {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                & > * {
                    margin-bottom: 20px;
                    width: calc(25% - 70px);
                }
            }
        }
    }
    @media(max-width: 796px) {
        .dashboard {
            &  .accounts {
                & > button {
                    width: 100%;
                }
                & .add-account {
                    &-form {
                        flex-wrap: wrap;
                        & > div {
                            width: 100%;
                        }

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