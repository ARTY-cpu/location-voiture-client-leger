<template>
  <footer class="footer text-secondary text-center text-lg-start fixed-bottom">
    <div class="d-flex justify-content-start align-items-center p-3 container mx-auto">
      <router-link class="nav-item nav-link" to="/apropos">À propos</router-link>
      <span>© 2023 Prestige Auto. Tous droits réservés.</span>
    </div>
  </footer>
</template>

<style scoped>
/* Styles spécifiques au composant */
footer {
  padding: 5px 0;
  background-color: #cecece; /* Couleur de fond Bootstrap light */
}

/* Style pour assurer que le texte reste sur une seule ligne */
footer span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
