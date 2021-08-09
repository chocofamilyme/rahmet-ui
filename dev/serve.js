import { createApp } from 'vue';
import Dev from './serve.vue';
import './assets/styles.scss';

// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "app.use" call
import RahmetUi from '@/entry.esm';

const app = createApp(Dev);
app.use(RahmetUi);

app.mount('#app');
