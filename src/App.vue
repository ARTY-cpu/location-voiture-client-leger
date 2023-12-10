<!-- src/views/Accueil.vue -->

<template>
  <div>
    <Header />
    
    <!-- Le reste de ton contenu actuel -->
    <div id="app">
    <router-view></router-view>
  </div>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/AppHeader.vue';
import Footer from '@/components/AppFooter.vue';

export default {
  components: {
    Header,
    Footer
  }
  // Le reste de ton script
}
</script>
