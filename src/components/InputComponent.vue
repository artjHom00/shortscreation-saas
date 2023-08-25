<template lang="">
    <div class="input">
        <h4>{{ label }}</h4>
        <textarea 
        cols="30" 
        rows="5" 
        :placeholder="placeholder" 
        v-model="inputVal"
        v-if="textarea"></textarea>
        <select v-model="inputVal" v-else-if="option">
            <option v-for="(option, index) in availableOptions" :key="index" :value="option">Every {{ option }} hours</option>
        </select>
        <input 
        type="password"
        v-model="inputVal"
        :placeholder="placeholder" 
        autocomplete="off" 
        v-else-if="password">
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
    props: ['user', 'label', 'placeholder', 'textarea', 'option', 'password', 'modelValue'],
    computed: {
        inputVal: {
            get() {
                return this.modelValue;
            },
            set(val) {
                this.$emit('update:modelValue', val);
            }
        },
        availableOptions() {
            if(this.$props.user.subscription.type === 'Basic') {
                return [12, 24]
            }
            if(this.$props.user.subscription.type === 'Premium') {
                return [6, 12, 24]
            }
            if(this.$props.user.subscription.type === 'Ultimate') {
                return [3, 6, 12, 24]
            }
            return []
        }
    }
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';

    .input {

        & > input, & > textarea, & > select {
            resize: none;
            border: 0;
            font-family: Inter, Helvetica, Arial, sans-serif;
            width: calc(100% - 60px);
            padding: 20px 30px;
            color: $dark;
            border-radius: 10px;
            background: $gray-white;
            box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
            -webkit-appearance: none;
            -webkit-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
            transition: 0.1s background ease-in-out;
            &:focus {
                outline: none;
            }
            &.textarea {
                padding-bottom: 30px;
            }
        } 
        & > select {
            width: 100% !important;
        }
        & > input:focus, & > textarea:focus {
            background: $white;
        }
        & > select {
            width: 100%;
            appearance: none;
        }
    }

    @media(max-width: 750px) {
        .input {
            & > input, & > textarea, & > select {
                padding: 15px;
                width: calc(100% - 30px);
            }
        }
    }
</style>