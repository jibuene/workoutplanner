import { createStore } from 'vuex'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import Swal from 'sweetalert2'
import { useCookies } from 'vue3-cookies'
import { router } from "../main.js"


const { cookies } = useCookies()
const API_URL = 'http://81.95.11.94:3000/'
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
    async getWorkouts ({ state, commit }) {
      const data = await axios.get(`${API_URL}get-all-workouts`)
      commit('setWorkoutPlans', data.data)
    },
    async saveWorkout ({ state }, data) {
      data.creator = state.user.username
      await axios.post(`${API_URL}insert`, { data })
      return Swal.fire({
        icon: 'success',
        title: 'Saved workout!'
      })
    },
    async createUser ({ state }, user) {
      user.password = (bcrypt.hashSync(user.password, bcrypt.genSaltSync()))
      await axios.post(`${API_URL}create-user`, user)
    },
    async findUserData ({ state }, username) {
      return axios.post(`${API_URL}get-user`, { username: username })
    },
    async authUser ({ state }, user) {
      return axios.post(`${API_URL}auth-user`, user)
    },
    async getWorkoutById ({ state }, id) {
      const result = await axios.post(`${API_URL}get-workout-by-id`, { id: id })
      state.workout = result.data
    },
    async getSavedWorkouts ({ state }, user) {
      const workouts = await axios.post(`${API_URL}get-saved-workouts`, { username: user.username })
      state.userSavedWorkouts = workouts.data
    },
    async getCreatedWorkouts ({ state }, user) {
      const workouts = await axios.post(`${API_URL}get-created-workouts`, { username: user.username })
      state.userCreatedWorkouts = workouts.data
    },
    // async favoriteWorkout ({ state }, data) {
    //   const workouts = await axios.post(`${API_URL}favorite-workouts`, { username: data.username, program: data.program })
    // },
    async getCompletedWorkouts ({ state }, data) {
      const workouts = await axios.post(`${API_URL}get-completed-workouts`, { username: data.username })
      state.completedWorkouts = workouts.data
    },
    async saveCompletedWorkout ({ state }, data) {
      await axios.post(`${API_URL}save-completed-workout`, { username: data.username, data: data })
      return Swal.fire({
        icon: 'success',
        title: 'Saved workout!'
      })
    },
    async getUserCookie ({ state }) {
      const user = cookies.get('user')
      if (!user) {
        state.user = null
        return
      }
      const userIsValid = await axios.post(`${API_URL}verify-token`, user)
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
  
      if (login.status === 200) {
        state.user = login.data.user
        console.log(login.data.user)
        state.token = login.data.token
        cookies.set('user', { token: login.data.token, username: login.data.user.username }, "1h")
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
