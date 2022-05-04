import { createStore } from 'vuex'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import Swal from 'sweetalert2'
import { router } from "../main.js"

const API = axios.create({
  baseURL: 'http://81.95.11.94:3000/',
  withCredentials: true
})
// const API = axios.create({
//   baseURL: 'http://localhost:3000/',
//   withCredentials: true
// })

export default createStore({
  state: {
    workoutPlans: [],
    user: [],
    userFavoriteWorkouts: [],
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
    async getWorkouts ({ state }) {
      const data = await API.get(`get-all-workouts`)
      state.workoutPlans = data.data
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
      const result = await API.post('get-workout-by-id', { id: id })
      state.workout = result.data
    },
    async getFavoriteWorkouts ({ state }) {
      const workouts = await API.post('/auth/get-favorite-workouts')
      state.userFavoriteWorkouts = workouts.data
    },
    async getCreatedWorkouts ({ state }, user) {
      const workouts = await API.post('/auth/get-created-workouts')
      state.userCreatedWorkouts = workouts.data
    },
    async getCompletedWorkouts ({ state }, data) {
      const workouts = await API.post('/auth/get-completed-workouts')
      state.completedWorkouts = workouts.data
    },
    async setFavoriteWorkout ({ state, dispatch }, data) {
      await API.post('/auth/favorite-workouts', { program: data.program })
      Swal.fire({
        icon: 'success',
        title: 'Workout has been favorited!',
        timer: 1500
      })
      dispatch('getFavoriteWorkouts')
    },
    async saveCompletedWorkout ({ state }, data) {
      await API.post('auth/save-completed-workout', { data: data })
      return Swal.fire({
        icon: 'success',
        title: 'Saved workout!'
      })
    },
    async removeFavoriteWorkout ({ state, dispatch }, program) {
      const result = await Swal.fire({
        title: 'Do you want to remove this program from favorites?',  
        showDenyButton: true, 
        confirmButtonText: 'Yes',  
        denyButtonText: 'No',
      })
      if (result.isConfirmed) {
        await API.post('/auth/remove-favorite-workout', { program: program })
        Swal.fire('Removed!', '', 'success')
      } else {
        Swal.fire('Changes are not saved', '', 'info')
     }
     dispatch('getFavoriteWorkouts')
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
      if (login === 'ok') {
        state.user = data.username
        await Swal.fire({
          icon: 'success',
          title: 'You have been logged in',
          toast: true,
          timer: 2000,
          showConfirmButton: false
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
    userFavoriteWorkouts: (state) => state.userFavoriteWorkouts,
    workout: (state) => state.workout,
    completedWorkouts: (state) => state.completedWorkouts,
    userCreatedWorkouts: (state) => state.userCreatedWorkouts
  }
})
