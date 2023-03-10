import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'

// 全局样式
import '@less/global.less'

createApp(App).use(createPinia()).use(router).mount('#app')
