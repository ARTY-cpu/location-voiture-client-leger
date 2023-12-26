<template>
  <div class="container">
    <h2>Modèles de Voitures</h2>
    <div class="row">
      <div v-for="modele in modeles" :key="modele.nom" class="col-md-4 mb-4">
        <div class="card">
          <img :src="modele.image" class="card-img-top" alt="Image du modèle">
          <div class="card-body">
            <h5 class="card-title">{{ modele.nom }}</h5>
            <p class="card-text">{{ modele.description }}</p>
            <p class="card-text">Tarif par jour: {{ modele.tarif }}€</p>
            <!-- <router-link :to="{ name: 'reservation', params: { modele: modele.nom } }" class="btn btn-primary">
              Réserver {{ modele.nom }}
            </router-link> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modeles: [
        {
          nom: 'Citadine',
          description: 'Voiture compacte idéale pour la ville.',
          tarif: 30,
          image: require('../img/voiture-citadine.jpg'),
        },
        {
          nom: 'SUV',
          description: 'Véhicule polyvalent et spacieux.',
          tarif: 150,
          image: require('../img/voiture-SUV.jpg'),
        },
        {
          nom: 'Sport',
          description: 'Une sportive pour le plaisir de rouler.',
          tarif: 500,
          image: require('../img/voiture-sport.jpg'),
        },
        {
          nom: 'Electrique',
          description: 'Le meilleur de l\'électrique.',
          tarif: 500,
          image: require('../img/voiture-electrique.jpg'),
        },
        {
          nom: 'Collection',
          description: 'Pour les goûts classiques.',
          tarif: 1500,
          image: require('../img/voiture-collection.jpg'),
        },
        {
          nom: 'Voiture Prestigieuse',
          description: 'Voiture de luxe très haut de gamme.',
          tarif: 30000,
          image: require('../img/voiture-prestigieuse.jpg'),
        },
      ],
    };
  },
};
</script>

<style scoped>
.card {
  max-height: 100%; /* Hauteur maximale pour toutes les cartes */
  display: flex;
  flex-direction: column;
}

.card-img-top {
  height: 200px; /* Set a fixed height for the images (adjust as needed) */
  object-fit: cover; /* Ensure images maintain aspect ratio and cover the entire space */
}

.card-body {
  flex: 1; /* Les cartes ont la même hauteur */
}
</style>
