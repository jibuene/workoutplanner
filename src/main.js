import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'simplebar/dist/simplebar.min.css'
import VueLazyloadNext from 'vue-lazyload-next'
import Swal from 'sweetalert2'
import VueCookies from 'vue-cookies'

const app = createApp(App)

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  try {
    await store.dispatch('authUser')
  } catch (error) {
    console.log(error)
  }
  if (
    // make sure the user is authenticated
    (!store.state.user || store.state.user.length === 0) &&
    // ❗️ Avoid an infinite redirect
    ['create', 'profile'].includes(to.name)
  ) {
    // redirect the user to the login page

    Swal.fire({
      icon: 'warning',
      title: 'You need to log in to create workouts!',
      toast: true,
      timer: 2000,
      showConfirmButton: false
    })
    return { name: 'login' }
  }
})

app.use(VueLazyloadNext, {
  preLoad: 1.3,
  attempt: 1
})

app.use(VueCookies)
app.use(router)
app.use(store)
app.use(VueSweetalert2)
app.mount('#app')
