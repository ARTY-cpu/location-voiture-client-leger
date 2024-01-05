<template>
  <div class="container">
    <div class="card mt-5">
      <div class="card-body">
        <h2 class="card-title">Inscription</h2>
        <!-- Affiche le message de succès si l'inscription a réussi -->
        <div v-if="inscriptionReussie" class="alert alert-success" role="alert">
          Félicitations ! Vous vous êtes inscrit avec succès.
        </div>
        <!-- msg erreur si inscription ko -->
        <div v-if="erreurInscription" class="alert alert-danger" role="alert">
          {{ messageErreur }}
        </div>
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="nom" class="form-label">Nom :</label>
            <input type="text" class="form-control" id="nom" v-model="nom" required>
          </div>
          <div class="mb-3">
            <label for="prenom" class="form-label">Prénom :</label>
            <input type="text" class="form-control" id="prenom" v-model="prenom" required>
          </div>
          <div class="mb-3">
            <label for="adresse" class="form-label">Adresse :</label>
            <input type="text" class="form-control" id="adresse" v-model="adresse" required>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="codePostal" class="form-label">Code Postal :</label>
              <input type="text" class="form-control" id="codePostal" v-model="codePostal" required>
            </div>
            <div class="col-md-6">
              <label for="ville" class="form-label">Ville :</label>
              <input type="text" class="form-control" id="ville" v-model="ville" required>
            </div>
          </div>
          <div class="mb-3">
            <label for="telephone" class="form-label">Numéro de téléphone :</label>
            <input type="tel" class="form-control" id="telephone" v-model="telephone" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email : <i>(Obligatoire)</i></label>
            <input type="email" class="form-control" id="email" v-model="email" required>
          </div>
          <div class="mb-3">
            <label for="mdp" class="form-label">Mot de Passe : <i>(Obligatoire)</i></label>
            <input type="password" class="form-control" id="mdp" v-model="mdp" required>
          </div>
          <button type="submit" class="btn btn-primary">S'inscrire</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      // Ajoutez une propriété pour suivre l'état de l'inscription
      inscriptionReussie: false,
      erreurInscription: false,
      nom: '',
      prenom: '',
      adresse: '',
      codePostal: '',
      ville: '',
      telephone: '',
      email: '',
      mdp: '',
    };
  },
  methods: {
    async submitForm() {
      const formData = {
        nom: this.nom,
        prenom: this.prenom,
        adresse: this.adresse,
        codePostal: this.codePostal,
        ville: this.ville,
        telephone: this.telephone,
        email: this.email,
        mdp: this.mdp,
      };

      try {
        const response = await axios.post('http://localhost:3000/inscription', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Réponse du serveur:', response.data);

        if (response.data.success) {
          this.inscriptionReussie = true;
        } else {
          this.erreurInscription = true;
          this.messageErreur = response.data.error;
          console.error('Erreur lors de l\'inscription:', response.data.error);
        }
      } catch (error) {
        this.erreurInscription = true;
        this.messageErreur = error.message;
        console.error('Erreur lors de la requête:', error);
      }
    },
  },
};
</script>
