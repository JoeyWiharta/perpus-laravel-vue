import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import App from './App.vue'
import router from './router'
import './assets/main.css'
/* import specific icons */
import { faUserSecret, faFolderPlus, faEye, faTrash, faSave, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faUserSecret, faFolderPlus, faEye, faTrash, faSave, faSignOutAlt)



axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000'; // Ganti dengan URL backend kamu

const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(bootstrap)
app.use(FontAwesomeIcon)

app.config.globalProperties.$axios = axios

app.mount('#app')
