import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/style.css';
import Vant from 'vant';
import 'vant/lib/index.css'; // 引入样式

const app = createApp(App);

app.use(router);
app.use(Vant);
app.use(createPinia());
app.use(NutUI);

app.mount('#app');