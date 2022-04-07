import Home from './views/Home.vue'
import Browse from './views/Browse.vue'
import Create from './views/Create.vue'
import Login from './views/Login.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  { path: '/create', component: Create, meta: { title: 'Create Workout' } },
  { path: '/login', component: Login, meta: { title: 'Login' }, name: 'login' },
  { path: '/browse', meta: { title: 'Browse' }, component: Browse },
  { path: '/:path(.*)', component: NotFound },
]
