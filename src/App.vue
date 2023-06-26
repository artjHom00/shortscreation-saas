<template>
  <NavComponent/>
  <router-view/>
</template>

<script>
import NavComponent from '@/components/NavComponent.vue'
export default {
  components: {
    NavComponent
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap');
@import './assets//styles/_variables.scss';

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

</style>
