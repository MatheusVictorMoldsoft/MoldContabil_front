<template>
    <v-container>
      <v-card class="mx-auto" max-width="800">
        <v-card-title class="text-h5 font-weight-bold">
          Suporte
        </v-card-title>
        <v-card-subtitle class="text-subtitle-1">
          Preencha o formulário abaixo para entrar em contato com nossa equipe de suporte.
        </v-card-subtitle>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <!-- Campo Nome -->
            <v-text-field
              v-model="form.nome"
              label="Nome"
              variant="outlined"
              :rules="[(v) => !!v || 'O nome é obrigatório']"
              required
            ></v-text-field>
  
            <!-- Campo E-mail -->
            <v-text-field
              v-model="form.email"
              label="E-mail"
              variant="outlined"
              :rules="[
                (v) => !!v || 'O e-mail é obrigatório',
                (v) => /.+@.+\..+/.test(v) || 'E-mail inválido',
              ]"
              required
            ></v-text-field>
  
            <!-- Campo Tipo de Problema -->
            <v-select
              v-model="form.tipoProblema"
              :items="tiposProblema"
              label="Tipo de Problema"
              variant="outlined"
              :rules="[(v) => !!v || 'O tipo de problema é obrigatório']"
              required
            ></v-select>
  
            <!-- Campo Descrição -->
            <v-textarea
              v-model="form.descricao"
              label="Descrição do Problema"
              variant="outlined"
              :rules="[(v) => !!v || 'A descrição é obrigatória']"
              required
            ></v-textarea>
  
            <!-- Campo Upload de Arquivo -->
            <v-file-input
              v-model="form.arquivo"
              label="Anexar Arquivo (Opcional)"
              variant="outlined"
              :rules="arquivoRules"
              accept=".pdf, .jpg, .png, .docx"
            ></v-file-input>
  
            <!-- Botão de Envio -->
            <v-btn type="submit" color="primary" block class="mt-4">
              Enviar Solicitação
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
          nome: "",
          email: "",
          tipoProblema: null,
          descricao: "",
          arquivo: null,
        },
  
        // Opções para o campo de seleção (Tipo de Problema)
        tiposProblema: [
          "Problema Técnico",
          "Dúvida sobre Funcionalidades",
          "Solicitação de Reembolso",
          "Outro",
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
              [".pdf", ".jpg", ".png", ".docx"].includes(
                value[0].name.slice(value[0].name.lastIndexOf("."))
              ) || "Apenas arquivos PDF, JPG, PNG ou DOCX são permitidos!"
            );
          },
        ],
      };
    },
    methods: {
      // Método para enviar o formulário
      submitForm() {
        if (
          this.form.nome &&
          this.form.email &&
          this.form.tipoProblema &&
          this.form.descricao
        ) {
          console.log("Formulário enviado:", this.form);
  
          // Simulação de envio de dados
          const formData = new FormData();
          formData.append("nome", this.form.nome);
          formData.append("email", this.form.email);
          formData.append("tipoProblema", this.form.tipoProblema);
          formData.append("descricao", this.form.descricao);
          if (this.form.arquivo) {
            formData.append("arquivo", this.form.arquivo[0]);
          }
  
          alert("Solicitação de suporte enviada com sucesso!");
          this.resetForm();
        } else {
          alert("Preencha todos os campos obrigatórios.");
        }
      },
  
      // Método para resetar o formulário
      resetForm() {
        this.form.nome = "";
        this.form.email = "";
        this.form.tipoProblema = null;
        this.form.descricao = "";
        this.form.arquivo = null;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados, se necessário */
  </style>