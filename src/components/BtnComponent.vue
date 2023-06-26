<template lang="">
    <button>
        <span><img src="../assets/person.svg" width="20" alt=""></span>
        <span>Sign In</span>
    </button>
</template>
<script>
export default {
    name: 'BtnComponent'
}
</script>
<style scoped lang="scss">
    @import '../assets//styles/_variables.scss';
    
    button {
        border: none;
        border-radius: 15px;
        background: $dark-fade;
        box-shadow: 0px 0px 20px 0px rgba(122, 124, 132, 0.40);
        color: #FFF;
        font-size: 16px;
        font-family: Inter;
        font-weight: 600;
        line-height: 80%;
        padding: 10px 25px;
        height: 43px;
        display: flex;
        align-items: center;
        cursor: pointer;
        & > span {
            margin: 0 5px;
        }
        &:hover {
            opacity: 0.8;
        }
    }
</style>