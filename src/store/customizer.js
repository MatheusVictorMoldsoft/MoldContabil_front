import { defineStore } from 'pinia';
import config from '../config';

export const useCustomizerStore = defineStore('customizer', {
  state: () => ({
    Sidebar_drawer: config.Sidebar_drawer,
    Customizer_drawer: config.Customizer_drawer,
    mini_sidebar: config.mini_sidebar,
    fontTheme: config.fontTheme,
    inputBg: config.inputBg,
  }),

  getters: {}, // Getters podem ser adicionados aqui, se necessário

  actions: {
    SET_SIDEBAR_DRAWER() {
      this.Sidebar_drawer = !this.Sidebar_drawer;
    },
    SET_MINI_SIDEBAR(payload) {
      this.mini_sidebar = payload;
    },
    SET_CUSTOMIZER_DRAWER(payload) {
      this.Customizer_drawer = payload;
    },
    SET_FONT(payload) {
      this.fontTheme = payload;
    },
  },
});