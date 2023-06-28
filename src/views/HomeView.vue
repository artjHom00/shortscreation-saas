<template>
   <div class="home">
    <div class="main-section section container">
      <h1>Automate & Earn on <span class="text-primary">YouTube Shorts</span></h1>
      <h4>Generate engagement focused social media post creatives in a matter of minutes using Artificial Intelligence. Generate perfectly sized creatives for Facebook, Instagram, LinkedIn, Pinterest, Twitter and more!</h4>
      <btnComponent text="Start Creating 🔗" type="primary"/>
      <div class="video placeholder"></div>
    </div>
    <div class="steps section container">
      <h2>Your <span class="text-primary">Month’s Shorts Content in 3-Steps</span> - Here’s How It Works:</h2>
      <div class="steps-content">
        <div class="image placeholder"></div>
        <div class="text">
          <h3>One Word & Unlimited Possibilities</h3>
          <h4>
            We don’t just randomly generate content, we formulates them specifically for Instagram.
            <br><br>
            Our stunning algorithm collects the most up to date data and creates content that seems as if it’s written by humans.
          </h4>
          <btnComponent type="primary" text="Create An Account"/>
        </div>
      </div>
    </div>
    <div class="affiliate section">
      <div class="wrapper container">
        <div class="text">
          <h2>
            Looking to boost your income?
            <span class="text-primary">Make money</span> with us!
          </h2>
            <h4>
              Our affiliate program offers 5$ for each subscription purchased by your refferal link. Sign up, promote our products, and earn commissions.
              <br><br>  
              Create shorts, invite viewers to our service & make money
            </h4>
            <btnComponent type="primary" text="Get Started"/>
        </div>
        <div class="image">
          <img src="../assets/notifications.svg" alt="">
        </div>
      </div>
    </div>
    <div class="howto section container">
      <h2>How to use <span class="text-primary">ShortsCreation</span>?</h2>
      <div class="wrapper">
        <div class="adv">
          <img src="../assets/person.png">
          <h3>Send traffic to affiliate programms</h3>
          <h4>“AdCreative.ai is more than just an AI company; they have one of the largest high-conversion ad creative databases, if not the largest.”</h4>
        </div>
        <div class="adv">
          <img src="../assets/eye.png">
          <h3>Gain views in short time</h3>
          <h4>“AdCreative.ai is more than just an AI company; they have one of the largest high-conversion ad creative databases, if not the largest.”</h4>
        </div>
        <div class="adv">
          <img src="../assets/short.png">
          <h3>Gain views in short time</h3>
          <h4>“AdCreative.ai is more than just an AI company; they have one of the largest high-conversion ad creative databases, if not the largest.”</h4>
        </div>
        <div class="adv">
          <img src="../assets/store.png">
          <h3>Send traffic to affiliate programms</h3>
          <h4>“AdCreative.ai is more than just an AI company; they have one of the largest high-conversion ad creative databases, if not the largest.”</h4>
        </div>
      </div>
    </div>
    <div class="reviews section">
      <div class="container">
        <div class="text">
          <h2>
            Rated <span class="text-primary">5/5 Stars</span> In Over <span class="text-primary">100 Reviews</span>. <br>
            Check Out What Content Creators Like You Are Saying
          </h2>
        </div>
        <div class="wrapper">
          <div class="review-el">
            <img src="../assets/kendrick.png" alt="">
            <h3>SHAW</h3>
            <p>Everyone in digital marketing is going to be using Social Studio. It’s literally Canva + AI, and it’s built by the most hardworking, humble & experienced people in the industry, take advantage of this savings now because you’re getting it eventually. </p>
          </div>

          <div class="review-el">
            <img src="../assets/kendrick.png" alt="">
            <h3>SHAW</h3>
            <p>Everyone in digital marketing is going to be using Social Studio. It’s literally Canva + AI, and it’s built by the most hardworking, humble & experienced people in the industry, take advantage of this savings now because you’re getting it eventually. </p>
          </div>

          <div class="review-el">
            <img src="../assets/kendrick.png" alt="">
            <h3>SHAW</h3>
            <p>Everyone in digital marketing is going to be using Social Studio. It’s literally Canva + AI, and it’s built by the most hardworking, humble & experienced people in the industry, take advantage of this savings now because you’re getting it eventually. </p>
          </div>

          <div class="review-el">
            <img src="../assets/kendrick.png" alt="">
            <h3>SHAW</h3>
            <p>Everyone in digital marketing is going to be using Social Studio. It’s literally Canva + AI, and it’s built by the most hardworking, humble & experienced people in the industry, take advantage of this savings now because you’re getting it eventually. </p>
          </div>
        </div>
      </div>
    </div>

    <div class="subscriptions section container">
      <h2>
        Great ad performance.<br>
        <small class="text-primary">Unbelievable Pricing</small>
      </h2>
      <div class="subscriptions-list">
        <subscriptionComponent type="dark" name="Basic" price="7"/>
        <subscriptionComponent type="primary" name="Premium" price="12"/>
        <subscriptionComponent type="dark" name="Ultimate" price="21"/>
      </div>
    </div>
  </div>
</template>

<script>
import btnComponent from '@/components/BtnComponent.vue'; 
import subscriptionComponent from '@/components/SubscriptionComponent.vue'; 

export default {
  name: 'HomeView',
  components: {
    btnComponent,
    subscriptionComponent
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/styles/_variables.scss';

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
    & > button {
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
        width: 48%;
      }
      & > .image {
        height: 360px;
        border-radius: 34px;
        opacity: 0.6;
      }
      & > .text {
        & > button {
          min-width: 70%;
        }

        & > * {
          margin: 50px 0;
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
        & > button {
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
      &-list {
        display: block;
        & > .subscription {
          margin: 0 auto;
        }
      }
    }
  }
</style>
