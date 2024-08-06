import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  build: {
    manifest: true,
    assetsDir: '',
    rollupOptions: {
      input: 'auth.html'
    }
  },
  server: {
    open: 'auth.html'
  }

})
