<template>
  <AlertComponent v-if="showAlert"/>
   <div class="home">
    <div class="main-section section container">
      <h1>Generate millions of YouTube shorts <span class="text-primary">in minutes!</span></h1>
      <h4>Say goodbye to manual work and hello to efficiency, creativity, and growth. Elevate your YouTube channel to new heights with our solution, specially designed to integrate TikTok content seamlessly. Embrace the future of video creation!</h4>
      <router-link to="/dashboard" class="no-decoration">
        <BtnComponent text="Start Creating 🔗" type="primary"/>
      </router-link>
      <div class="video">
        <video src="/promo.mp4" poster="/poster.png" loop controls>
        </video>
      </div>
    </div>
    <div class="steps section container">
      <h2>Unleash the Power of <span class="text-primary">TikTok & YouTube Shorts</span> for Your YouTube Channel!</h2>
      <div class="steps-content">
        <div class="image">
          <img src="../assets/images/home/chart.svg">
        </div>
        <div class="text">
          <h3>Automated & Exponential grow of your YouTube Channel!</h3>
          <h4>
            <a href="https://youtube.com/@Mariantic" target="_blank" class="text-primary">Check out one of channels, working with our script!</a>
            <br><br>
            Watch your channel fill with content from TikTok & always-growing audience without you manually working on it's content.
            <br><br>
            The audience then can be used for affiliate marketing, selling products & creating your own brand
          </h4>
          <router-link to="/dashboard" class="no-decoration"><BtnComponent type="primary" text="Start Now"/></router-link>
        </div>
      </div>
    </div>
    <div class="affiliate section">
      <div class="wrapper container">
        <div class="text">
          <h2>
            <span class="text-primary">Start Making $10k per Month</span> with Our Affiliate Program!
          </h2>
            <h4>
              <b>It's simple:</b> Produce more YouTube Shorts content using our SAAS solution, and earn <b><span class="text-primary">10% [$2.5 - $60]</span> for each client who purchases a subscription</b> from your link!
              <br><br>  
              Just add your refferal link into pinned comment on your shorts / in description & start making money now!
            </h4>
            <router-link to="/dashboard" class="no-decoration"><BtnComponent type="primary" text="Get Started"/></router-link>
        </div>
        <div class="image">
          <img src="../assets/images/home/notifications.svg" alt="">
        </div>
      </div>
    </div>
    <div class="howto section container">
      <h2><span class="text-primary">ShortsCreation</span> Features</h2>
      <div class="wrapper">
        <div class="adv">
          <div style="font-size: 84px;">🔌</div>
          <h3>100% Automated</h3>
          <h4>Our SAAS solution handle the full process of growing your YouTube account: generating content, setting it's title and description & uploading it</h4>
        </div>
        <div class="adv">
          <div style="font-size: 84px;">📌</div>
          <h3>First & Only</h3>
          <h4>We are the first to allow you create a network of fully automated YouTube Channels. Monetize all the traffic that you gain automatically & start making money!</h4>
        </div>
        <div class="adv">
          <div style="font-size: 84px;">🎉</div>
          <h3>Free trial</h3>
          <h4>Get the free trial for 1 month without adding your cards / personal info to test our service before paying!</h4>
        </div>
      </div>
    </div>

    <div class="subscriptions section container">
      <h2>
        Great performance.<br>
        <small class="text-primary">Unbelievable Pricing.</small>
      </h2>
      <div class="subscriptions-list">
        <SubscriptionComponent v-for="(subscription, index) of subscriptions" :key="index" :link="subscription.link" :type="subscription.type" :videos="subscription.videos" :accounts="subscription.accounts" :name="subscription.name" :price="subscription.price" :videoCost="subscription.videoCost" action="Get Started"/>
      </div>
    </div>
  </div>
</template>

<script>
import BtnComponent from '@/components/BtnComponent.vue'; 
import SubscriptionComponent from '@/components/SubscriptionComponent.vue'; 
import AlertComponent from '@/components/AlertComponent.vue'

