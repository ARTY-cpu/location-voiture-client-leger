// src/store/index.js

import { createStore } from 'vuex';

const store = createStore({
  modules: {
    user: {
      namespaced: true,
      state: {
        isLoggedIn: false,
        token: null,
      },
      mutations: {
        setLoggedIn(state, value) {
          state.isLoggedIn = value;
        },
        setToken(state, token) {
            state.token = token;
          },
      },
    },
  },
});

export default store;
