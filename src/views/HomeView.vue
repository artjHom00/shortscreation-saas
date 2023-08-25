<template>
   <div class="home">
    <div class="main-section section container">
      <h1>Innovative Automated Production of <span class="text-primary">YouTube Shorts</span></h1>
      <h4>Say goodbye to manual work and hello to efficiency, creativity, and growth. Elevate your YouTube channel to new heights with our solution, specially designed to integrate TikTok content seamlessly. Embrace the future of video creation!</h4>
      <router-link to="/dashboard" class="no-decoration"><BtnComponent text="Start Creating 🔗" type="primary"/></router-link>
      <div class="video placeholder"></div>
    </div>
    <div class="steps section container">
      <h2>Unleash the Power of <span class="text-primary">TikTok</span> for Your <span class="text-primary">YouTube Channel</span>!</h2>
      <div class="steps-content">
        <div class="image">
          <img src="../assets/images/home/chart.svg">
        </div>
        <div class="text">
          <h3>Exponential grow of your YouTube Channel!</h3>
          <h4>
            <a href="https://youtube.com/@Mariantic" target="_blank" class="text-primary">Check out one of channels, working with our script!</a>
            <br><br>
            Watch your channel thrive with visually stunning and trendsetting content with always-growing audience without you manually working on it's content.
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
            <span class="text-primary">Maximize Your Reach and Earnings</span> with Our Affiliate Program!
          </h2>
            <h4>
              With our affiliate program, you have the opportunity to earn while you grow! 
              <br><br>
              <b>It's simple:</b> Produce more exceptional YouTube Shorts content using our SAAS solution, and watch as your clients multiply.
              <b><span class="text-primary">For every subscription bought by a client referred by you, we offer $2.5-$70</span></b> as a token of appreciation. 
              As you create captivating videos and attract more users, your potential earnings rise! 
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
          <img src="../assets/images/home/person.png">
          <h3>Seamless Automation</h3>
          <h4>Streamline your content creation process with our seamless automation features. Say goodbye to manual tasks and embrace efficiency. Spend more time on your creative brilliance, and let our SAAS solution handle the rest: generating content & uploading it</h4>
        </div>
        <div class="adv">
          <img src="../assets/images/home/eye.png">
          <h3>Trend Insights</h3>
          <h4>Stay ahead of the competition with real-time trend insights. Our platform provides valuable data and analytics from TikTok, ensuring your YouTube Shorts are always on-trend and captivating.</h4>
        </div>
        <div class="adv">
          <img src="../assets/images/home/short.png">
          <h3>Content Inspiration</h3>
          <h4>Need a spark of inspiration? Look no further! Our SAAS solution offers an endless stream of content ideas, fueled by the creativity and diversity of TikTok's viral sensations.</h4>
        </div>
        <div class="adv">
          <img src="../assets/images/home/store.png">
          <h3>Channel Growth</h3>
          <h4>Witness exponential channel growth as you leverage the power of TikTok content. Engage your audience like never before, and enjoy the rewards of a thriving YouTube channel.</h4>
        </div>
      </div>
    </div>
    <div class="reviews section">
      <div class="container">
        <div class="text">
          <h2>
            Check Out What <br><span>Our Clients</span> Are Saying!
          </h2>
        </div>
        <div class="wrapper">
          <div class="review-el">
            <img src="../assets/images/home/avatars/Sarah.png" width="80" alt="">
            <h3>Sarah T.</h3>
            <small>6 accounts, 2.3k followers, 60k+ views</small>
            <p>"I can't imagine managing my channel without ShortsCreation. The SAAS solution's integration with TikTok has saved me countless hours while boosting my content. The affiliate program is a brilliant addition, and I've earned extra income just by referring fellow creators. Highly recommended!"</p>
          </div>

          <div class="review-el">
            <img src="../assets/images/home/avatars/Jervonte.png" width="80" alt="">
            <h3>Jevonte K.</h3>
            <small>2 accounts, 700 followers, 20k+ views</small>
            <p>"As a content creator, time is of the essence. Thanks to ShortsCreation, I now have more time to focus on content strategy and creativity. The trend insights have been a game-changer, and my videos had seen a significant increase in views n likes."</p>
          </div>
        </div>
      </div>
    </div>

    <div class="subscriptions section container">
      <h2>
        Great performance.<br>
        <small class="text-primary">Unbelievable Pricing.</small>
      </h2>
      <div class="subscriptions-list">
        <subscriptionComponent v-for="(subscription, index) of subscriptions" :key="index" :link="subscription.link" :type="subscription.type" :videos="subscription.videos" :accounts="subscription.accounts" :name="subscription.name" :price="subscription.price" :videoCost="subscription.videoCost" action="Get Started"/>
      </div>
    </div>
  </div>
</template>

<script>
import BtnComponent from '@/components/BtnComponent.vue'; 
import subscriptionComponent from '@/components/SubscriptionComponent.vue'; 

export default {
  name: 'HomeView',
  components: {
    BtnComponent,
    subscriptionComponent
  },
  data() {
    return {
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
  .video {
    margin-top: 80px;
    width: 70%;
    height: 350px;
    max-width: 720px;
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
    padding: 35px 0;
    color: $gray-white;
    & > .wrapper {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      & > .text {
        width: 50%;
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
      & > .adv {
        width: 45%;
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
