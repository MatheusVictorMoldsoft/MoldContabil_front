<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <div class="page-header px-6 py-4 rounded-lg">
          <h1 class="text-h4 font-weight-medium">
            Plano de Contas
          </h1>
          <v-spacer></v-spacer>
          <!-- <v-btn
            color="secondary"
            elevation="1"
            prepend-icon="mdi-arrow-left"
            @click="$router.go(-1)"
            class="text-none px-4"
            rounded
          >
            Voltar
          </v-btn> -->
        </div>

        <v-card class="mx-4 mt-2 mb-6 rounded-lg" elevation="3">
          <!-- Alertas de Erro e Sucesso -->
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

          <v-alert
            v-if="successMessage"
            type="success"
            variant="tonal"
            icon="mdi-check-circle"
            border="start"
            closable
            class="mb-0 rounded-0"
            @click:close="successMessage = null"
          >
            {{ successMessage }}
          </v-alert>

          <v-card-text class="pa-4">
            <v-form ref="form" @submit.prevent="submitForm">
              <v-row class="mb-2">
                <!-- Campo de Seleção do Cliente -->
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="form.cliente"
                    :items="clientes"
                    item-title="nome"
                    item-value="id"
                    label="Selecione o Cliente"
                    variant="outlined"
                    required
                  ></v-select>
                </v-col>

                <!-- Campo de Upload de Arquivo -->
                <v-col cols="12" sm="6">
                  <v-file-input
                    v-model="form.arquivo"
                    label="Anexar Arquivo (Apenas formato XLSX)"
                    variant="outlined"
                    :rules="arquivoRules"
                    accept=".xlsx"
                    multiple
                    required
                  ></v-file-input>
                </v-col>
              </v-row>

              <!-- Botão de Envio -->
              <v-row justify="end">
                <v-btn
                  type="submit"
                  color="secondary"
                  class="text-none px-6"
                  :loading="loading"
                >
                  Enviar
                </v-btn>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "@/services/apiService";

export default {
  name: "PlanoUpload",
  data() {
    return {
      form: {
        cliente: null,
        arquivo: null,
      },
      clientes: [],
      loading: false,
      errorMessage: null,
      successMessage: null,
      arquivoRules: [
        (value) => {
          if (!value || !value.length) return true;
          const file = value[0];
          return file.size < 500_000_000 || "O arquivo deve ter menos de 500MB!";
        },
        (value) => {
          if (!value || !value.length) return true;
          const file = value[0];
          const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
          return extension === ".xlsx" || "Apenas arquivos XLSX são permitidos!";
        },
      ],
    };
  },
  methods: {
    async fetchClientes() {
      try {
        const response = await API.get("/clientes");
        this.clientes = response.data;
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      }
    },
    async submitForm() {
      if (!this.form.cliente || !this.form.arquivo) {
        this.errorMessage = "Preencha todos os campos obrigatórios.";
        return;
      }
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append("arquivo", this.form.arquivo[0], this.form.arquivo[0].name);

        const url = `/plano/importar?id_cliente=${this.form.cliente}`;
        await API.post(url, formData, {
          timeout: 600000,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.successMessage = "Formulário enviado com sucesso!";
        this.resetForm();
      } catch (error) {
        this.errorMessage = "Erro ao enviar formulário.";
        console.error("Erro ao enviar formulário:", error);
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.form.cliente = null;
      this.form.arquivo = null;
    },
  },
  mounted() {
    this.fetchClientes();
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

:deep(.v-btn.v-btn--density-comfortable) {
  opacity: 0.7;
  transition: opacity 0.2s;
}

:deep(.v-btn.v-btn--density-comfortable:hover) {
  opacity: 1;
}
</style>
