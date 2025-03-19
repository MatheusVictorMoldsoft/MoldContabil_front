<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <div class="page-header px-6 py-4 rounded-lg">
          <h1 class="text-h4 font-weight-medium">
            Validar Documentos
          </h1>
        </div>

        <v-card class="mx-4 mt-2 mb-6 rounded-lg" elevation="3">
          <v-card-text class="pa-6">
            <!-- Exibe skeleton se estiver carregando -->
            <v-skeleton-loader v-if="loading" type="table-row" :lines="5" class="mb-4" />

            <!-- Mensagem caso não haja documentos -->
            <v-alert v-else-if="!documentos.length" type="info" variant="tonal" class="mb-4">
              Nenhum documento aguardando validação.
            </v-alert>

            <!-- Tabela de documentos -->
            <v-data-table
              v-else
              :headers="headers"
              :items="documentos"
              class="clickable-table elevation-1 rounded-lg"
              hover
              no-data-text="Nenhum documento encontrado"
            >
              <template v-slot:item="{ item }">
                <tr @click="goToValidarId(item)">
                  <td>{{ item.cliente }}</td>
                  <td>{{ item.cnpj_cpf }}</td>
                  <td>{{ item.qtd_documentos }}</td>
                  <td>
                    <v-chip :color="getStatusColor(item.status)" size="small" class="text-caption" variant="tonal">
                      {{ getStatusText(item.status) }}
                    </v-chip>
                  </td>
                </tr>
              </template>
            </v-data-table>
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
      headers: [
        { title: "Cliente", align: "start", key: "cliente", sortable: true },
        { title: "CNPJ/CPF", align: "start", key: "cnpj_cpf", sortable: true },
        { title: "Qtd Documentos", align: "center", key: "qtd_documentos", sortable: true },
        { title: "Status", align: "center", key: "status", sortable: true },
      ],
      documentos: [],
    };
  },
  methods: {
    async fetchDocumentos() {
      try {
        const response = await API.get("/validacao/empresa", {
          headers: { Accept: "application/json" },
        });

        if (Array.isArray(response.data)) {
          this.documentos = response.data.map((doc) => ({
            id: doc.cliente_id || doc.id,
            cliente: doc.nome,
            cnpj_cpf: doc.cpf_cnpj,
            qtd_documentos: doc.quantidade_documentos,
            status: "Pendente",
          }));
        } else {
          console.error("Erro: resposta da API não é um array", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
      } finally {
        this.loading = false;
      }
    },
    getStatusText(status) {
      return status === "Pendente" ? "Pendente" : "Aprovado";
    },
    getStatusColor(status) {
      return status === "Pendente" ? "red" : "green";
    },
    goToValidarId(item) {
      if (item.id) {
        this.$router.push(`/validar/${item.id}`);
      } else {
        console.error("ID do cliente não encontrado:", item);
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

.clickable-table tbody tr {
  cursor: pointer;
  transition: background 0.3s;
}

.clickable-table tbody tr:hover {
  background: rgba(var(--v-theme-primary), 0.04) !important;
}
</style>
