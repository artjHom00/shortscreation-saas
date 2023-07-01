<template lang="">
    <div class="input">
        <h4>{{ label }}</h4>
        <input type="text" :placeholder="placeholder" autocomplete="off">
    </div>
</template>
<script>
export default {
    name: 'InputComponent',
    props: ['label', 'placeholder']
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';

    .input {
        & > input {
            border: 0;
            width: calc(100% - 60px);
            padding: 20px 30px;
            border-radius: 10px;
            background: $gray-white;
            box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
            transition: 0.1s background ease-in-out;
            &:focus {
                outline: none;
                background: $white;
            }
        } 
    }

    @media(max-width: 750px) {
        .input {
            & > input {
                padding: 15px;
                width: calc(100% - 30px);
            }
        }
    }
</style>