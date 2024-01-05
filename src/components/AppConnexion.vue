<!-- AppConnexion.vue -->

<template>
  <div class="container">
    <div class="card mt-5">
      <div class="card-body">
        <h2 class="card-title">Connexion</h2>
        <div v-if="erreurConnexion" class="alert alert-danger" role="alert">
          {{ messageErreur }}
        </div>
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="email" class="form-label">Email :</label>
            <input type="email" class="form-control" id="email" v-model="email" required>
          </div>
          <div class="mb-3">
            <label for="mdp" class="form-label">Mot de Passe :</label>
            <input type="password" class="form-control" id="mdp" v-model="mdp" required>
          </div>
          <button type="submit" class="btn btn-primary">Se Connecter</button>
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
      erreurConnexion: false,
      email: '',
      mdp: '',
      messageErreur: '',
    };
  },
  methods: {
    async submitForm() {
      const formData = {
        email: this.email,
        mdp: this.mdp,
      };

      try {
        const response = await axios.post('/connexion', formData);
        const data = response.data;

        if (data.success) {
          localStorage.setItem('token', data.token);
          this.$store.commit('user/setLoggedIn', true);
          this.$router.push('/dashboard');
        } else {
          this.erreurConnexion = true;
          this.messageErreur = data.error || 'Erreur de connexion. Veuillez vérifier vos informations.';
        }
      } catch (error) {
        this.erreurConnexion = true;
        this.messageErreur = error.response?.data?.error || 'Erreur de connexion. Veuillez vérifier vos informations.';
      }
    },
  },
};
</script>