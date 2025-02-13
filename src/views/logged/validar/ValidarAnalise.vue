<template>
    <v-container fluid>
      <v-row>
        <!-- Card Esquerdo: Exibição do PDF -->
        <v-col cols="12" md="6">
          <v-card class="pa-3">
            <v-card-title>Visualização do Documento</v-card-title>
            <v-card-text>
              <embed
                v-if="documento"
                :src="getPdfUrl(documento.nome_documento)"
                type="application/pdf"
                width="100%"
                height="600px"
              />
              <div v-else>Carregando documento...</div>
            </v-card-text>
          </v-card>
        </v-col>
  
        <!-- Card Direito: Detalhes do Documento -->
        <v-col cols="12" md="6">
          <v-card class="pa-3">
            <v-card-title>Detalhes do Documento</v-card-title>
            <v-card-text v-if="documento">
              <p><strong>ID:</strong> {{ documento.id }}</p>
              <p><strong>Conta Débito:</strong> {{ documento.cod_conta_debito }}</p>
              <p><strong>Conta Crédito:</strong> {{ documento.cod_conta_credito }}</p>
              <p><strong>Valor:</strong> R$ {{ documento.valor.toFixed(2) }}</p>
              <p><strong>Nome do Documento:</strong> {{ documento.nome_documento }}</p>
              <p><strong>Status:</strong> {{ getStatusText(documento.status) }}</p>
            </v-card-text>
            <v-card-text v-else>
              Carregando detalhes do documento...
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Botões de Ação -->
      <v-row class="mt-4" justify="end">
        <!-- <v-btn @click="voltar" color="secondary" class="mr-2">
          Voltar
        </v-btn> -->
        <v-btn @click="validar" color="primary">
          Validar
        </v-btn>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        documento: null,
        clienteId: null,
      };
    },
    computed: {
      docId() {
        return this.$route.params.docId;
      },
    },
    methods: {
      fetchDocumento() {
        // Simulação de busca de dados com base no docId
        const documentos = [
          {
            id: 3,
            clienteId: 1,
            cod_conta_debito: '2.1.5',
            cod_conta_credito: '3.1.1',
            valor: 3894.4,
            nome_documento: 'file/João Silva/Outubro/11.10 - COMPROV. THONSOM.pdf',
            status: 0,
          },
          // Outros documentos podem ser adicionados aqui
        ];
        this.documento = documentos.find((doc) => doc.id === parseInt(this.docId));
        if (this.documento) {
          this.clienteId = this.documento.clienteId;
        }
      },
      getPdfUrl(nomeDocumento) {
        // Retorna a URL completa do PDF
        return `/caminho/para/seus/pdfs/${nomeDocumento}`;
      },
      getStatusText(status) {
        return status === 0 ? 'Pendente' : 'Aprovado';
      },
      voltar() {
        if (this.clienteId) {
          this.$router.push(`/validar/${this.clienteId}`);
        } else {
          this.$router.push('/validar');
        }
      },
      validar() {
        // Lógica de validação do documento
        console.log(`Documento com ID ${this.docId} validado.`);
        // Exemplo: Atualizar o status do documento para "Aprovado"
        if (this.documento) {
          this.documento.status = 1;
        }
      },
    },
    created() {
      this.fetchDocumento();
    },
  };
  </script>
   
  