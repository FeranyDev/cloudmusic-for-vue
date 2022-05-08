import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import naive from 'naive-ui'
import Axios from 'axios'
let audio = new Audio();
import VueCookies from 'vue-cookies'
import axios from "axios";

const app = createApp(App)

axios.defaults.withCredentials = true
Axios.defaults.withCredentials = true
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


app.use(VueCookies)
app.use(naive)
app.mount('#app')
