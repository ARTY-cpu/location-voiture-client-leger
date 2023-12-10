// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import AppAccueil from '@/components/AppAccueil.vue';
import AppInscription from '@/components/AppInscription.vue';
import AppConnexion from '@/components/AppConnexion.vue';
import AppDashboard from '@/components/AppDashboard.vue';

const routes = [
  // ... (tes routes existantes)
  {
    path: '/',
    name: 'Accueil',
    component: AppAccueil,
  },
  {
    path: '/inscription',
    name: 'Inscription',
    component: AppInscription,
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: AppConnexion,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: AppDashboard,
    meta: { requiresAuth: true }, // Indique que cette route nécessite une authentification
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  // Vérifier si la route nécessite une authentification
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');

    // Si le token n'est pas présent, rediriger vers la page de connexion
    if (!token) {
      next('/connexion');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
