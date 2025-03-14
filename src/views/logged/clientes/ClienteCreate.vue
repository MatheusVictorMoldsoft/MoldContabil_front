<template>
  <v-container>
    <v-card class="pa-5" elevation="3">
      <v-card-title>Cadastrar Cliente</v-card-title>

      <v-alert v-if="errorMessage" type="error" class="mb-4">
        {{ errorMessage }}
      </v-alert>

      <v-form ref="form" @submit.prevent="createCliente">
        <v-text-field
          v-model="cliente.nome"
          label="Nome"
          variant="outlined"
          required
        ></v-text-field>

        <v-text-field
          v-model="cliente.razao_social"
          label="Razão Social"
          variant="outlined"
          required
        ></v-text-field>

        <v-text-field
          v-model="cliente.cpf_ou_cnpj"
          label="CPF ou CNPJ"
          variant="outlined"
          required
          v-mask="'###.###.###-##'"
        ></v-text-field>

        <v-combobox
          v-model="cliente.email"
          label="Email(s)"
          multiple
          chips
          clearable
          variant="outlined"
          :rules="[v => (v && v.length > 0) || 'Informe ao menos um email']"
        ></v-combobox>

        <v-btn type="submit" color="primary" block :loading="loading">
          Cadastrar Cliente
        </v-btn>
      </v-form>
    </v-card>

    <!-- Modal de Sucesso -->
    <v-dialog v-model="successModal" max-width="400px">
      <v-card>
        <v-card-title class="headline">Sucesso</v-card-title>
        <v-card-text>
          Cliente cadastrado com sucesso!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeModal">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import API from "@/services/apiService";

export default {
  name: "ClientesCreate",
  data() {
    return {
      cliente: {
        nome: "",
        razao_social: "",
        cpf_ou_cnpj: "",
        email: []  // Agora é um array de emails
      },
      loading: false,
      errorMessage: null,
      successModal: false,
    };
  },
  methods: {
    async createCliente() {
      this.errorMessage = null;

      // Validação básica
      if (!this.cliente.nome || !this.cliente.razao_social || !this.cliente.cpf_ou_cnpj) {
        this.errorMessage = "Nome, Razão Social e CPF/CNPJ são obrigatórios.";
        return;
      }
      if (!this.cliente.email.length) {
        this.errorMessage = "Informe ao menos um email.";
        return;
      }

      this.loading = true;
      try {
        // Envia os dados para a API sem o campo empresa_id
        await API.post("/cliente", this.cliente);
        this.successModal = true;
      } catch (error) {
        this.errorMessage =
          error.response?.data?.detail || "Erro ao cadastrar cliente.";
      } finally {
        this.loading = false;
      }
    },
    closeModal() {
      this.successModal = false;
      this.$router.push("/clientes");
    },
  },
};
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: auto;
  padding-top: 20px;
}
</style>
