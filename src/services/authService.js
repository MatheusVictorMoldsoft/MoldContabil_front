import store from '../store';
import API from './apiService';

export const authService = {
  async login(email, password) {
    try {
      const response = await API.post('/usuario/login', {
        email: email,
        senha: password,
      });

      const { access_token } = response.data;

      if (access_token) {
        store.commit('SET_TOKEN', access_token);
        await store.dispatch('fetchUser'); // Obtém os dados do usuário após login
        return true;
      }
      return false;
    } catch (error) {
      throw error.response?.data?.detail || "Erro ao efetuar login";
    }
  },

  async register(nome, email, senha, empresa_id) {
    try {
      const response = await API.post('/usuario', {
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
      const response = await API.get('/usuario/me');
      return response.data;
    } catch (error) {
      throw error.response?.data?.detail || "Erro ao obter usuário";
    }
  },

  logout() {
    store.dispatch('logout');
  },
};
