<template>
    <v-container fluid class="login-container">
      <v-row no-gutters>
        <!-- Lado da imagem -->
        <v-col cols="12" md="7" class="image-section"></v-col>
  
        <!-- Lado do formulário -->
        <v-col cols="12" md="5" class="form-section">
          <v-card class="elevation-12 login-card">
            <!-- Logo da empresa -->
            <div class="logo-container">
              <img src="/images/logo.png" alt="Logo da Empresa" class="logo" />
            </div>
  
            <v-toolbar color="white" dark flat>
              <v-toolbar-title>Criar Conta</v-toolbar-title>
            </v-toolbar>
  
            <v-card-text>
              <v-form @submit.prevent="criarConta">
                <v-text-field
                  v-model="nome"
                  label="Nome Completo"
                  type="text"
                  variant="outlined"
                  required
                ></v-text-field>
  
                <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  required
                ></v-text-field>
  
                <v-text-field
                  v-model="senha"
                  label="Senha"
                  type="password"
                  variant="outlined"
                  required
                ></v-text-field>
  
                <v-text-field
                  v-model="confirmarSenha"
                  label="Confirmar Senha"
                  type="password"
                  variant="outlined"
                  required
                ></v-text-field>
  
                <v-checkbox
                  v-model="aceitarTermos"
                  label="Aceito os termos e condições"
                  required
                ></v-checkbox>
  
                <v-btn type="submit" color="primary" block>Criar Conta</v-btn>
              </v-form>
  
              <div class="mt-4 text-center">
                Já tem uma conta?
                <v-btn variant="text" color="primary" @click="$router.push('/login')">
                  Faça login
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        aceitarTermos: false,
      };
    },
    methods: {
      criarConta() {
        if (this.senha !== this.confirmarSenha) {
          alert("As senhas não coincidem. Tente novamente.");
          return;
        }
  
        if (!this.aceitarTermos) {
          alert("Você deve aceitar os termos e condições para criar uma conta.");
          return;
        }
  
        // Simula o cadastro do usuário
        const usuario = {
          nome: this.nome,
          email: this.email,
          senha: this.senha,
        };
  
        console.log("Conta criada com sucesso:", usuario);
        alert("Conta criada com sucesso!");
  
        // Redireciona para a página de login após o cadastro
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    height: 100vh;
    margin: 0;
    padding: 0;
  }
  
  .image-section {
    background: url('/public/images/login.webp') center center/cover no-repeat;
    height: 100vh;
  }
  
  .form-section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .login-card {
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  
  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .logo {
    margin-top: 5%;
    max-width: 150px;
    max-height: 150px;
    width: auto;
    height: auto;
  }
  
  /* Regras de responsividade */
  @media (max-width: 960px) {
    .image-section {
      height: 40vh;
    }
  
    .form-section {
      height: 60vh;
    }
  }
  
  @media (max-width: 600px) {
    .image-section {
      height: 30vh;
    }
  
    .form-section {
      height: 70vh;
    }
  }
  </style>