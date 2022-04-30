import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { globalCookiesConfig, useCookies } from 'vue3-cookies'
import axios from 'axios'
import 'simplebar/dist/simplebar.min.css'

const { cookies } = useCookies()
let userCookie = cookies.get('user')
if (userCookie) {
  const userIsValid = await axios.post('http://localhost:3000/verify-token', userCookie)
  if (userIsValid.data.message !== 'Errytinn OKI') {
    userCookie = null
  }
}


globalCookiesConfig({
  secure: true,
  sameSite: "None"
})

const app = createApp(App)

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach(async (to, from) => {
//   console.log(to)
//   if (
//     // make sure the user is authenticated
//     !userCookie &&
//     // ❗️ Avoid an infinite redirect
//     to.name === 'create'
//   ) {
//     // redirect the user to the login page
//     return { name: 'login' }
//   }
// })

app.use(router)
app.use(store)
app.use(VueSweetalert2)
app.mount('#app')
