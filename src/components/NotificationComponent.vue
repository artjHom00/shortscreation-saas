<template>
    <div class="notification" :class="type">
        <div class="notification-wrapper">
            <img :src="getIcon" alt="">
            <div class="notification-wrapper--text">
                <h4>{{ type }}!</h4>
                <p>{{ message }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NotificationComponent',
        props: ['type', 'message'],
        computed: {
            getIcon() {
                return require(`@/assets/images/notification/${this.$props.type}.svg`)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';

    .notification {
        position: fixed;
        right: 0px;
        top: 150px;
        color: $white;
        z-index: 300000;
        padding: 15px 20px;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        min-width: 300px;
        &.success {
            background: $primary;
        }
        &.fail {
            background: $dark;
        }
        &-wrapper {
            display: flex;
            &--text {
                margin-left: 30px;
                & > * {
                    margin: 0;
                }
                text-transform: capitalize;
            }
        }
    }
</style>