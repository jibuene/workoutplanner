import { createStore } from 'vuex'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import Swal from 'sweetalert2'
import { useCookies } from 'vue3-cookies'
import { router } from "../main.js"

const { cookies } = useCookies()
const API = axios.create({
  baseURL: 'http://81.95.11.94:3000/',
  withCredentials: true
})

export default createStore({
  state: {
    workoutPlans: [],
    user: [],
    userSavedWorkouts: [],
    userToken: '',
    workout: [],
    completedWorkouts: [],
    userCreatedWorkouts: []
  },
  actions: {
    async testLol ({ state }) {
      const lol = await API.post(`cookies`, {withCredentials: true})
  
      console.log(lol)
    },
    async getWorkouts ({ state, commit }) {
      const data = await API.get(`get-all-workouts`)
      commit('setWorkoutPlans', data.data)
    },
    async saveWorkout ({ state }, data) {
      data.creator = state.user.username
      await API.post(`insert`, { data })
      return Swal.fire({
        icon: 'success',
        title: 'Saved workout!'
      })
    },
    async createUser ({ state }, user) {
      user.password = (bcrypt.hashSync(user.password, bcrypt.genSaltSync()))
      await API.post(`create-user`, user)
    },
    // async findUserData ({ state }, username) {
    //   return API.post(`get-user`, { username: username })
    // },
    async authUser ({ state }, user = null) {
      const request = await API.post(`auth-user`, user)
      if (request.status === 200) {
        state.user = request.data.username
        return 'ok'
      } else {
        return new Error('Could not auth')
      }
    },
    async getWorkoutById ({ state }, id) {
      const result = await API.post(`get-workout-by-id`, { id: id })
      state.workout = result.data
    },
    async getSavedWorkouts ({ state }, user) {
      const workouts = await API.post('/auth/get-saved-workouts')
      state.userSavedWorkouts = workouts.data
    },
    async getCreatedWorkouts ({ state }, user) {
      const workouts = await API.post('/auth/get-created-workouts')
      state.userCreatedWorkouts = workouts.data
    },
    async favoriteWorkout ({ state }, data) {
      return await API.post('/auth/favorite-workouts', { program: data.program })
    },
    async getCompletedWorkouts ({ state }, data) {
      const workouts = await API.post('/auth/get-completed-workouts')
      state.completedWorkouts = workouts.data
    },
    async saveCompletedWorkout ({ state }, data) {
      await API.post('auth/save-completed-workout', { data: data })
      return Swal.fire({
        icon: 'success',
        title: 'Saved workout!'
      })
    },
    async logoff ({ state, dispatch }) {
      await API.post('logoff')
      await Swal.fire({
        icon: 'success',
        title: 'You have been logged out!',
        timer: 1500
      })
      state.user = ''
      return router.push('/')
    },
    async getUserCookie ({ state }) {
      const user = cookies.get('user')
      if (!user) {
        state.user = null
        return
      }
      const userIsValid = await API.post(`verify-token`, user)
      if (userIsValid.data.message !== 'Errytinn OKI') {
        return console.log('Token not valid')
      }
      
      if (user) {
        state.user = user
      }
    },
    async loginUser ({ state, dispatch }, data) {
      let login
      try {
        login = await dispatch('authUser', data.username)
      } catch (error) {
        console.log(error)
        return Swal.fire({
          icon: 'error',
          title: 'Wrong password or could not find user'
        })
      }
      console.log(login)
      if (login === 'ok') {
        state.user = data.username
        await Swal.fire({
          icon: 'success',
          title: 'You have been logged in',
          showConfirmButton: false,
          timer: 1500
        })
        if (data.routerHist !== null) {
          router.push(data.routerHist)
        }  
      }
    }
  },
  getters: {
    workoutPlans: (state) => state.workoutPlans,
    loggedInUser: (state) => state.user,
    userSavedWorkouts: (state) => state.userSavedWorkouts,
    workout: (state) => state.workout,
    completedWorkouts: (state) => state.completedWorkouts,
    userCreatedWorkouts: (state) => state.userCreatedWorkouts
  },
  mutations: {
    setWorkoutPlans (state, data) {
      state.workoutPlans = data
    }
  }
})
