<template lang="">
    <div class="dashboard container">
        <ProfileNavigation/>
        <h2>Let’s Set Up Your content!</h2>

        <div class="accounts">
            <h4>Select an account:</h4>
            <div class="accounts-list">
                <AccountComponent/>
                <AccountComponent/>
                <AccountComponent/>
                <AccountComponent/>
            </div>
            
            <div class="edit-account">
                <div class="edit-account-form">
                    <inputComponent label="TikTok Account" placeholder="Enter @uniqueid"/>
                    <inputComponent label="Background Video" placeholder="YouTube video URL"/>
                    <inputComponent label="Upload Interval" placeholder="Every 24h."/>
                </div>
                <btnComponent type="primary" text="Save"/>
            </div>
        </div>
        <div class="settings-forms">
            <div class="pinned">
                <h4>Pinned comment:</h4>
                <div class="pinned-form">
                    <div class="pinned-form-wrapper">
                        <inputComponent class="pinned-form--input" textarea="true" label="Enter a comment to pin under every video:" placeholder="Enter a comment..."/>
                                                
                        <div class="checkbox">
                            <input type="checkbox" id="useDefault"/>
                            <label for="useDefault"><small>Help us grow, use our default pinned comment</small></label>
                        </div>
                    </div>
                    <btnComponent type="primary" text="Save"/>
                </div>
            </div>
            <div class="title">
                <h4>Videos title:</h4>
                <div class="title-form">
                    <div class="title-form-wrapper">
                        <inputComponent class="title-form--input" textarea="true" label="Enter a title for every video" placeholder="Enter a title..."/>
                        
                        <div class="checkbox">
                            <input type="checkbox" id="useDefault"/>
                            <label for="useDefault"><small>Help us grow, use our default title</small></label>
                        </div>
                    </div>
                        
                    <btnComponent type="primary" text="Save"/>
                </div>
            </div>
            <div class="description">
                <h4>Videos descripion:</h4>
                <div class="description-form">
                    <div class="description-form-wrapper">
                        <inputComponent class="description-form--input" textarea="true" label="Enter a description for every video" placeholder="Enter a description..."/>
                                                
                        <div class="checkbox">
                            <input type="checkbox" id="useDefault"/>
                            <label for="useDefault"><small>Help us grow, use our default description</small></label>
                        </div>
                    </div>
                        
                    <btnComponent type="primary" text="Save"/>
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
                    margin-bottom: 20px;
                    width: calc(25% - 70px);
                }
            }
        }
        & .edit-account {
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

        .settings-forms {
            margin-top: 50px;
            display: flex;
            flex-wrap: wrap;
            & .pinned, .title, .description {
                width: calc(50% - 80px);
                margin: 0 auto;
                text-align: center;
                &-form {
                    border-radius: 15px;
                    text-align: center;
                    padding: 10px 40px 30px 40px;
                    background: $white;
                    // display: flex;
                    justify-content: center;
                    &-wrapper {
                        min-height: 210px;
                        width: 100%;
                        align-self: center;
                        margin-bottom: 15px;
                    }
                    & .checkbox {
                        text-align: left;
                    }
                    &--input {
                        text-align: initial;
                        max-width: 500px;
                        margin: 0 auto;
                        margin-bottom: 20px;
                    }
                    & button {
                        margin-top: 20px;
                        margin: 0 auto;
                        width: 200px;
                    }
                }
            }
        }
    }

    @media(max-width: 796px) {
        .dashboard {
            & .accounts {
                & .edit-account {
                    &-form {
                        flex-wrap: wrap;
                        & > div {
                            width: 100%;
                        }

                    }
                }
            }
            & .settings-forms {
                & .pinned, .title {
                    width: 100%;
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