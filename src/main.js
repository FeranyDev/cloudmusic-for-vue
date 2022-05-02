import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import naive from 'naive-ui'
import Axios from 'axios'

const app = createApp(App)
app.config.globalProperties.Axios = Axios
app.config.globalProperties.$server = 'https://api.feranydev.com/cloudmusic'
app.use(naive)
app.mount('#app')
