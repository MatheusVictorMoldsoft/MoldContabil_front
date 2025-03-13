<template>
  <v-container>
    <v-card class="mx-auto" max-width="600">
      <v-card-title class="text-h5 font-weight-bold">
        Plano de Contas
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="submitForm">
          <!-- Campo de Seleção do Cliente -->
          <v-select v-model="form.cliente" :items="clientes" item-title="nome" item-value="id"
            label="Selecione o Cliente" variant="outlined" required></v-select>

          <!-- Campo de Upload de Arquivo -->
          <v-file-input v-model="form.arquivo" label="Anexar Arquivo" variant="outlined" :rules="arquivoRules"
            accept=".xlsx" multiple required></v-file-input>


          <!-- Botão de Envio -->
          <v-btn type="submit" color="primary" block class="mt-4" :loading="loading">
            Enviar
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import API from "@/services/apiService";

export default {
  name: "PlanoUpload",
  data() {
    return {
      form: {
        cliente: null, // ID do cliente
        arquivo: null, // Arquivo selecionado (array)
      },
      clientes: [],
      loading: false,
      errorMessage: null,
      arquivoRules: [
        // Verifica tamanho (exemplo: 500 MB)
        (value) => {
          if (!value || !value.length) return true;
          const file = value[0];
          return file.size < 500_000_000 || "O arquivo deve ter menos de 500MB!";
        },
        // Verifica extensão .xlsx
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
        alert("Preencha todos os campos obrigatórios.");
        return;
      }
      this.loading = true;
      try {
        // Monta o FormData com o arquivo
        const formData = new FormData();
        // v-file-input retorna um array, então usamos o primeiro arquivo
        formData.append("arquivo", this.form.arquivo[0], this.form.arquivo[0].name);

        // Constrói a URL com o query param id_cliente
        const url = `/plano/importar?id_cliente=${this.form.cliente}`;
        const response = await API.post(url, formData, {
          timeout: 600000, // 10 minutos
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Formulário enviado com sucesso!");
        console.log("Resposta do servidor:", response.data);
        this.resetForm();
      } catch (error) {
        console.error("Erro ao enviar formulário:", error);
        alert("Erro ao enviar formulário.");
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
.v-container {
  max-width: 600px;
  margin: auto;
  padding-top: 20px;
}
</style>
