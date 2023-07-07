import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue'

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component('BaseCard', BaseCard);
app.component('BaseButton', BaseButton);

app.mount('#app');
