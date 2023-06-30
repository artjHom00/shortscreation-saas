<template>
  <NavComponent/>
  <router-view/>
  <FooterComponent/>
</template>

<script>
import NavComponent from '@/components/NavComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  components: {
    NavComponent,
    FooterComponent
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap');
@import './assets/styles/_variables.scss';

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
