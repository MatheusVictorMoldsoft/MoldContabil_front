<template>
  <v-container>
    <v-card>
      <v-card-title>Validar Documentos</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="documentos" class="clickable-table" @click:row="goToValidarId">
          <!-- Formatações personalizadas -->
          <template v-slot:[`item.status`]="{ item }">
            <v-chip :color="getStatusColor(item.status)" dark>
              {{ getStatusText(item.status) }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
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
        const response = await axios.get(
          "https://cfad-2804-880-1324-5500-50f1-2f7b-10e8-ea7a.ngrok-free.app/api/v1/client_serve/documentos-pendentes/",
          {
            headers: {
              "Accept": "application/json",
              "ngrok-skip-browser-warning": "true", // Adiciona o cabeçalho para pular o aviso do ngrok
            },
          }
        );

        if (Array.isArray(response.data)) {
          this.documentos = response.data.map((doc) => ({
            id: doc.id,
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
      }
    },
    getStatusText(status) {
      return status === "Pendente" ? "Pendente" : "Aprovado";
    },
    getStatusColor(status) {
      return status === "Pendente" ? "red" : "green";
    },
    goToValidarId(item) {
      console.log("Item completo:", item); // Verifique a estrutura do item
      console.log("ID da rota:", item.id); // Verifique o ID
      this.$router.push(`/validar/${item.id}`);
    }
  },
  mounted() {
    this.fetchDocumentos();
  },
};
</script>

<style scoped>
/* Adiciona cursor de ponteiro e efeito hover para melhor UX */
.clickable-table tbody tr {
  cursor: pointer;
  transition: background 0.3s;
}

.clickable-table tbody tr:hover {
  background: #f5f5f5;
}
</style>
