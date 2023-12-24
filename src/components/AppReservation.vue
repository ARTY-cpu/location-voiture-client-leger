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
          <option v-for="vehicule in vehicules" :key="vehicule.id" :value="vehicule.id">{{ vehicule.marque + " " +
            vehicule.modele }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="dateDebut">Date de début :</label>
        <flat-pickr v-model="dateDebut" :config="dateConfigDebut" class="form-control" required></flat-pickr>
      </div>
      <div class="mb-3">
        <label for="dateFin">Date de fin :</label>
        <flat-pickr v-model="dateFin" :config="dateConfigFin" class="form-control" required></flat-pickr>
      </div>
      <div class="mb-3">
        <label for="prix">Prix :</label>
        <p>{{ prix.toFixed(2) }} €</p>
      </div>
      <button type="submit" class="btn btn-primary">Réserver</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  components: {
    FlatPickr,
  },
  data() {
    return {
      selectedModele: "",
      selectedVehicule: "",
      dateDebut: null,
      dateFin: null,
      currentDate: new Date().toISOString().split('T')[0],
      modeles: [],
      vehicules: [],
      token: localStorage.getItem('token'),
      prix: 0,
      dateConfigDebut: {
        minDate: 'today',
        disable: [],
      },
      dateConfigFin: {
        disable: [],
      },
    };
  },
  mounted() {
    this.chargerModeles();
    this.chargerVehicules();
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
    chargerDatesIndisponibles() {
      if (this.selectedVehicule) {
        axios.get(`http://localhost:3000/datesIndisponibles?vehiculeId=${this.selectedVehicule}`)
          .then(response => {
            this.dateConfigDebut.disable = response.data.map(date => ({
              from: date.start,
              to: date.end,
            }));
            this.dateConfigFin.disable = response.data.map(date => ({
              from: date.start,
              to: date.end,
            }));
          })
          .catch(error => {
            console.error('Erreur lors du chargement des dates indisponibles :', error);
          });
      }
    },

    updateDateConfigFin() {
      this.dateConfigFin.minDate = this.dateDebut;
      this.dateConfigFin.disable = this.dateConfigDebut.disable;
    },

    calculerPrix() {
      if (this.dateDebut && this.dateFin) {
        // Convertissez les dates en objets Date
        const dateDebutObj = new Date(this.dateDebut);
        const dateFinObj = new Date(this.dateFin);

        // Calcul du nombre de jours entre les deux dates
        const diffTime = Math.abs(dateFinObj - dateDebutObj);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const tarifJournalier = this.modeles[this.selectedModele - 1].Prix || 0;
        console.log(tarifJournalier);
        // Calcul du prix total
        this.prix = (diffDays + 1 )* tarifJournalier;
      } else {
        this.prix = 0;
      }
    },

    submitReservation() {
      if (!this.selectedModele || !this.selectedVehicule || !this.dateDebut || !this.dateFin) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      // Vérifier que dateDebut est inférieure ou égale à dateFin
      const dateDebutObj = new Date(this.dateDebut);
      const dateFinObj = new Date(this.dateFin);

      if (dateDebutObj > dateFinObj) {
        alert("La date de début doit être antérieure ou égale à la date de fin.");
        return;
      }

      const reservationData = {
        modele: this.selectedModele,
        vehicule: this.selectedVehicule,
        dateDebut: this.dateDebut,
        dateFin: this.dateFin,
      };

      axios.post('http://localhost:3000/reservations', reservationData, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      })
        .then(response => {
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
    selectedModele: 'chargerVehicules',
    selectedVehicule: 'chargerDatesIndisponibles',
    dateDebut: ['updateDateConfigFin', 'calculerPrix'],
    dateFin: 'calculerPrix',
  },
};
</script>

<style scoped></style>
