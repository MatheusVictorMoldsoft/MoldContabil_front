import store from '../store';
import API from './apiService';

const API_URL = 'http://127.0.0.1:8000/api/v1/auth';

export const authService = {
  async login(email, password) {
    return await store.dispatch('login', { email, password });
  },

  async register(nome, email, senha, empresa_id) {
    try {
      const response = await API.post(`${API_URL}/register`, {
        nome,
        email,
        senha,
        empresa_id,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.detail || "Erro ao criar conta";
    }
  },
  
  async getCurrentUser() {
    try {
      const response = await API.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data?.detail || "Erro ao obter usuário";
    }
  },

  logout() {
    store.dispatch('logout');
  },
};
