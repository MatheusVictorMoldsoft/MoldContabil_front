<template>
    <v-app>
        <!-- Menu lateral -->
        <v-navigation-drawer v-model="drawer" app :rail="miniVariant" @mouseover="miniVariant = false"
            @mouseleave="miniVariant = true" rail-width="64">
            <!-- Navbar do menu lateral -->
            <v-toolbar color="white" dark>
                <v-toolbar-title class="d-flex align-center">
                    <img src="/images/logo.png" alt="Logo da Empresa" class="logo" />
                </v-toolbar-title>
            </v-toolbar>

            <!-- Itens do menu -->
            <v-list>
                <v-list-item v-for="(item, index) in menuItems" :key="index" :to="item.route" :prepend-icon="item.icon"
                    :title="item.title">
                </v-list-item>
            </v-list>

            <!-- Botão de Perfil e Logout -->
            <template v-slot:append>
                <v-list-item to="/perfil" prepend-icon="mdi-cog" title="Perfil">
                </v-list-item>
                <v-list-item @click="logout" prepend-icon="mdi-logout" title="Logout">
                </v-list-item>
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
                { title: 'Home', icon: 'mdi-home', route: '/' },
                { title: 'Validar', icon: 'mdi-check', route: '/validar' },
                { title: 'Enviar', icon: 'mdi-send', route: '/enviar' },
                { title: 'Plano de Contas', icon: 'mdi-chart-bar', route: '/plano-de-contas' },
                { title: 'Suporte', icon: 'mdi-help-circle', route: '/suporte' },
            ],
        };
    },
    methods: {
        toggleMiniVariant() {
            this.miniVariant = !this.miniVariant; // Alterna entre menu minimizado e expandido
        },
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
.logo {
    max-width: 150px;
    /* Define a largura máxima da logo */
    max-height: 50px;
    /* Define a altura máxima da logo */
    width: auto;
    /* Mantém a proporção da imagem */
    height: auto;
    /* Mantém a proporção da imagem */
}

/* Estilos para o menu minimizado */
.v-navigation-drawer--rail .v-list-item__content {
    display: none;
    /* Oculta o texto dos itens do menu */
}

.v-navigation-drawer--rail .v-toolbar__title {
    display: none;
    /* Oculta o título do navbar do menu */
}

.v-navigation-drawer--rail .v-list-item__icon {
    margin-right: 0;
    /* Remove o espaçamento dos ícones */
}
.v-toolbar__title {
  display: flex;
  align-items: center;
}
</style>