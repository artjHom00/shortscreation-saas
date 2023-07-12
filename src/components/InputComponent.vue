<template lang="">
    <div class="input">
        <h4>{{ label }}</h4>
        <textarea 
        cols="30" 
        rows="5" 
        :placeholder="placeholder" 
        v-model="inputVal"
        v-if="textarea"></textarea>
        <input 
        type="text"
        v-model="inputVal"
        :placeholder="placeholder" 
        autocomplete="off" 
        v-else>
    </div>
</template>
<script>
// https://stackoverflow.com/questions/47311936/v-model-and-child-components
export default {
    name: 'InputComponent',
    props: ['label', 'placeholder', 'textarea', 'modelValue'],
    computed: {
        inputVal: {
        get() {
            return this.modelValue;
        },
        set(val) {
            this.$emit('update:modelValue', val);
        }
        }
    }
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';

    .input {
        & > input, & > textarea {
            resize: none;
            border: 0;
            font-family: Inter, Helvetica, Arial, sans-serif;
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
            &.textarea {
                padding-bottom: 30px;
            }
        } 
    }

    @media(max-width: 750px) {
        .input {
            & > input, & > textarea {
                padding: 15px;
                width: calc(100% - 30px);
            }
        }
    }
</style>