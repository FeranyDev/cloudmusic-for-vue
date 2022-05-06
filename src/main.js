import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import naive from 'naive-ui'
import Axios from 'axios'
// import Login from './components/Login.vue'
// import Main from './components/Main.vue'

let audio = new Audio();

// const routes = [
//     { path: '/login', component: Login },
//     { path: '/main', component: Main },
// ]
//
// const router = VueRouter.createRouter({
//     history: VueRouter.createWebHashHistory(),
//     routes,
// })

const app = createApp(App)
app.config.globalProperties.Axios = Axios
app.config.globalProperties.$server = 'https://api.feranydev.com/cloudmusic'
app.config.globalProperties.audioObject = audio

app.directive('lazy', {
    mounted(el, { value }) {
        const observer = new IntersectionObserver(
            //参数1：回调函数  参数2：可选的配置
            ([{ isIntersecting }], observer) => {
                //如果图片进入了
                if (isIntersecting) {
                    // 在加载完图片后停止监听DOM
                    observer.unobserve(el)
                    // 给el元素设置src属性，value是接收的图片路径地址
                    el.src = value
                    // 如果图片加载失败，显示默认的图片
                    el.onerror = function() {
                        el.src = require('../src/assets/MusicNote224Filled.svg')
                    }
                }
            },
            {
                threshold: 0
            }
        )
        //监视绑定的DOM元素
        observer.observe(el)
    }
})

// app.use(router)
app.use(naive)
app.mount('#app')
