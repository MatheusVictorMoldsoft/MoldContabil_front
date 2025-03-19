<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <div class="page-header px-6 py-4 rounded-lg">
          <h1 class="text-h4 font-weight-medium">
            Validação
          </h1>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            elevation="1"
            prepend-icon="mdi-arrow-left"
            @click="$router.push('/validar')"
            class="text-none px-4"
            rounded
          >
            Voltar
          </v-btn>
        </div>

        <v-card class="mx-4 mt-2 mb-6 rounded-lg" elevation="3">
          <v-card-text class="pa-6">
            <!-- Exibe skeleton se estiver carregando -->
            <v-skeleton-loader v-if="loading" type="table" height="300" class="mb-4" />

            <!-- Mensagem caso não haja documentos -->
            <v-alert v-else-if="!documentos.length" type="info" variant="tonal" class="mb-4">
              Nenhum documento aguardando validação.
            </v-alert>

            <!-- Tabela de documentos -->
            <v-data-table
              v-else
              v-model="selected"
              :headers="headers"
              :items="documentos"
              item-value="id"
              show-select
              class="elevation-1 rounded-lg"
              dense
            >
              <template v-slot:[`item.status`]="{ item }">
                <v-chip :color="getStatusColor(item.status)" size="small" class="text-caption" variant="tonal">
                  {{ getStatusText(item.status) }}
                </v-chip>
              </template>

              <template v-slot:[`item.valor`]="{ item }">
                R$ {{ item.valor ? item.valor.toFixed(2) : '0.00' }}
              </template>

              <template v-slot:[`item.detalhar`]="{ item }">
                <v-btn color="secondary" @click.stop="abrirDetalhes(item)">Detalhar</v-btn>
              </template>
            </v-data-table>

            <!-- Botão de validação -->
            <v-btn
              v-if="!loading"
              color="secondary"
              class="mt-4"
              :disabled="selected.length === 0"
              @click="validarSelecionados"
            >
              Validar
            </v-btn>
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
        { title: "ID", key: "id", sortable: true },
        { title: "Conta Débito", key: "conta_debito" },
        { title: "Nome Conta Débito", key: "nome_da_conta_debito" },
        { title: "Conta Crédito", key: "conta_credito" },
        { title: "Nome Conta Crédito", key: "nome_da_conta_credito" },
        { title: "Valor", key: "valor" },
        { title: "Documento", key: "nome_documento" },
        { title: "Histórico", key: "complemento_historico" },
        { title: "Status", key: "status" },
        { title: "Ações", key: "detalhar", sortable: false },
      ],
    };
  },
  methods: {
    getStatusText(status) {
      return status === 0 ? "Pendente" : "Pendente";
    },
    getStatusColor(status) {
      return status === 0 ? "orange" : "orange";
    },
    abrirDetalhes(item) {
      this.$router.push(`/validar/analise/${item.id}`);
    },
    async validarSelecionados() {
      console.log("IDs para validação:", this.selected);
      if (!this.selected.length) {
        alert("Nenhum documento selecionado.");
        return;
      }

      try {
        const payload = { document_ids: this.selected };
        const response = await API.put("/validacao/atualizar-status", payload, {
          headers: { Accept: "application/json" },
        });

        console.log("Resposta da validação:", response.data);
        alert("Documentos validados com sucesso!");
        this.fetchDocumentos();
      } catch (error) {
        console.error("Erro ao validar documentos:", error);
        alert("Erro ao validar documentos");
      }
    },
    async fetchDocumentos() {
      try {
        const cliente_id = this.$route.params.id;
        const response = await API.get(`/validacao/cliente/${cliente_id}`, {
          headers: { Accept: "application/json" },
        });

        if (Array.isArray(response.data)) {
          this.documentos = response.data;
        } else {
          console.error("Erro: resposta da API não é um array", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar documentos de análise:", error);
      } finally {
        this.loading = false;
      }
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

.v-data-table {
  font-size: 0.9rem;
}

/* Em telas menores, a fonte fica menor para melhor ajuste */
@media (max-width: 600px) {
  .v-data-table {
    font-size: 0.8rem;
  }
}
</style>
