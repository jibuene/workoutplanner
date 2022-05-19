import Home from './views/Home.vue'
import Browse from './views/Browse.vue'
import Create from './views/Create.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import ShowWorkout from './views/ShowWorkout.vue'
import Createuser from './views/CreateUser.vue'
import Resetpassword from './views/ResetPassword.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  { path: '/create', component: Create, meta: { title: 'Create Workout' }, name: 'create' },
  { path: '/login', component: Login, meta: { title: 'Login' }, name: 'login' },
  { path: '/Createuser', component: Createuser, meta: { title: 'Create User' }, name: 'createuser' },
  { path: '/browse', meta: { title: 'Browse' }, component: Browse },
  { path: '/workout/:id', meta: { title: 'ShowWorkout' }, component: ShowWorkout },
  { path: '/profile', meta: { title: 'Profile' }, component: Profile, name: 'profile' },
  { path: '/resetpassword/:id', meta: { title: 'Resetpassword' }, component: Resetpassword },
  { path: '/:path(.*)', component: NotFound },
]
