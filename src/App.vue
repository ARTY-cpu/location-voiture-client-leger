<!-- src/App.vue -->

<template>
  <div>
    <Header />
    
    <!-- reste contenu si besoin-->
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
  // reste script si besoin
}
</script>
