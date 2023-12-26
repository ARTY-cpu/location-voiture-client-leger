<template>
  <div>
    <!-- ... Your existing code ... -->
    <div v-if="rendezVous.length > 0">
      <h3>Vos rendez-vous :</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Modèle</th>
            <th>Véhicule</th>
            <th>Plaque d'immatriculation</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Use rendezVous in the loop -->
          <tr v-for="rendezVous in rendezVous" :key="rendezVous.id">
            <td>{{ rendezVous.Categorie }}</td>
            <td>{{ rendezVous.voiture }}</td>
            <td>{{ rendezVous.plaque_immatriculation }}</td>
            <td>{{ rendezVous.date_reservation_1 }}</td>
            <td>{{ rendezVous.date_reservation_2 }}</td>
            <td>
              <button @click="modifierrendezVous(rendezVous)" class="btn btn-warning">Modifier</button>
              <span class="mx-1"></span>
              <button @click="supprimerrendezVous(rendezVous.id)" class="btn btn-danger">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      rendezVous: [],
      token: localStorage.getItem('token'),
    };
  },
  methods: {
    chargerRendezVous() {
      // Assurez-vous que le token est présent et non vide
      if (!this.token) {
        console.error('Token non disponible');
        return;
      }

      // Utilisez l'en-tête Authorization pour inclure le token JWT
      axios.get('http://localhost:3000/listeresa', {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      })
        .then(response => {
          this.rendezVous = response.data.rendezvous;
          console.log(this.rendezVous);
        })
        .catch(error => {
          console.error('Erreur lors du chargement des rendez-vous :', error);
        });
    },
  },
  mounted() {
    this.chargerRendezVous();
  },
};
</script>
