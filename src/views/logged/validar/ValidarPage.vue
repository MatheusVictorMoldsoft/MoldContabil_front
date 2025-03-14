<template>
  <v-container>
    <v-card>
      <v-card-title>Validar Documentos</v-card-title>
      <v-card-text>
        <!-- Se loading, exibe skeleton; senão, mostra a tabela -->
        <v-skeleton-loader v-if="loading" type="paragraph" :lines="3" class="mb-4" />
        <div v-else-if="!documentos.length" class="text-center my-5">
          Nenhum documento aguardando Validação.</div>
        <v-data-table v-else :headers="headers" :items="documentos" class="clickable-table">
          <template v-slot:item="{ item }">
            <tr @click="goToValidarId(item)">
              <td>{{ item.cliente }}</td>
              <td>{{ item.cnpj_cpf }}</td>
              <td>{{ item.qtd_documentos }}</td>
              <td>
                <v-chip :color="getStatusColor(item.status)" dark>
                  {{ getStatusText(item.status) }}
                </v-chip>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import API from '@/services/apiService';

export default {
  data() {
    return {
      loading: true, // Controla a exibição do skeleton
      headers: [
        { title: "Cliente", key: "cliente" },
        { title: "CNPJ/CPF", key: "cnpj_cpf" },
        { title: "Qtd Documentos", key: "qtd_documentos" },
        { title: "Status", key: "status" },
      ],
      documentos: [],
    };
  },
  methods: {
    async fetchDocumentos() {
      try {
        const response = await API.get('/validacao/empresa', {
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
      console.log("Item completo:", item);
      console.log("ID da rota:", item.id);
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
.clickable-table tbody tr {
  cursor: pointer;
  transition: background 0.3s;
}

.clickable-table tbody tr:hover {
  background: #f5f5f5;
}
</style>
