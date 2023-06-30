import { createApp } from 'vue'
import { createPinia } from 'pinia'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import App from './App.vue'

import './assets/main.css'

dayjs.extend(duration)

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