export default {
  name: 'HomeView',
  components: {
    BtnComponent,
    SubscriptionComponent,
    AlertComponent
  },
  data() {
    return {
      showAlert: true,
      subscriptions: [
        {
          type: 'dark',
          videos: '1-2',
          accounts: '1',
          name: 'Basic',
          price: '24.99',
          videoCost: '$0.42',
          link: '/dashboard'
        },
        {
          type: 'primary',
          videos: '1-4',
          accounts: '3',
          name: 'Premium',
          price: '39.99',
          videoCost: '$0.11',
          link: '/dashboard'
        },
        {
          type: 'dark',
          videos: '1-8',
          accounts: '3',
          name: 'Ultimate',
          price: '69.99',
          videoCost: '$0.09',
          link: '/dashboard'
        },
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/assets/styles/_variables.scss';

  .placeholder {
    margin: 0 auto;

    border-radius: 20px;
    opacity: 0.6;
    background: $fade-w-image;
  }
  .video, video {
    margin: 0 auto;
    margin-top: 80px;
    width: 100%;
    max-width: 960px;
    display: block;
    border-radius: 13px;
  }
  .section {
    margin-top: 100px;
  }
  .main-section {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    & > * > button {
      margin-top: 35px;
      min-width: 250px;
      margin-left: auto;
      margin-right: auto;
    }
    & > h4 {
      width: 75%;
      margin: 0 auto;
    }
  }
  .steps {
    & > h2 {
      text-align: center;
      margin: 0 auto;
      width: 45%;
    }
    &-content {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      & > div {
        margin: 0;
        width: 45%;
      }
      & > .image > img {
        height: 350px;
        border-radius: 34px;
      }
      & > .text {
        & > * > button {
          min-width: 70%;
        }

        & > * {
          margin: 30px 0;
        }
      }
    }
  }

  .affiliate {
    background: $fade-w-image;
    background-size: cover;
    padding: 75px 0;
    color: $gray-white;
    & > .wrapper {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      & > .text {
        width: 50%;
        & > h2 {
          margin-top: 0;
        }
        & > * {
          margin: 40px 0;
        }
        & > * > button {
          min-width: 50%;
        }
      }
      & > .image {
        width: 45%;
        & > img {
          width: 100%;
        }
      }


    }
  }

  .howto {
    & > h2 {
      text-align: center;
    }
    & > .wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      & > .adv {
        width: 25%;
        padding: 20px;
        & > h4 {
          opacity: 0.75;
          font-weight: 400;
          font-size: 16px;
        }
        & > img {
          width: 120px;
        }
      }
    }

  }

  .reviews {
    background: $fade-w-image;
    background-size: cover;
    padding: 35px 0;
    color: $gray-white;
    & h2 {
      text-align: center;
    }
    & .wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      & > .review-el {
        width: calc(50% - 140px);
        margin: 25px 0;
        padding: 40px 60px;
        border-radius: 40px;
        background: rgba(238, 238, 238, 0.10);
        box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.10), 0px 0px 25px 0px rgba(0, 0, 0, 0.10);
      }
      
    } 
  }

  .subscriptions {
    &-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  @media(max-width: 1200px) {
    .main-section {
      & .video {
        width: 100%;
      }
    }
    .steps {
      & > h2 {
        width: 100%;
      }
      &-content {
        display:block;
        & > div {
          width: 100%;
          & button {
            width: 100%;
          }
          &.image {
            display: none;
          }
        }
      }
    }
    .affiliate {
      & .wrapper {
        display: block;
        & > div {
          width: 100% !important;
          & button {
            width: 100%;
          }
          & > img {
            display: none;
          }
        }
      }
    }
    .howto {
      & .wrapper {
        & .adv {
          width: 100%;
          margin: 0 auto;
        }
      }
    }
    .reviews {
      & .wrapper {
        flex-wrap: wrap;
        & .review-el {
          width: 100%;
        }

      }
    }
    .subscriptions {
      & > h2 > small {
        font-size: initial;
      }
      &-list {
        display: block;
        & > .subscription {
          margin: 0 auto;
        }
      }
    }
  }
</style>
