<template>
  <v-container fluid>
    <v-row>
      <!-- Card Esquerdo: Exibição do PDF -->
      <v-col cols="12" md="6">
        <v-card class="pa-3">
          <v-card-title>Visualização do Documento</v-card-title>
          <v-card-text>
            <!-- Se ainda estiver carregando, mostra skeleton -->
            <v-skeleton-loader v-if="loadingPDF" type="image" height="600px" width="100%" />
            <!-- Caso contrário, mostra o embed PDF -->
            <embed v-else :src="pdfBlobUrl" type="application/pdf" width="100%" height="600px" />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Card Direito: Detalhes do Documento -->
      <v-col cols="12" md="6">
        <v-card class="pa-3">
          <v-card-title>Detalhes do Documento</v-card-title>

          <!-- Se ainda estiver carregando, mostra skeleton -->
          <v-card-text v-if="loadingDetails">
            <v-skeleton-loader type="article" width="100%" height="200px" />
          </v-card-text>

          <!-- Caso contrário, exibe detalhes do documento -->
          <v-card-text v-else-if="documento">
            <p><strong>ID:</strong> {{ documento.id }}</p>
            <p><strong>Conta Débito:</strong> {{ documento.conta_debito }}</p>
            <p><strong>Conta Crédito:</strong> {{ documento.conta_credito }}</p>
            <p><strong>Valor:</strong> R$ {{ documento.valor.toFixed(2) }}</p>
            <p>
              <strong>Nome do Documento:</strong>
              {{ formatDocumentoPath(documento.nome_documento) }}
            </p>
            <p><strong>Status:</strong> {{ getStatusText(documento.status) }}</p>
          </v-card-text>

          <!-- Se o documento for nulo mas não estiver carregando, exibe mensagem -->
          <v-card-text v-else>
            Não foi possível carregar detalhes do documento.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Botões de Ação -->
    <v-row class="mt-4" justify="end">
      <v-btn @click="validar" color="primary">
        Validar
      </v-btn>
    </v-row>

    <!-- Modal de Sucesso -->
    <v-dialog v-model="successModalVisible" persistent max-width="400px">
      <v-card>
        <v-card-title class="headline">Sucesso!</v-card-title>
        <v-card-text>{{ successMessage }}</v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import API from "@/services/apiService";

export default {
  data() {
    return {
      documento: null,             // Dados do documento
      pdfBlobUrl: null,            // URL Blob do PDF
      successModalVisible: false,  // Modal de sucesso
      successMessage: "",

      loadingDetails: true,        // Carregamento dos dados do documento
      loadingPDF: true,            // Carregamento do PDF
    };
  },
  computed: {
    docId() {
      return this.$route.params.docId;
    },
  },
  methods: {
    getStatusText(status) {
      return status === 0 ? "Pendente" : "Aprovado";
    },
    formatDocumentoPath(path) {
      if (!path) return "";
      return path.split(/[\\/]/).pop();
    },

    async fetchDocumentoDetalhes() {
      try {
        const response = await API.get(`/validacao/${this.docId}`);
        this.documento = response.data;
      } catch (error) {
        console.error("Erro ao buscar detalhes do documento:", error);
      } finally {
        this.loadingDetails = false;
      }
    },

    async fetchDocumentoArquivo() {
      try {
        const response = await API.get(`/validacao/arquivo/${this.docId}`, { responseType: "blob" });
        const blob = new Blob([response.data], { type: "application/pdf" });
        this.pdfBlobUrl = URL.createObjectURL(blob);
      } catch (error) {
        console.error("Erro ao buscar arquivo do documento:", error);
      } finally {
        this.loadingPDF = false;
      }
    },

    async validar() {
      if (!this.documento) return;
      try {
        const payload = { document_ids: [this.documento.id] };
        const response = await API.put(`/validacao/enviar/${this.documento.id}`, payload);
        console.log("Resposta validação:", response.data);

        this.successMessage = "Documento validado com sucesso!";
        this.successModalVisible = true;

        setTimeout(() => {
          this.successModalVisible = false;
          this.$router.push(`/validar/${this.documento.id_cliente}`);
        }, 4000);

        this.documento.status = 1;
      } catch (error) {
        console.error("Erro ao validar documento:", error);
        alert("Erro ao validar documento");
      }
    },
  },
  async mounted() {
    // Carrega dados e PDF em paralelo ou sequência
    await this.fetchDocumentoDetalhes();
    await this.fetchDocumentoArquivo();
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
