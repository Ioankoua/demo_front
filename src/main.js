import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import { createMetaManager } from 'vue-meta';

const app = createApp(App);

const metaManager = createMetaManager();
app.use(metaManager);

//app.config.globalProperties.$apiUrl = 'https://demo-back.sweetbouquet.store/';
//app.config.globalProperties.$imgPath = 'https://demo-back.sweetbouquet.store/storage/app/public/';

app.config.globalProperties.$apiUrl = 'https://test.sweetbouquet.store/';
app.config.globalProperties.$imgPath = 'https://test.sweetbouquet.store/storage/app/public/';

//app.config.globalProperties.$apiUrl = 'http://127.0.0.1:8000/';
//app.config.globalProperties.$imgPath = 'http://localhost:8888/testm/storage/app/public/';

app.use(router).mount('#app');
