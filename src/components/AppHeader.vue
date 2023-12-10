<!-- src/components/Header.vue -->

<template>
  <header class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">Accueil</router-link>

      <!-- Bouton Burger pour les écrans plus petits -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Contenu du menu de navigation -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav">
          <router-link class="nav-item nav-link" to="/reservation">Réservation</router-link>
          <router-link class="nav-item nav-link" to="/contact">Contact</router-link>
          <router-link class="nav-item nav-link" to="/apropos">À propos</router-link>
        </div>
      </div>

      <!-- Boutons Connexion et Inscription / Options et Déconnexion -->
      <div class="navbar-nav ml-auto">
        <router-link v-if="!isLoggedIn" class="nav-item nav-link btn btn-primary nav-link-hover" to="/connexion">Se connecter</router-link>
        <router-link v-if="!isLoggedIn" class="nav-item nav-link btn btn-success nav-link-hover" to="/inscription">S'inscrire</router-link>
        <router-link v-if="isLoggedIn" class="nav-item nav-link btn btn-secondary nav-link-hover" to="/options">Options</router-link>
        <button v-if="isLoggedIn" class="nav-item nav-link btn btn-warning nav-link-hover" @click="logout">Se déconnecter</button>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('user', ['isLoggedIn']),
  },
  methods: {
    logout() {
      // Supprimez le jeton JWT du localStorage
      localStorage.removeItem('token');
      
      // Réinitialisez l'état de connexion dans le store Vuex
      this.$store.commit('user/setLoggedIn', false);

      // Redirigez l'utilisateur vers la page de connexion
      this.$router.push('/connexion');
    },
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
