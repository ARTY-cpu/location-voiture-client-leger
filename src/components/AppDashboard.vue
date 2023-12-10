<!-- src/views/Dashboard.vue -->

<template>
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        // Supprimer le token du local storage
        localStorage.removeItem('token');
  
        // Rediriger vers la page de connexion
        this.$router.push('/connexion');
      },
    },
  };
  </script>
  