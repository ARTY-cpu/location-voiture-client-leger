<!-- AppApropos.vue -->

<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">À propos de notre entreprise</h2>

        <p class="card-text">
          Bienvenue sur notre plateforme de réservation de véhicules! Cette application a été développée dans le cadre
          d'un projet scolaire et a pour but de démontrer les compétences acquises dans le domaine du développement web.
        </p>

        <p class="card-text">
          Notre entreprise fictive, Prestige Auto., vous offre la possibilité de réserver des véhicules de manière simple
          et efficace. Nous sommes situés dans la ville de Paris, offrant des services de location de voitures de haute
          qualité pour répondre à vos besoins de déplacement.
        </p>

        <p class="card-text">
          Coordonnées de l'entreprise :
        <ul>
          <li><strong>Adresse:</strong> Rue Firmin Guillot, Paris XV</li>
          <li><strong>Téléphone:</strong> +01 234 567 890</li>
          <li><strong>Email:</strong> info@prestigeauto.com</li>
        </ul>
        </p>

        <div class="alert alert-info" role="alert">
          <strong>Remarque :</strong> Cette application est un projet scolaire à des fins éducatives uniquement. Aucune
          réservation de voiture réelle n'est possible. Toute ressemblance avec une entreprise réelle est purement
          fortuite.
        </div>

        <!-- MAP coordonnées -->
        <div class="mt-4">
          <iframe width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-5.5,41,9.5,51&amp;layer=mapnik&marker=48.832806208770414%2C2.290171365454441"
            style="border: 1px solid #ccc; border-radius: 8px;"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // logic
};
</script>

<style scoped>
/* style */
</style>
