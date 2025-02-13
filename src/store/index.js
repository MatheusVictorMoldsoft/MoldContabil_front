import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
  },
  mutations: {
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, user) {
      // Aqui você pode simular uma autenticação bem-sucedida
      commit('SET_AUTHENTICATED', true);
      commit('SET_USER', user);
    },
    logout({ commit }) {
      commit('SET_AUTHENTICATED', false);
      commit('SET_USER', null);
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
  },
});