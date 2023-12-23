<template>
  <div class="container">
    <h2>Réservation</h2>
    <form @submit.prevent="submitReservation">
      <div class="mb-3">
        <label for="modele">Modèle de voiture :</label>
        <select v-model="selectedModele" class="form-select" id="modele" required>
          <option value="" disabled selected>Veuillez choisir le modèle</option>
          <option v-for="modele in modeles" :key="modele.ID" :value="modele.ID">{{ modele.Categorie }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="vehicule">Véhicule :</label>
        <select v-model="selectedVehicule" class="form-select" id="vehicule" required>
          <option value="" disabled selected>Veuillez choisir le véhicule</option>
          <option v-for="vehicule in vehicules" :key="vehicule.id" :value="vehicule.id">{{ vehicule.marque + " " + vehicule.modele }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="dateDebut">Date de début :</label>
        <input v-model="dateDebut" type="date" class="form-control" id="dateDebut" :min="currentDate" required>
      </div>
      <div class="mb-3">
        <label for="dateFin">Date de fin :</label>
        <input v-model="dateFin" type="date" class="form-control" id="dateFin" :min="dateDebut" required>
      </div>
      <button type="submit" class="btn btn-primary">Réserver</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedModele: "",
      selectedVehicule: "",
      dateDebut: null,
      dateFin: null,
      currentDate: new Date().toISOString().split('T')[0], // Obtient la date actuelle au format YYYY-MM-DD
      modeles: [],
      vehicules: [],
      token: localStorage.getItem('token'),
    };
  },
  mounted() {
    this.chargerModeles();
    this.chargerVehicules();

    // Récupérer le paramètre de la route pour initialiser le modèle sélectionné
    //this.selectedModele = this.$route.params.modele;
  },
  methods: {
    chargerModeles() {
      axios.get('http://localhost:3000/modeles')
        .then(response => {
          this.modeles = response.data;
        })
        .catch(error => {
          console.error('Erreur lors du chargement des modèles :', error);
        });
    },
    chargerVehicules() {
      axios.get('http://localhost:3000/vehicules')
        .then(response => {
          this.vehicules = response.data;
        })
        .catch(error => {
          console.error('Erreur lors du chargement des véhicules :', error);
        });
    },

    // Ajoutez cette méthode pour charger les véhicules en fonction du modèle sélectionné
    chargerVehiculesEnFonctionDuModele() {
      if (this.selectedModele) {
        axios.get(`http://localhost:3000/vehicules?modele=${this.selectedModele}`)
          .then(response => {
            this.vehicules = response.data;
          })
          .catch(error => {
            console.error('Erreur lors du chargement des véhicules :', error);
          });
      }
    },

    submitReservation() {
      // Validation des champs (à adapter selon les besoins)
      if (!this.selectedModele || !this.selectedVehicule || !this.dateDebut || !this.dateFin) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      // Création de l'objet de réservation
      const reservationData = {
        modele: this.selectedModele,
        vehicule: this.selectedVehicule,
        dateDebut: this.dateDebut,
        dateFin: this.dateFin,
      };

      console.log(reservationData)
      // Envoi de la requête POST au backend
      axios.post('http://localhost:3000/reservations', reservationData, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      })
        .then(response => {
          // Traitement de la réponse du backend (à adapter selon les besoins)
          console.log('Réservation réussie !', response.data);
          alert('Réservation réussie !');
        })
        .catch(error => {
          console.error('Erreur lors de la réservation :', error);
          alert('Erreur lors de la réservation. Veuillez réessayer.');
        });
    },
  },
  watch: {
    // Surveillez les changements de selectedModele et appelez la méthode correspondante
    selectedModele: 'chargerVehiculesEnFonctionDuModele',
  },
};
</script>

<style scoped></style>
