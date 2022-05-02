import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'simplebar/dist/simplebar.min.css'

const app = createApp(App)

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  if (
    // make sure the user is authenticated
    (!store.state.user || store.state.user === '') &&
    // ❗️ Avoid an infinite redirect
    ['create', 'profile'].includes(to.name)
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

app.use(router)
app.use(store)
app.use(VueSweetalert2)
app.mount('#app')
