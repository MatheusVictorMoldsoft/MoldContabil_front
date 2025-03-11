import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/logged/dashboard/HomePage.vue';
import Login from '../views/auth/LoginPage.vue';
import Create from '../views/auth/CreatePage.vue';
import Validar from '../views/logged/validar/ValidarPage.vue';
import ValidarId from '../views/logged/validar/ValidarIdPage.vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import Plano from '@/views/logged/plano/PlanoContasPage.vue'
import ValidarAnalise from '@/views/logged/validar/ValidarAnalise.vue';
import Enviar from '@/views/logged/enviar/EnviarPage.vue';
import Suporte from '@/views/logged/suporte/SuportePage.vue';
import Profile from '@/views/logged/profile/ProfilePage.vue';
import Cliente from '@/views/logged/clientes/ClientePage.vue';
import ClienteCreate  from '@/views/logged/clientes/ClienteCreate.vue';
import store from '../store'; 

const routes = [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/criar-conta',
      name: 'Create',
      component: Create,
    },
    {
      path: '/',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '/', name: 'Home', component: Home },
        { path: '/validar', name: 'Validar', component: Validar },
        { path: '/validar/:id', name: 'ValidarId', component: ValidarId },
        { path: '/validar/analise/:docId', name: 'ValidarAnalise', component: ValidarAnalise },
        { path: '/enviar' ,name: 'Enviar', component: Enviar },
        { path: '/plano-de-contas' ,name: 'PlanoContas', component: Plano },
        { path: '/suporte' ,name: 'Suporte', component: Suporte },
        { path: '/perfil' ,name: 'Profile', component: Profile },
        { path: '/clientes' ,name: 'Cliente', component: Cliente},
        { path: '/clientes/create' ,name: 'ClienteCreate', component: ClienteCreate}
      ],
    },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
      // Se não há token, redireciona para login
      if (!store.getters.isAuthenticated) {
        return next('/login');
      }
  
      // Se o usuário ainda não foi carregado, tenta buscar os dados
      if (!store.getters.currentUser) {
        try {
          await store.dispatch('fetchUser');
          next();
        } catch (error) {
          // Se falhar (ex: sessão expirada), redireciona para login
          next('/login');
        }
      } else {
        next();
      }
    } else {
      next();
    }
  });

  export default router;