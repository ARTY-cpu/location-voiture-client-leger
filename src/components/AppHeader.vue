<template>
  <header class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid text-center">
      <router-link class="navbar-brand" to="/">Accueil</router-link>

      <!-- Bouton Burger pour les écrans plus petits -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleMobileMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Partie gauche du menu -->
      <div class="collapse navbar-collapse" :class="{ 'show': isMobile }" id="navbarNav">
        <div class="navbar-nav">
          <router-link class="nav-item nav-link" to="/reservation">Réservation</router-link>
          <router-link class="nav-item nav-link" to="/contact">Contact</router-link>
          <router-link class="nav-item nav-link" to="/apropos">À propos</router-link>
        </div>
      </div>

      <!-- Partie droite du menu -->
      <div class="collapse navbar-collapse" :class="{ 'show': isMobile }" id="navbarNavRight">
        <div class="navbar-nav ms-auto">
          <router-link v-if="!isLoggedIn" class="nav-item nav-link btn btn-primary nav-link-hover" to="/connexion">Se connecter</router-link>
          <router-link v-if="!isLoggedIn" class="nav-item nav-link btn btn-success nav-link-hover" to="/inscription">S'inscrire</router-link>
          <router-link v-if="isLoggedIn" class="nav-item nav-link btn btn-secondary nav-link-hover" to="/options">Options</router-link>
          <button v-if="isLoggedIn" class="nav-item nav-link btn btn-warning nav-link-hover" @click="logout">Se déconnecter</button>
        </div>
      </div>
    </div>
  </header>
</template>

<!-- Le reste du composant reste inchangé -->

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isMobile: false,
    };
  },
  computed: {
    ...mapState('user', ['isLoggedIn']),
  },
  methods: {
    toggleMobileMenu() {
      this.isMobile = !this.isMobile;
    },
    handleResize() {
      // Met à jour la valeur de isMobile lors du redimensionnement de la fenêtre
      this.isMobile = window.innerWidth <= 768; // Ajoutez un point de rupture selon vos besoins
    },
    logout() {
      // Supprimez le jeton JWT du localStorage
      localStorage.removeItem('token');
      
      // Réinitialisez l'état de connexion dans le store Vuex
      this.$store.commit('user/setLoggedIn', false);

      // Redirigez l'utilisateur vers la page de connexion
      this.$router.push('/connexion');
    },
  },
  mounted() {
    // Appelle handleResize pour définir isMobile au chargement de la page
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style scoped>
/* Styles spécifiques au composant */
header {
  padding: 5px 0;
  background-color: #cecece;
}

.navbar-nav a {
  margin-right: 15px;
  text-decoration: none;
  color: #007bff; /* Couleur des liens Bootstrap */
}

.nav-link-hover:hover {
  color: white;
}
</style>
