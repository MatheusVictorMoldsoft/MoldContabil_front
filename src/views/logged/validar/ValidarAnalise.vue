<template>
  <v-container fluid >
    <div class="page-header px-6 py-4 rounded-lg">
      <h1 class="text-h4 font-weight-medium">
        Documento Detalhado
      </h1>
      <v-spacer></v-spacer>
      <v-btn color="secondary" elevation="1" prepend-icon="mdi-arrow-left" @click="$router.go(-1)"
        class="text-none px-4" rounded>
        Voltar
      </v-btn>
    </div>
    <v-row class="mt-2">
      <!-- Card Esquerdo: Visualização do PDF -->
      <v-col cols="12" md="6">
        <v-card class="pa-3">
          <v-card-title>Visualização do Documento</v-card-title>
          <v-card-text>
            <v-skeleton-loader v-if="loadingPDF" type="image" height="600px" width="100%" />
            <embed v-else :src="pdfBlobUrl" type="application/pdf" width="100%" height="600px" />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Card Direito: Edição dos campos -->
      <v-col cols="12" md="6">
        <v-card class="pa-3">
          <v-card-title>Detalhes do Documento</v-card-title>

          <!-- Skeleton enquanto carrega -->
          <v-card-text v-if="loadingDetails">
            <v-skeleton-loader type="article" width="100%" height="200px" />
          </v-card-text>

          <!-- Dados do documento: exibindo e editando via form -->
          <v-card-text v-else-if="documento">

            <!-- CAMPO: Conta Débito + Nome da Conta Débito -->
            <v-text-field class="mt-3" label="Conta Débito - Fornecedor" v-model="contaDebitoNome"
              @input="atualizarContaDebito"></v-text-field>

            <!-- CAMPO: Conta Crédito + Nome da Conta Crédito -->
            <v-text-field class="mt-3" label="Conta Crédito - Banco" v-model="contaCreditoNome"
              @input="atualizarContaCredito"></v-text-field>

            <!-- CAMPO: Complemento Histórico -->
            <v-text-field class="mt-3" label="Complemento Histórico"
              v-model="form.complemento_historico"></v-text-field>

            <!-- CAMPO: Valor -->
            <v-text-field class="mt-3" label="Valor" type="number" v-model="form.valor"></v-text-field>

            <!-- CAMPO: Nome do Documento -->
            <v-text-field class="mt-3" label="Nome do Documento" v-model="form.nome_documento"></v-text-field>

          </v-card-text>

          <!-- Se o documento for nulo mas não estiver carregando -->
          <v-card-text v-else>
            Não foi possível carregar detalhes do documento.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Botões de Ação -->
    <v-row class="mt-4" justify="end">
      <v-btn color="primary" @click="atualizarDocumento">
        Enviar Alterações
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
      documento: null,
      pdfBlobUrl: null,
      loadingDetails: true,
      loadingPDF: true,
      successModalVisible: false,
      successMessage: "",

      // Form com TODOS os campos do DocumentoUpdate
      form: {
        conta_debito: null,
        conta_credito: null,
        nome_da_conta_debito: null,
        nome_da_conta_credito: null,
        path_file: null,
        complemento_historico: null,
        valor: null,
        nome_documento: null,
        status: null
      },

      // Campos combinados para exibição e edição
      contaDebitoNome: "",
      contaCreditoNome: "",
    };
  },
  computed: {
    docId() {
      return this.$route.params.docId;
    },
  },
  watch: {
    // Atualiza os campos combinados quando os dados são carregados
    documento(newVal) {
      if (newVal) {
        this.contaDebitoNome = `${newVal.conta_debito || ""} - ${newVal.nome_da_conta_debito || ""}`;
        this.contaCreditoNome = `${newVal.conta_credito || ""} - ${newVal.nome_da_conta_credito || ""}`;
      }
    },
  },
  methods: {
    async fetchDocumentoDetalhes() {
      try {
        const response = await API.get(`/validacao/${this.docId}`);
        this.documento = response.data;

        // Preenche o form com os valores vindos do backend
        Object.assign(this.form, response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do documento:", error);
      } finally {
        this.loadingDetails = false;
      }
    },

    async fetchDocumentoArquivo() {
      try {
        const response = await API.get(`/validacao/arquivo/${this.docId}`, {
          responseType: "blob",
        });
        const blob = new Blob([response.data], { type: "application/pdf" });
        this.pdfBlobUrl = URL.createObjectURL(blob);
      } catch (error) {
        console.error("Erro ao buscar arquivo do documento:", error);
      } finally {
        this.loadingPDF = false;
      }
    },

    atualizarContaDebito() {
      const partes = this.contaDebitoNome.split(" - ");
      this.form.conta_debito = partes[0] || null;
      this.form.nome_da_conta_debito = partes[1] || null;
    },

    atualizarContaCredito() {
      const partes = this.contaCreditoNome.split(" - ");
      this.form.conta_credito = partes[0] || null;
      this.form.nome_da_conta_credito = partes[1] || null;
    },

    async atualizarDocumento() {
      try {
        const payload = {};

        if (this.form.conta_debito !== null) payload.conta_debito = this.form.conta_debito;
        if (this.form.conta_credito !== null) payload.conta_credito = this.form.conta_credito;
        if (this.form.nome_da_conta_debito !== null) payload.nome_da_conta_debito = this.form.nome_da_conta_debito;
        if (this.form.nome_da_conta_credito !== null) payload.nome_da_conta_credito = this.form.nome_da_conta_credito;
        if (this.form.path_file !== null) payload.path_file = this.form.path_file;
        if (this.form.complemento_historico !== null) payload.complemento_historico = this.form.complemento_historico;
        if (this.form.valor !== null) payload.valor = parseFloat(this.form.valor);
        if (this.form.nome_documento !== null) payload.nome_documento = this.form.nome_documento;
        if (this.form.status !== null) payload.status = 1;

        const response = await API.put(`/validar/validado/${this.docId}`, payload);

        console.log("Resposta atualização:", response.data);
        this.successMessage = "Documento atualizado com sucesso!";
        this.successModalVisible = true;

        setTimeout(() => {
          this.successModalVisible = false;
          this.$router.go(-1);
        }, 2000);
      } catch (error) {
        console.error("Erro ao atualizar documento:", error);
        alert("Erro ao atualizar documento");
      }
    },
  },
  async mounted() {
    await this.fetchDocumentoDetalhes();
    await this.fetchDocumentoArquivo();
  },
};
</script>
<style scoped>
.page-header {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--v-primary-lighten-5, #e3f2fd) 0%, var(--v-surface-base, #0a2559) 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  margin-bottom: 8px;
}
</style>
