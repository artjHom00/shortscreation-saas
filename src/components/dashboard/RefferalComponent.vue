<template lang="">
    <div class="refferal">
        <h4>Mariantic</h4>
        <div class="refferal-info">
            <div>
                <p><small>Subscription:</small></p>
                <h4>27 days</h4>
            </div>
            <div>
                <p><small>Registration:</small></p>
                <h4>13/02/2019</h4>
            </div>
            <div>
                <p><small>Earned:</small></p>
                <h4><b>7.00$</b></h4>
            </div>
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

    .refferal {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 65px;
        padding: 10px 25px;
        border-radius: 15px;
        border: 1px solid $gray-white;
        background: $white;
        // max-width: 480px;
        min-width: 220px;
        &-info {
            display: flex;
            width: 70%;
            justify-content: space-between;
            align-items: center;
            & > div > p > small {
                font-size: 9px;
            }
            & > div > p {

                margin: 0;
            }
            & > div > h4, & > div > h3 {
                margin: 0;
                font-size: 13px;
            }
        }
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
    
    @media(max-width: 600px) {
        .refferal {
            h4 {
                font-size: 13px;
            }
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
        .refferal {
            
            padding: 10px;
            
            & .refferal-info > div {
                & h4 {
                    font-size: 10px;
                }
            }
        }

    }

    
</style>