import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css'
import '@/permission' // permission control

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.use(store).use(router).mount('#app')

fetch('logo.txt').then(response => {
  return response.text()
}).then(data => {
  console.log('%c' + data, 'color: #409eff;')
}).catch(error => {
  console.log(error)
})
