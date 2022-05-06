import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import naive from 'naive-ui'
import Axios from 'axios'
let audio = new Audio();


const app = createApp(App)
app.config.globalProperties.Axios = Axios
app.config.globalProperties.audioObject = audio

app.directive('lazy', {
    mounted(el, { value }) {
        const observer = new IntersectionObserver(
            ([{ isIntersecting }], observer) => {
                if (isIntersecting) {
                    observer.unobserve(el)
                    el.src = value
                    el.onerror = function() {
                        el.src = require('../src/assets/MusicNote224Filled.svg')
                    }
                }
            },
            {
                threshold: 0
            }
        )
        observer.observe(el)
    }
})
app.use(naive)
app.mount('#app')
