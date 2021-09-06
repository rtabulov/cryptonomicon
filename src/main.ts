import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import 'virtual:windi.css'
import 'virtual:svg-icons-register'

createApp(App).use(createPinia()).mount('#app')
