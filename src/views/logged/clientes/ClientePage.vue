<template>
    <v-container>
      <v-card class="pa-5" elevation="3">
        <v-card-title>
          Lista de Clientes
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="goToCreate" outlined>
            <v-icon left>mdi-plus</v-icon>
            Adicionar
          </v-btn>
        </v-card-title>
  
        <v-alert v-if="errorMessage" type="error" class="mb-4">
          {{ errorMessage }}
        </v-alert>
        <v-alert v-if="successMessage" type="success" class="mb-4">
          {{ successMessage }}
        </v-alert>
  
        <v-data-table :headers="headers" :items="clientes" class="mt-4">
          <template v-slot:[`item.acao`]="{ item }">
            <v-btn icon color="blue" @click="editarCliente(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import API from "@/services/apiService"; // Importa API centralizada
  
  export default {
    name: "ClientesPage",
    data() {
      return {
        clientes: [],
        errorMessage: null,
        successMessage: null,
        headers: [
          { text: "Nome", value: "nome" },
          { text: "CPF", value: "cpf" },
          { text: "Email", value: "email" },
          { text: "Ativo", value: "ativo" },
          { text: "Ações", value: "acao", sortable: false },
        ],
      };
    },
    methods: {
      async fetchClientes() {
        try {
          const response = await API.get("/cliente/clientes"); // Usa API centralizada
          this.clientes = response.data;
        } catch (error) {
          this.errorMessage = "Erro ao carregar clientes.";
        }
      },
      editarCliente(cliente) {
        this.$router.push(`/clientes/edit/${cliente.id}`);
      },
      goToCreate() {
        this.$router.push("/clientes/create");
      },
    },
    mounted() {
      this.fetchClientes();
    },
  };
  </script>
  
  <style scoped>
  .v-container {
    max-width: 800px;
    margin: auto;
    padding-top: 20px;
  }
  </style>
  