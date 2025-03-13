import { createStore } from 'vuex';
import API from '../services/apiService';

const store = createStore({
  state: {
    accessToken: localStorage.getItem('access_token') || null,
    user: null,
  },
  mutations: {
    SET_TOKEN(state, accessToken) {
      state.accessToken = accessToken;
      localStorage.setItem('access_token', accessToken);
    },
    CLEAR_TOKEN(state) {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem('access_token');
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    async login({ commit, dispatch }, { email, password }) {
      try {
        const response = await API.post('/usuario/login', { email, senha: password });
        const { access_token } = response.data;
        commit('SET_TOKEN', access_token);
        await dispatch('fetchUser');
        return true;
      } catch (error) {
        throw error.response?.data?.detail || "Erro ao realizar login";
      }
    },
    async fetchUser({ commit }) {
      try {
        const response = await API.get('/usuario/me');
        commit('SET_USER', response.data);
      } catch (error) {
        commit('CLEAR_TOKEN');
        throw error;
      }
    },
    logout({ commit }) {
      commit('CLEAR_TOKEN');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    accessToken: (state) => state.accessToken,
    currentUser: (state) => state.user,
  },
});

export default store;
