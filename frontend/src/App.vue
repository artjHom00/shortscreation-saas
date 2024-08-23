<template>
  <NavComponent v-if="!isLoading"/>
  <router-view/>
  <FooterComponent/>
</template>

<script>
import NavComponent from '@/components/NavComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

// import axios from 'axios'

export default {
  components: {
    NavComponent,
    FooterComponent
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {

    setRefferalCookie() {
      if(this.$route.query?.ref) {
        this.$cookies.set('ref', this.$route.query?.ref)
      }
    }
 
  },
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap');
@import './assets/styles/_variables.scss';

/* https://vuejs.org/guide/built-ins/transition.html#the-transition-component */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

:root {
    --popper-theme-background-color: #333745;
    --popper-theme-background-color-hover: #333745;
    --popper-theme-text-color: #ffffff;
    --popper-theme-border-width: 0px;
    --popper-theme-border-style: solid;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 5px 20px;
    --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
.popper {
  font-size: 12px !important;
}

body {
  padding: 0;
  margin: 0;
  background: $gray-white;
}
#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333745;
}
.no-decoration {
  text-decoration: none !important;
}
h1 {
  font-size: 72px;
  font-weight: 800;
}
h2 {
  font-size: 36px;
  font-weight: 700;
}
h3 {
  font-size: 27px;
  font-weight: 700;
}
h4 {
  font-size: 18px;
  font-weight: 500;
}
p {
  font-size: 16px;
}
a {
  color: $dark;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
.text-primary {
  color: $primary
}
.container {
  padding: 0px 10%;
  margin-left: auto;
  margin-right: auto;
}

@media(max-width: 720px) {
  h1 {
    font-size: 56px;
  }
  h2 {
    font-size: 32px;
  }
  h3 {
    font-size: 24px;
  }
  h4 {
    font-size: 16px;
  }
  p, a, label {
    font-size: 13px;
  }
  small {
    font-size: 11px;
  }
}

</style>
