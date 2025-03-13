import axios from 'axios';
import store from '../store';

const API = axios.create({
   baseURL: 'https://api.moldconsult.online/api/v1',
});

API.interceptors.request.use(
  async (config) => {
    const token = store.getters.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Limpa a sessão e redireciona para a página de login se o token expirar
      store.dispatch('logout');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
