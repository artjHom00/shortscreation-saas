<template lang="">
    <button :class="type">
        <span v-if="icon"><img :src="getIcon" width="20" alt=""></span>
        <span v-if="text" class="text">{{ text }}</span>
    </button>
</template>
<script>
export default {
    name: 'BtnComponent',
    props: ['icon', 'text', 'type'],
    computed: {
        getIcon: function() {
            return require('@/assets/images/' + this.$props.icon)
        }
    }
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';
    
    button {
        border: none;
        border-radius: 15px;
        text-align: center;
        color: #FFF;
        font-size: 14px;
        font-family: Inter;
        font-weight: 600;
        line-height: 80%;
        padding: 10px 30px;
        height: 55px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer !important;
        transition: 0.1s opacity ease-in-out;
        &.dark {
            background: $dark-fade;
            box-shadow: 0px 0px 20px 0px rgba(122, 124, 132, 0.40);
        }
        &.primary {
            background: $primary;
            box-shadow: 0px 0px 54px 0px rgba(211, 46, 89, 0.40);
        }
        &.disabled {
            background: $dark;
            cursor: initial !important;
            opacity: 0.5 !important;
        }
        & > span {
            margin: 0 5px;
        }
        &:hover {
            opacity: 0.8;
        }
    }
    @media(max-width: 750px) {
        button {
            padding: 10px 20px;
            font-size: 14px;
            & > span > img {
                width: 15px;
            }
        }
    }
</style>