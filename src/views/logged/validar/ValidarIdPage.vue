<template>
  <v-container>
    <h1 class="page-title">Validar ID</h1>

    <!-- Se loading, exibe skeleton; senão, mostra a tabela de fato -->
    <v-skeleton-loader v-if="loading" type="table" height="300" class="mb-4" />
    <div v-else-if="!documentos.length" class="text-center my-5">
      Nenhum documento aguardando Validaçãox.</div>
    <v-data-table
      v-else
      v-model="selected"
      :headers="headers"
      :items="documentos"
      item-value="id"
      show-select
      class="elevation-1"
      dense
      @click:row="abrirDetalhes"
    >
      <!-- Formatações personalizadas para "status" -->
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getStatusColor(item.status)" dark>
          {{ getStatusText(item.status) }}
        </v-chip>
      </template>

      <!-- Formatação personalizada para "valor" -->
      <template v-slot:[`item.valor`]="{ item }">
        R$ {{ item.valor ? item.valor.toFixed(2) : '0.00' }}
      </template>

      <!-- Nova coluna "Ações", com botão "Detalhar" -->
      <template v-slot:[`item.detalhar`]="{ item }">
        <v-btn color="primary" @click.stop="abrirDetalhes(item)">Detalhar</v-btn>
      </template>
    </v-data-table>

    <!-- Botão de validação visível apenas após o carregamento -->
    <v-btn v-if="!loading" color="primary" class="mt-4" :disabled="selected.length === 0" @click="validarSelecionados">
      Validar
    </v-btn>
  </v-container>
</template>

<script>
import API from '@/services/apiService';

export default {
  data() {
    return {
      loading: true, // Controla o skeleton e a exibição do botão
      selected: [],  // IDs selecionados
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
    // Ajuste para diferenciar status 0 e 1
    getStatusText(status) {
      if (status === 0) return "Pendente";
      if (status === 1) return "Aprovado";
      return "Pendente";
    },
    getStatusColor(status) {
      if (status === 0) return "orange";
      if (status === 1) return "green";
      return "orange";
    },

    abrirDetalhes(item) {
      // Redireciona para a rota de análise/detalhes do documento
      this.$router.push(`/validar/analise/${item.id}`);
    },

    async validarSelecionados() {
      console.log("IDs para validação:", this.selected);
      try {
        const payload = { document_ids: this.selected };
        // Ajuste a rota conforme sua API real
        const response = await API.put("/documento/", payload, {
          headers: {
            "Accept": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
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
/* Título um pouco menor */
.page-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Reduz a fonte da tabela */
.v-data-table {
  font-size: 0.9rem;
}

/* Em telas menores, a fonte fica ainda menor para caber melhor */
@media (max-width: 600px) {
  .v-data-table {
    font-size: 0.8rem;
  }
}
</style>
