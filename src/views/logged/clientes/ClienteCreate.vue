<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <div class="page-header px-6 py-4 rounded-lg">
          <h1 class="text-h4 font-weight-medium">
            Cadastrar Cliente
          </h1>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            elevation="1"
            prepend-icon="mdi-arrow-left"
            @click="$router.push('/clientes')"
            class="text-none px-4"
            rounded
          >
            Voltar
          </v-btn>
        </div>

        <v-card class="mx-4 mt-2 mb-6 rounded-lg" elevation="3">
          <v-alert
            v-if="errorMessage"
            type="error"
            variant="tonal"
            icon="mdi-alert-circle"
            border="start"
            closable
            class="mb-0 rounded-0"
            @click:close="errorMessage = null"
          >
            {{ errorMessage }}
          </v-alert>

          <v-card-text class="pa-6">
            <v-form ref="form" @submit.prevent="createCliente">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="cliente.nome"
                    label="Nome"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="cliente.razao_social"
                    label="Razão Social"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="cliente.cpf_ou_cnpj"
                    label="CPF ou CNPJ"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-combobox
                    v-model="cliente.email"
                    label="Email(s)"
                    multiple
                    chips
                    clearable
                    variant="outlined"
                    :rules="[v => (v && v.length > 0) || 'Informe ao menos um email']"
                  ></v-combobox>
                </v-col>

                <v-col cols="12" class="d-flex justify-end">
                  <v-btn type="submit" color="secondary" :loading="loading" class="px-6 text-none">
                    Cadastrar Cliente
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

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
        email: []
      },
      loading: false,
      errorMessage: null,
      successModal: false,
    };
  },
  methods: {
    async createCliente() {
      this.errorMessage = null;

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
.page-header {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--v-primary-lighten-5, #e3f2fd) 0%, var(--v-surface-base, #0a2559) 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.v-container {
  max-width: 900px;
  margin: auto;
}

:deep(.v-btn.v-btn--density-comfortable) {
  opacity: 0.7;
  transition: opacity 0.2s;
}

:deep(.v-btn.v-btn--density-comfortable:hover) {
  opacity: 1;
}
</style>
