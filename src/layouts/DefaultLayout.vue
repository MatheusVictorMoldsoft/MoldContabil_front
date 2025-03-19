<template>
    <v-app>
      <!-- Menu lateral -->
      <v-navigation-drawer
        v-model="drawer"
        app
        :rail="miniVariant"
        @mouseover="miniVariant = false"
        @mouseleave="miniVariant = true"
        rail-width="64"
        color="#0a2559"
      >
        <!-- Navbar do menu lateral -->
        <v-toolbar color="#0a2559" dark flat>
          <div :class="['logo-wrapper', { 'logo-wrapper-mini': miniVariant }]">
            <img
              :src="miniVariant ? '/images/Ativo1.png' : '/images/Ativo4.png'"
              alt="Logo da Empresa"
              :class="['logo', { 'logo-mini': miniVariant }]"
            />
          </div>
        </v-toolbar>
  
        <!-- Itens do menu -->
        <v-list>
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.route"
            :prepend-icon="item.icon"
            :title="item.title"
            class="menu-item"
          ></v-list-item>
        </v-list>
  
        <!-- Botão de Perfil e Logout -->
        <template v-slot:append>
          <!-- <v-list-item to="/perfil" prepend-icon="mdi-cog" title="Perfil" class="menu-item"></v-list-item> -->
          <v-list-item @click="logout" prepend-icon="mdi-logout" title="Logout" class="menu-item"></v-list-item>
        </template>
      </v-navigation-drawer>
  
      <!-- Conteúdo principal -->
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawer: true, // Menu sempre visível
        miniVariant: true, // Menu minimizado por padrão
        menuItems: [
          { title: "Home", icon: "mdi-home", route: "/" },
          { title: "Validar", icon: "mdi-check", route: "/validar" },
          { title: "Enviar", icon: "mdi-send", route: "/enviar" },
          { title: "Plano de Contas", icon: "mdi-chart-bar", route: "/plano-de-contas" },
          { title: "Clientes", icon: "mdi-account-group", route: "/clientes" },
          // { title: "Suporte", icon: "mdi-help-circle", route: "/suporte" },
        ],
      };
    },
    methods: {
      toggleMiniVariant() {
        this.miniVariant = !this.miniVariant;
      },
      logout() {
        this.$store.dispatch("logout");
        this.$router.push("/login");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilização padrão da logo quando o menu está expandido */
  .logo {
    max-width: 150px;
    max-height: 50px;
    width: auto;
    height: auto;
  }
  
  /* Reduz o tamanho da logo no modo minimizado */
  .logo-mini {
    max-width: 40px;
    max-height: 40px;
  }
  
  /* Container padrão da logo no modo expandido */
  .logo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    padding: 10px;
  }
  
  /* Quando o menu está minimizado, ajustamos a posição da logo */
  .logo-wrapper-mini {
    width: 64px; /* Igual ao rail-width */
    padding: 5px; /* Reduz o padding para centralizar melhor */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Oculta o texto dos itens do menu no modo minimizado */
  .v-navigation-drawer--rail .v-list-item__content {
    display: none;
  }
  
  /* Remove o espaçamento dos ícones */
  .v-navigation-drawer--rail .v-list-item__icon {
    margin-right: 0;
  }
  </style>
  