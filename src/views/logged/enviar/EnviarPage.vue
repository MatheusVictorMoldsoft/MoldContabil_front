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
        R$ {{ item.valor.toFixed(2) }}
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
      loading: true,      // Controla skeleton e tabela
      selected: [],       // IDs dos docs selecionados
      documentos: [],     // Lista de documentos vindos da API
      headers: [
        { title: "ID", key: "id", sortable: true },
        { title: "Conta Débito", key: "cod_conta_debito" },
        { title: "Conta Crédito", key: "cod_conta_credito" },
        { title: "Valor", key: "valor" },
        { title: "Nome Documento", key: "nome_documento" },
        { title: "Status", key: "status" },
      ],
    };
  },
  methods: {
    getStatusText(status) {
      // Exemplo: se status=1 => "Validado", se=2 => "Enviado", etc.
      if (status === 1) return "Validado";
      if (status === 2) return "Enviado";
      return "Pendente";
    },
    getStatusColor(status) {
      return status === 2 ? "green" : status === 1 ? "blue" : "orange";
    },

    // Busca os documentos com status=1 (ex: "Validado") via rota /client_serve/enviar
    async fetchDocumentos() {
      try {
        const response = await API.get("/client_serve/enviar");
        // Exemplo de cada objeto:
        // {
        //   id: 1,
        //   conta_debito: "2.1.5",
        //   conta_credito: "3.1.1",
        //   valor: 391.16,
        //   nome_documento: "file\\...",
        //   status: 1,
        //   ...
        // }
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

    // Ao clicar no botão "Enviar Documentos"
    async enviarDocumentos() {
      if (this.selected.length === 0) {
        alert("Selecione pelo menos um documento.");
        return;
      }
      try {
        // 1) Atualiza o status para 2 no backend
        const payload = { document_ids: this.selected };
        await API.put("/client_serve/enviar-update", payload);
        console.log("Documentos atualizados para status=2:", this.selected);

        // 2) Baixa um arquivo .txt com as linhas no formato especificado
        //    Pegamos os docs selecionados e geramos as linhas
        const selectedDocs = this.documentos.filter(d => this.selected.includes(d.id));
        const lines = selectedDocs.map(doc => this.gerarLinhaTxt(doc));

        // Cria o conteúdo final (unindo cada linha com quebra de linha)
        const content = lines.join("\n");

        // Dispara o download do arquivo .txt
        this.baixarArquivoTxt(content, "documentos_enviados.txt");

        // Opcional: Remover seleção / recarregar lista
        this.selected = [];
        this.fetchDocumentos();
      } catch (error) {
        console.error("Erro ao enviar documentos:", error);
        alert("Erro ao enviar documentos");
      }
    },

    // Gera 1 linha no formato:
    // dataAtual;cod_conta_debito;cod_conta_credito;valor;10;Referente ao Pagamento da NF XXXX;1;9999;1;1
    gerarLinhaTxt(doc) {
      // Data atual (DD/MM/YYYY)
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, "0");
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const yyyy = now.getFullYear();
      const dataStr = `${dd}/${mm}/${yyyy}`;

      // Ajuste conforme o exemplo fornecido. AQUI estamos usando 10 colunas
      // Caso só queira date/debito/credito/valor, reduza.
      return `${dataStr};${doc.conta_debito || ""};${doc.conta_credito || ""};${doc.valor || ""};10;Referente ao Pagamento da NF XXXX;1;9999;1;1`;
    },

    // Cria um Blob e força o download de um arquivo .txt
    baixarArquivoTxt(conteudo, nomeArquivo) {
      const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      // Cria um link para "baixar" o arquivo
      const link = document.createElement("a");
      link.href = url;
      link.download = nomeArquivo;
      document.body.appendChild(link);
      link.click();

      // Remove o link temporário
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
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
