<template lang="">
    <div class="short">
        <img class="short-image" src="@/assets/images/dashboard/youtube.svg" alt="">
        <div>
            <a href="#">Go To Video</a>
            <p><small><b>From TikTok: @exampleuser</b></small></p>
            <p><small><b>To YouTube: @exampleuser</b></small></p>
        </div>
        <div class="short-date">
            <small>2hr. ago</small>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ShortComponent'
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';

    .short {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 65px;
        padding: 10px 25px;
        border-radius: 15px;
        border: 1px solid $gray-white;
        background: $white;
        max-width: 400px;
        min-width: 220px;
        & > div {
            & > h4, & > p {
                margin: 0;
            }
            & > p {
                font-size: 13px;
                opacity: 0.75;
            }
        }
        &-image {
            width: 40px;
            height: auto;
        }
        &-date {
            height: 100%;
            font-size: 11px;
        }
    }

    @media(max-width: 400px) {
        .short {
            & > div {
                & > p > small {
                    font-size: 10px;
                }
            }
            &-image {
                width: 30px;
            }
            &-date > small {
                font-size: 9px !important;
            }
        }

    }
</style>