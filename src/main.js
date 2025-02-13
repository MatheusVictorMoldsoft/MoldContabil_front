import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store'; 
import VueApexCharts from 'vue3-apexcharts';


loadFonts()

createApp(App)
  .use(VueApexCharts)
  .use(router)
  .use(vuetify)
  .use(store)
  .mount('#app')
