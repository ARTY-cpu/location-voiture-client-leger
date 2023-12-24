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
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Use rdv in the loop -->
          <tr v-for="rdv in rendezVous" :key="rdv.id">
            <td>{{ rdv.modele }}</td>
            <td>{{ rdv.vehicule }}</td>
            <td>{{ rdv.dateDebut }}</td>
            <td>{{ rdv.dateFin }}</td>
            <td>
              <button @click="modifierRdv(rdv)">Modifier</button>
              <button @click="supprimerRdv(rdv.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- ... Your existing code ... -->
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
