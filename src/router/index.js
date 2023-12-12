// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import AppAccueil from '@/components/AppAccueil.vue';
import AppReservation from '@/components/AppReservation.vue';
import AppContact from '@/components/AppContact.vue';
import AppApropos from '@/components/AppApropos.vue';
import AppInscription from '@/components/AppInscription.vue';
import AppConnexion from '@/components/AppConnexion.vue';
import AppDashboard from '@/components/AppDashboard.vue';
import AppOptions from '@/components/AppOptions.vue';
import AppSupervisor from '@/components/AppSupervisor.vue';

const routes = [
  // ... (tes routes existantes)
  {
    path: '/:catchAll(.*)', //routes inexistantes redirigées vers l'accueil
    redirect: '/',
  },
  {
    path: '/',
    name: 'Accueil',
    component: AppAccueil,
  },
  {
    path: '/reservation',
    name: 'Réservation',
    component: AppReservation,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: AppContact,
  },
  {
    path: '/apropos',
    name: 'A propos',
    component: AppApropos,
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
  {
    path: '/options',
    name: 'Options',
    component: AppOptions,
    meta: { requiresAuth: true }, // Indique que cette route nécessite une authentification
  },
  {
    path: '/supervisor',
    name: 'Supervisor',
    component: AppSupervisor,
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