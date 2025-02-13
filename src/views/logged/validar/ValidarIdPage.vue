<template>
  <v-container>
    <h1 class="page-title">Validar ID</h1>

    <!-- Tabela de validação -->
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="documentos"
      item-value="id"
      show-select
      class="elevation-1"
      dense
      @click:row="abrirDetalhes"
    >
      <!-- Formatações personalizadas -->
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getStatusColor(item.status)" dark>
          {{ getStatusText(item.status) }}
        </v-chip>
      </template>

      <template v-slot:[`item.valor`]="{ item }">
        R$ {{ item.valor.toFixed(2) }}
      </template>
    </v-data-table>

    <!-- Botão de validação -->
    <v-btn
      color="primary"
      class="mt-4"
      :disabled="selected.length === 0"
      @click="validarSelecionados"
    >
      Validar
    </v-btn>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      selected: [], // IDs selecionados
      documentos: [
        {
          id: 3,
          cod_conta_debito: "2.1.5",
          cod_conta_credito: "3.1.1",
          valor: 3894.4,
          nome_documento: "file\\João Silva\\Outubro\\11.10 - COMPROV. THONSOM.pdf",
          status: 0,
        },
        {
          id: 4,
          cod_conta_debito: "1.3.2",
          cod_conta_credito: "2.2.1",
          valor: 1250.0,
          nome_documento: "file\\Ana Souza\\Novembro\\15.11 - RECIBO FISCAL.pdf",
          status: 1,
        },
      ],
      headers: [
        { title: "ID", key: "id", sortable: true },
        { title: "Conta Débito", key: "cod_conta_debito" },
        { title: "Conta Crédito", key: "cod_conta_credito" },
        { title: "Valor", key: "valor" },
        { title: "Documento", key: "nome_documento" },
        { title: "Status", key: "status" },
      ],
    };
  },
  methods: {
    // Retorna o status formatado
    getStatusText(status) {
      return status === 0 ? "Pendente" : "Aprovado";
    },
    getStatusColor(status) {
      return status === 0 ? "orange" : "green";
    },

    // Abre a página de análise ao clicar em um item
    abrirDetalhes(item) {
      this.$router.push(`/validar/analise/${item.id}`);
    },

    // Envia os IDs selecionados para validação
    validarSelecionados() {
      console.log("IDs para validação:", this.selected);
      alert(`IDs Validados: ${this.selected.join(", ")}`);
    },
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

