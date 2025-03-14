<template>
  <v-container>
    <h1 class="page-title">Enviar Documentos</h1>

    <!-- Skeleton enquanto loading é true -->
    <v-skeleton-loader
      v-if="loading"
      type="table"
      height="300"
      class="mb-4"
    />

    <div v-else-if="!documentos.length" class="text-center my-5">
      Nenhum documento aguardando envio.</div>
    <!-- Tabela aparece quando loading é false -->
    <v-data-table
      v-else
      v-model="selected"
      :headers="headers"
      :items="documentos"
      item-value="id"
      show-select
      class="elevation-1"
      dense
    >
      <!-- Exibe o chip com a cor baseada em status -->
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getStatusColor(item.status)" small>
          {{ getStatusText(item.status) }}
        </v-chip>
      </template>

      <!-- Formatação para valor -->
      <template v-slot:[`item.valor`]="{ item }">
        R$ {{ item.valor ? item.valor.toFixed(2) : '0.00' }}
      </template>
    </v-data-table>

    <!-- Botão para enviar documentos -->
    <v-btn
      v-if="!loading"
      color="primary"
      class="mt-4"
      :disabled="selected.length === 0"
      @click="enviarDocumentos"
    >
      Enviar Documentos
    </v-btn>
  </v-container>
</template>

<script>
import API from "@/services/apiService";

export default {
  data() {
    return {
      loading: true,
      selected: [],
      documentos: [],
      headers: [
        { title: "ID", key: "id", sortable: true },
        { title: "Conta Débito", key: "conta_debito" },
        { title: "Conta Crédito", key: "conta_credito" },
        { title: "Nome Conta Débito", key: "nome_da_conta_debito" },
        { title: "Nome Conta Crédito", key: "nome_da_conta_credito" },
        { title: "Path File", key: "path_file" },
        { title: "Complemento Histórico", key: "complemento_historico" },
        { title: "Valor", key: "valor" },
        { title: "Nome Documento", key: "nome_documento" },
        { title: "Status", key: "status" },
      ],
    };
  },
  methods: {
    getStatusText(status) {
      if (status === 1) return "Validado";
      if (status === 2) return "Enviado";
      return "Pendente";
    },
    getStatusColor(status) {
      return status === 2 ? "green" : status === 1 ? "blue" : "orange";
    },

    async fetchDocumentos() {
      try {
        const response = await API.get("/enviar/documentos");
        if (Array.isArray(response.data)) {
          this.documentos = response.data;
        } else {
          console.error("Resposta não é array:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
      } finally {
        this.loading = false;
      }
    },

    async enviarDocumentos() {
      if (this.selected.length === 0) {
        alert("Selecione pelo menos um documento.");
        return;
      }

      try {
        const response = await API.put(
          `/validacao/enviar`,
          { document_ids: this.selected },
          { responseType: "blob" }
        );

        this.baixarArquivo(response.data, `documentos_${Date.now()}.txt`);

        alert("Documentos enviados com sucesso!");
        this.selected = [];
        this.fetchDocumentos();
      } catch (error) {
        console.error("Erro ao enviar documentos:", error);
        alert("Erro ao enviar documentos");
      }
    },

    baixarArquivo(blob, filename) {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  },
  mounted() {
    this.fetchDocumentos();
  },
};
</script>

<style scoped>
.page-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>