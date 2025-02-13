<template>
    <v-container>
      <v-card class="mx-auto" max-width="600">
        <v-card-title class="text-h5 font-weight-bold">
          Plano de Contas
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <!-- Campo de Seleção -->
            <v-select
              v-model="form.tipoConta"
              :items="tiposConta"
              label="Selecione a Empresa"
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
  export default {
    data() {
      return {
        // Dados do formulário
        form: {
          tipoConta: null, // Valor selecionado no v-select
          arquivo: null,   // Arquivo selecionado no v-file-input
        },
  
        // Opções para o campo de seleção
        tiposConta: [
          "Conta Corrente",
          "Conta Poupança",
          "Conta Investimento",
          "Conta Salário",
        ],
  
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
      // Método para enviar o formulário
      submitForm() {
        if (this.form.tipoConta && this.form.arquivo) {
          console.log("Formulário enviado:", this.form);
  
          // Simulação de envio de dados
          const formData = new FormData();
          formData.append("tipoConta", this.form.tipoConta);
          formData.append("arquivo", this.form.arquivo[0]);
  
          alert("Formulário enviado com sucesso!");
          this.resetForm();
        } else {
          alert("Preencha todos os campos obrigatórios.");
        }
      },
  
      // Método para resetar o formulário
      resetForm() {
        this.form.tipoConta = null;
        this.form.arquivo = null;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados, se necessário */
  </style>