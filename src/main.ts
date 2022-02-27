import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import state from './store/state';
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/common.css';
import './fonts/stylesheet.css';

import { createPinia } from "pinia";
import { useAuthStore } from "./store";
const pina = createPinia();

const app = createApp(App).use(IonicVue).use(pina).use(state);

// get the store
const store = useAuthStore();

// initialize auth listener to see if we
// have a user at startup
store.initializeAuthListener().then(() => {
  app.use(router).mount("#app");
});

/* const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
}); */