<template lang="">
    <footer class="footer container">
        <div class="footer-logo">
            <img src="../assets/images/footer-logo.svg" width="140" alt="">
        </div>
        <div class="footer-info">
            <h4>Since 2023</h4>
            <p><small>“No square shall enter in the circle of winners” - Spitta Andre, Curren$y</small></p>
        </div>
    </footer>
</template>

<script>

export default {
    name: 'FooterComponent',
}
</script>

<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';
    .footer {
        margin: 100px auto 30px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-info {
            text-align: right;
            width: 300px;
            & > h4 {
                margin-top: 0;
            }
            & > p > small {
                font-size: 13px;
            }
        }
    }
    @media(max-width: 720px) {
        .footer {
            & img {
                width: 100px;
            }
            &-info {
                width: 50%;
            }
        }
    }
</style>