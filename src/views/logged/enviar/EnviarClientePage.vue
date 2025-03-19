<template>
    <v-container fluid class="fill-height pa-0">
      <v-row no-gutters>
        <v-col cols="12">
          <div class="page-header px-6 py-4 rounded-lg">
            <h1 class="text-h4 font-weight-medium">
              Enviar Documentos
            </h1>
            <v-spacer></v-spacer>
            <v-btn
              color="secondary"
              elevation="1"
              prepend-icon="mdi-arrow-left"
              @click="$router.go(-1)"
              class="text-none px-4"
              rounded
            >
              Voltar
            </v-btn>
          </div>
  
          <v-card class="mx-4 mt-2 mb-6 rounded-lg" elevation="3">
            <v-card-text class="pa-6">
              <!-- Exibe skeleton se estiver carregando -->
              <v-skeleton-loader v-if="loading" type="table-row" :lines="5" class="mb-4" />
  
              <!-- Mensagem caso não haja documentos -->
              <v-alert v-else-if="!documentos.length" type="info" variant="tonal" class="mb-4">
                Nenhum documento aguardando envio.
              </v-alert>
  
              <!-- Tabela de documentos -->
              <v-data-table
                v-else
                v-model="selected"
                :headers="headers"
                :items="documentos"
                item-value="id"
                show-select
                class="clickable-table elevation-1 rounded-lg"
                hover
                no-data-text="Nenhum documento encontrado"
              >
                <template v-slot:[`item.status`]="{ item }">
                  <v-chip :color="getStatusColor(item.status)" size="small" class="text-caption" variant="tonal">
                    {{ getStatusText(item.status) }}
                  </v-chip>
                </template>
  
                <template v-slot:[`item.valor`]="{ item }">
                  R$ {{ item.valor ? item.valor.toFixed(2) : '0.00' }}
                </template>
              </v-data-table>
  
              <!-- Botão para enviar documentos -->
              <v-row class="mt-4" justify="end">
                <v-btn
                  color="secondary"
                  class="px-6 text-none"
                  :disabled="selected.length === 0"
                  @click="enviarDocumentos"
                >
                  Enviar Documentos
                </v-btn>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
          { title: "ID", align: "start", key: "id", sortable: true },
          { title: "Conta Débito", align: "start", key: "conta_debito", sortable: true },
          { title: "Conta Crédito", align: "start", key: "conta_credito", sortable: true },
          { title: "Nome Conta Débito", align: "start", key: "nome_da_conta_debito", sortable: true },
          { title: "Nome Conta Crédito", align: "start", key: "nome_da_conta_credito", sortable: true },
          { title: "Complemento Histórico", align: "start", key: "complemento_historico", sortable: true },
          { title: "Valor", align: "center", key: "valor", sortable: true },
          { title: "Nome Documento", align: "start", key: "nome_documento", sortable: true },
          { title: "Status", align: "center", key: "status", sortable: true },
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
          const cliente_id = this.$route.params.id;
          const response = await API.get(`/enviar/documentos/${cliente_id}`);
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
  .page-header {
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, var(--v-primary-lighten-5, #e3f2fd) 0%, var(--v-surface-base, #0a2559) 100%);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }
  
  .clickable-table tbody tr {
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .clickable-table tbody tr:hover {
    background: rgba(var(--v-theme-primary), 0.04) !important;
  }
  </style>
  