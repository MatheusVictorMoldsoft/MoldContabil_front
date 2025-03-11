<template>
  <v-container>
    <v-card class="mx-auto" max-width="600">
      <v-card-title class="text-h5 font-weight-bold">
        Plano de Contas
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <!-- Campo de Seleção do Cliente -->
          <v-select
            v-model="form.cliente"
            :items="clientes"
            item-title="nome"
            item-value="id"
            label="Selecione o Cliente"
            variant="outlined"
            required
          ></v-select>

          <!-- Campo de Upload de Arquivo -->
          <v-file-input
            v-model="form.arquivo"
            label="Anexar Arquivo"
            variant="outlined"
            :rules="arquivoRules"
            accept=".pdf, .xlsx, .csv"
            required
          ></v-file-input>

          <!-- Botão de Envio -->
          <v-btn type="submit" color="primary" block class="mt-4">
            Enviar
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import API from "@/services/apiService"; // Importando a API centralizada

export default {
  data() {
    return {
      // Dados do formulário
      form: {
        cliente: null, // Cliente selecionado
        arquivo: null, // Arquivo selecionado
      },

      // Lista de clientes carregada da API
      clientes: [],

      // Regras de validação para o campo de arquivo
      arquivoRules: [
        (value) => {
          return (
            !value ||
            !value.length ||
            value[0].size < 5000000 || // Limite de 5MB
            "O arquivo deve ter menos de 5MB!"
          );
        },
        (value) => {
          return (
            !value ||
            !value.length ||
            [".pdf", ".xlsx", ".csv"].includes(
              value[0].name.slice(value[0].name.lastIndexOf("."))
            ) || "Apenas arquivos PDF, XLSX ou CSV são permitidos!"
          );
        },
      ],
    };
  },
  methods: {
    // Busca clientes da API ao carregar a página
    async fetchClientes() {
      try {
        const response = await API.get("/cliente/clientes");
        this.clientes = response.data;
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      }
    },

    // Método para enviar o formulário
    async submitForm() {
      if (this.form.cliente && this.form.arquivo) {
        console.log("Formulário enviado:", this.form);

        // Monta os dados do formulário
        const formData = new FormData();
        formData.append("cliente_id", this.form.cliente); // Envia o ID do cliente
        formData.append("arquivo", this.form.arquivo[0]);

        try {
          await API.post("/plano-de-contas", formData);
          alert("Formulário enviado com sucesso!");
          this.resetForm();
        } catch (error) {
          console.error("Erro ao enviar formulário:", error);
          alert("Erro ao enviar formulário.");
        }
      } else {
        alert("Preencha todos os campos obrigatórios.");
      }
    },

    // Método para resetar o formulário
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
/* Estilos personalizados, se necessário */
</style>
