<template lang="">
    <div>
        <a :href="short.link" target="_blank" class="short">
            <img class="short-image" src="@/assets/images/dashboard/youtube.svg" alt="">
            <div style="min-height: 52px;">
                <span>Go To Video</span>
                <div class="short-info">
                    <p><small><b>From TikTok: @{{ short.author }}</b></small></p>
                    <p><small><b>To: {{ '#' + shortenId || 'Deleted Account' }}</b></small></p>
                </div>
            </div>
            <div class="short-date">
                <small>{{ formatCreationDate }}</small>
            </div>
        </a>
    </div>
</template>
<script>
import moment from 'moment'

export default {
    name: 'ShortComponent',
    props: ['short'],
    computed: {
        formatCreationDate() {
            return moment(this.$props.short.created_at).format('MMMM Do YYYY, HH:mm')
        },
        shortenId() {
            return this.$props.short.youtube_account_id.slice(-5)
        }
    }
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
        text-decoration: none;
        // max-width: 400px;
        min-width: 275px;
        position: relative;
        & > div {
            & > h4, & > div > p {
                margin: 0;
            }
            & > div > p {
                font-size: 13px;
                opacity: 0.75;
            }
        }
        &-info {
            // max-width: 135px;
            // overflow:auto;
            position: absolute;
            min-height: 32px;
            & > * {
                white-space: nowrap;
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
            align-self: flex-start;
        }
        transition: 0.2s opacity ease-in-out;
        &:hover {
            opacity: 0.75;
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