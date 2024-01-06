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
import AppModeles from '@/components/AppModeles.vue';

const routes = [
  // routes existantes
  {
    path: '/:catchAll(.*)', //routes inexistantes redirigées vers l'accueil
    redirect: '/',
  },
  {
    path: '/',
    name: 'Accueil',
    component: AppAccueil,
  }, {
    path: '/modeles',
    name: 'Modèles',
    component: AppModeles,
  },
  {
    path: '/reservation',
    name: 'Réservation',
    component: AppReservation,
    meta: { requiresAuth: true }, // route necessite auth
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
    meta: { requiresAuth: true }, // route necessite auth
  },
  {
    path: '/options',
    name: 'Options',
    component: AppOptions,
    meta: { requiresAuth: true }, // route necessite auth
  },
  {
    path: '/supervisor',
    name: 'Supervisor',
    component: AppSupervisor,
    meta: { requiresAuth: true }, // route necessite auth
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