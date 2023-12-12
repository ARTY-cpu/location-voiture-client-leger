<template>
  <footer class="footer fixed-bottom">
    <div class="container">
      <div class="d-flex justify-content-center align-items-center p-3">
        <router-link class="nav-item nav-link" to="/apropos">
          À propos
        </router-link>
        <span class="ml-2">© 2023 Prestige Auto. Tous droits réservés.</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Styles spécifiques au composant */
.footer {
  background-color: #cecece;
  color: #333; /* Couleur du texte */
  padding: 5px 0;
  text-align: center;
}

.footer a {
  text-decoration: none;
  color: #007bff; /* Couleur des liens Bootstrap */
}

.footer a:hover {
  text-decoration: underline;
}

/* Style pour assurer que le texte reste sur une seule ligne */
.footer span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
