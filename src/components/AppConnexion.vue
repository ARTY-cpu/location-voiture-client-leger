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
export default {
  data() {
    return {
      erreurConnexion: false,
      email: '',
      mdp: '',
    };
  },
  methods: {
    submitForm() {
      const formData = {
        email: this.email,
        mdp: this.mdp,
      };

      // Utilisez Axios pour effectuer la requête POST
      this.$http.post('/connexion', formData)
        .then(response => response.data)
        .then(data => {
          console.log('Réponse du serveur:', data);

          if (data.success) {  // Vérifiez si la connexion a réussi
            // Sauvegardez le token dans le stockage local
            localStorage.setItem('token', data.token);

            // Exemple de mise à jour du store après une connexion réussie
            this.$store.commit('user/setLoggedIn', true);

            // Redirigez l'utilisateur vers la page d'accueil ou une autre page après la connexion réussie
            this.$router.push('/dashboard');
          } else {
            // Mettez à jour la propriété d'état pour afficher le message d'erreur
            this.erreurConnexion = true;
            console.log('erreurConnexion:', this.erreurConnexion);
            this.messageErreur = data.error || 'Erreur de connexion. Veuillez vérifier vos informations.';

          }
        })
        .catch(error => {
          // Mettez à jour la propriété d'état pour afficher le message d'erreur, fix stupide, car else jamais executé
          //console.error('Erreur lors de la requête:', error);
          if (error.response && error.response.data && error.response.data.error) {
            // Mettez à jour le message d'erreur en fonction de la réponse du serveur
            this.erreurConnexion = true;
            this.messageErreur = error.response.data.error;
          } else {
            // Si la réponse ne contient pas de champ "error", utilisez un message d'erreur générique
            this.erreurConnexion = true;
            this.messageErreur = 'Erreur de connexion. Veuillez vérifier vos informations.';
          }
        });
    },
  },
};
</script>