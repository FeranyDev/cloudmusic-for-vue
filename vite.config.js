import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    target: ["chrome87", "edge88", "es2019", "firefox78", "safari13.1"]
})
