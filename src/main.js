import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store'; 
import VueApexCharts from 'vue3-apexcharts';

loadFonts()

const app = createApp(App);
const resizeObserverErr = () => {
  let debounce;
  window.addEventListener('error', (e) => {
    if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
      e.stopImmediatePropagation();
      clearTimeout(debounce);
      debounce = setTimeout(() => console.clear(), 200);
    }
  });
};
resizeObserverErr();


// Registra "perfect-scrollbar" como elemento customizado para evitar erro de resolução
app.config.compilerOptions.isCustomElement = (tag) => tag === 'perfect-scrollbar';

app.use(VueApexCharts)
  .use(router)
  .use(vuetify)
  .use(store)
  .mount('#app')
