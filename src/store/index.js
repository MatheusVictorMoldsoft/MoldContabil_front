import { createStore } from 'vuex';
import axios from 'axios';
import API from '../services/apiService'; // Nosso axios com interceptor

const API_URL = 'http://127.0.0.1:8000/api/v1/auth';

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
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      try {
        const response = await axios.post(`${API_URL}/login`, formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        const { access_token } = response.data;
        commit('SET_TOKEN', access_token);
        // Após login, busca os dados do usuário
        await dispatch('fetchUser');
        return true;
      } catch (error) {
        throw error.response?.data?.detail || "Erro ao realizar login";
      }
    },
    async fetchUser({ commit }) {
      try {
        const response = await API.get('/auth/me');
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
