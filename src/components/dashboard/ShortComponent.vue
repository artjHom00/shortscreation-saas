<template lang="">
    <div class="short">
        <img class="short-image" src="@/assets/images/dashboard/youtube.svg" alt="">
        <div>
            <a :href="short.link">Go To Video</a>
            <p><small><b>From TikTok: @{{ short.author }}</b></small></p>
            <p><small><b>To: #{{ short.youtube_account_id }}</b></small></p>
        </div>
        <div class="short-date">
            <small>{{ new Date(short.created_at).getFullYear() }}</small>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ShortComponent',
    props: ['short'],
}
</script>
<style scoped lang="scss">
    @import '@/assets/styles/_variables.scss';

    .short {
        display: flex;
        gap: 15px;
        justify-content: space-between;
        align-items: center;
        min-height: 65px;
        padding: 10px 25px;
        border-radius: 15px;
        border: 1px solid $gray-white;
        background: $white;
        // max-width: 400px;
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
            white-space: nowrap;
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