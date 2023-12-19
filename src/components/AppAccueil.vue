<template>
  <div class="accueil-container">
    <div class="jumbotron text-center">
      
      <h1 class="display-4">Bienvenue à PrestigeAuto</h1>
      <p class="lead">Trouvez la voiture parfaite pour votre prochain voyage</p>
      <hr class="my-4">
      <p>Parcourez notre sélection de voitures de qualité et réservez dès aujourd'hui.</p>
      <a class="btn btn-primary btn-lg" href="/modeles" role="button">Réserver une voiture</a>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h2>Large Choix</h2>
          <p>Nous proposons une large gamme de voitures pour répondre à vos besoins, que ce soit pour un voyage en ville ou une escapade à la campagne.</p>
        </div>
        <div class="col-md-4">
          <h2>Tarifs Compétitifs</h2>
          <p>Nos tarifs de location sont compétitifs et transparents. Aucun frais caché.</p>
        </div>
        <div class="col-md-4">
          <h2>Réservation Facile</h2>
          <p>Notre processus de réservation est simple et rapide. Réservez en quelques clics et partez en toute tranquillité.</p>
        </div>
      </div>
    </div>

    <!-- Grande image de voiture -->
     <!-- Image pour les écrans de taille moyenne et supérieure -->
     <picture>
      <source media="(min-width: 992px)" srcset="../img/voiture_desktop.jpg">
      <img src="../img/voiture.jpg" alt="Voiture" class="voiture-image">
    </picture>
  </div>
</template>

<script>
export default {
  name: 'AppAccueil',
  // ... logique spécifique à la page d'accueil
}
</script>

<style scoped>
.accueil-container {
  margin-top: 0px; /* la marge*/
}

.jumbotron {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 0.3rem;
  margin-bottom: 2rem;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.voiture-image {
  width: 100%; /* Ajustez la largeur selon vos besoins */
  max-width: 500px; /* Ajoutez cette ligne pour limiter la largeur maximale */
  margin-top: 20px; /* Espace entre le contenu et l'image */

  /* Nouvelles propriétés pour centrer l'image sur les écrans de bureau */
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
