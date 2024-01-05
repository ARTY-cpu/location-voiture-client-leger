<template>
  <div>
    <div v-if="rendezVous.length > 0">
      <h3>Vos rendez-vous en attente:</h3>
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
              <button @click="modifierRendezVous(rendezVous)" class="btn btn-warning">Modifier</button>
              <span class="mx-1"></span>
              <button @click="supprimerRendezVous(rendezVous.id)" class="btn btn-danger">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Aucun rendez-vous trouvé.</p>
    </div>

    <!-- Bootstrap Modal for Modification -->
    <div class="modal" id="modifierRdvModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifier le rendez-vous</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
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
              <flat-pickr v-model="rendezVousSelectionne.date_reservation_1" :config="dateConfigDebut"
                :value="rendezVousSelectionne.date_reservation_1" class="form-control" required></flat-pickr>
            </div>
            <div class="mb-3">
              <label for="dateFin">Date de fin :</label>
              <flat-pickr v-model="rendezVousSelectionne.date_reservation_2" :config="dateConfigFin"
                :value="rendezVousSelectionne.date_reservation_2" class="form-control" required></flat-pickr>
            </div>
            <div class="mb-3">
              <label for="prix">Prix :</label>
              <p>{{ prix.toFixed(2) }} €</p>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
            <button @click="validerModification" class="btn btn-primary">Valider</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  components: {
    FlatPickr,
  },
  data() {
    return {
      rendezVous: [],
      prix: 0,
      currentDate: new Date().toISOString().split('T')[0],
      token: localStorage.getItem('token'),
      selectedModele: null, // Ajout de cette ligne
      selectedVehicule: null, // Ajout de cette ligne
      modeles: [], // Ajout de cette ligne
      vehicules: [], // Ajout de cette ligne
      rendezVousSelectionne: {
        id: null,
        Categorie: "",
        voiture: "",
        voiture_id: null,
        categorie_id: null,
        date_reservation_1: null,
        date_reservation_2: null,
      },
      dateConfigDebut: {
        minDate: 'today',
        disable: [],
      },
      dateConfigFin: {
        disable: [],
      },
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
    supprimerRendezVous(rendezVousId) {
      // Utilisez une boîte de dialogue ou un autre moyen de confirmer l'annulation
      const confirmation = window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ?");

      if (confirmation) {
        // Effectuez la requête pour annuler la réservation
        axios.put(`http://localhost:3000/annuler-reservation/${rendezVousId}`, {}, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        })
          .then(response => {
            // Mettez à jour la liste des rendez-vous après l'annulation
            console.log(response);
            this.chargerRendezVous();
          })
          .catch(error => {
            console.error(`Erreur lors de l'annulation de la réservation : ${error}`);
          });
      }
    },
    modifierRendezVous(rendezVous) {
      // Set the selected appointment for modification
      this.rendezVousSelectionne.id = rendezVous.id;
      this.rendezVousSelectionne.Categorie = rendezVous.Categorie;
      this.rendezVousSelectionne.categorie_id = rendezVous.categorie_id;
      this.rendezVousSelectionne.voiture = rendezVous.voiture;
      this.rendezVousSelectionne.voiture_id = rendezVous.voiture_id;
      this.rendezVousSelectionne.date_reservation_1 = rendezVous.date_reservation_1;
      this.rendezVousSelectionne.date_reservation_2 = rendezVous.date_reservation_2;

      console.log(this.rendezVousSelectionne.date_reservation_1);
      console.log(this.rendezVousSelectionne.date_reservation_2);

      // Set the selected modele based on rendezVous.Categorie
      this.selectedModele = rendezVous.categorie_id;

      // Fetch vehicules for the selected modele
      this.chargerVehicules();

      // Set the selected vehicule based on rendezVous.voiture
      this.selectedVehicule = rendezVous.voiture_id;

      // Open the Bootstrap modal
      $('#modifierRdvModal').modal('show');
    },
    validerModification() {
      // Vérifiez si la date de fin est supérieure ou égale à la date de début
      if (new Date(this.rendezVousSelectionne.date_reservation_2) < new Date(this.rendezVousSelectionne.date_reservation_1)) {
        alert("La date de fin doit être supérieure ou égale à la date de début.");
        return; // Arrêtez la validation si la condition n'est pas satisfaite
      }

      // Implémentez la logique pour valider et soumettre la modification
      axios.put(`http://localhost:3000/modifier-rendezvous/${this.rendezVousSelectionne.id}`, this.rendezVousSelectionne, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      })
        .then(response => {
          // Fermez la modal Bootstrap après la modification réussie
          $('#modifierRdvModal').modal('hide');
          console.log(response);
          // Rafraîchissez la liste des rendez-vous
          this.chargerRendezVous();
        })
        .catch(error => {
          console.error(`Erreur lors de la modification du rendez-vous : ${error}`);
        });
    },






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
        axios.get(`http://localhost:3000/datesIndisponibles?vehiculeId=${this.rendezVousSelectionne.voiture_id}`)
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
        this.prix = (diffDays + 1) * tarifJournalier;
      } else {
        this.prix = 0;
      }
    },

  },
  mounted() {
    this.chargerRendezVous();
    this.chargerModeles(); // Ajout de cette ligne
  },
  watch: {
    selectedModele: 'chargerVehicules',
    selectedVehicule: 'chargerDatesIndisponibles',
    dateDebut: ['updateDateConfigFin', 'calculerPrix'],
    dateFin: 'calculerPrix',
  },
};
</script>
