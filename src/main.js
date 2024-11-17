import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import { BootstrapVue } from 'bootstrap-vue'
import {createBootstrap} from 'bootstrap-vue-next'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'


const app = createApp(App)
app.use(createBootstrap())
app.use(router)
app.mount('#app')
