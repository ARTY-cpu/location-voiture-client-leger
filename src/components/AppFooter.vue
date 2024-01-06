<!-- AppFooter.vue -->

<template>
  <footer class="footer">
    <div class="container">
      <div class="d-flex justify-content-center align-items-center p-3">
        <router-link class="nav-item nav-link" to="/apropos">
          À propos
        </router-link>
        <span class="ml-2">© 2023 Prestige Auto.</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth <= 992;
    },
  },
};
</script>

<style scoped>
.footer {
  background-color: #cecece;
  color: #333;
  padding: 5px 0;
  text-align: center;
}

.footer a {
  text-decoration: none;
  color: #007bff;
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

/* Media query pour desktop */
@media screen and (min-width: 992px) {
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
