import { createStore } from 'vuex'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import Swal from 'sweetalert2'
import { router } from "../main.js"

const API = axios.create({
  baseURL: 'http://api.gym.zone/',
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
    userCreatedWorkouts: [],
    userRatings: [],
    editingWorkout: []
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
      if (state.editingWorkout.name) {
        data.id = state.editingWorkout._id
        await API.post('auth/editWorkout', { data })
        state.editingWorkout = {}
        return Swal.fire({
          icon: 'success',
          title: 'Workout was edited!'
        })
      } else {
        await API.post('auth/insert', { data })
        return Swal.fire({
          icon: 'success',
          title: 'Saved workout!'
        })
      }
    },
    async createUser ({ state, dispatch }, user) {
      const userCreated = await API.post(`create-user`, user)
      if (userCreated.data === 'Ok') {
        dispatch('loginUser', { user: user, routerHist: '/' })
      } else {
        return Swal.fire({
          icon: 'error',
          title: 'Username already exists',
          toast: true,
          timer: 2000,
          showConfirmButton: false
        })
      }
    },
    async loginUser ({ state, dispatch }, data) {
      let login
      try {
        login = await dispatch('authUser', data.user)
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
    },
    async authUser ({ state }, user = null) {
      const request = await API.post(`auth-user`, user)
      if (request.status === 200) {
        state.user = request.data.username
        return 'ok'
      } else {
        return new Error('Could not auth')
      }
    },
    async editWorkout ({ state }, workout) {
      state.editingWorkout = workout
      return router.push('/create')
    },
    async deleteWorkout ({ state, dispatch }, id) {
      const result = await Swal.fire({
        title: 'Do you want to remove this program?',  
        showDenyButton: true, 
        confirmButtonText: 'Yes',  
        denyButtonText: 'No',
      })
      if (result.isConfirmed) {
        await API.post('/auth/remove-workout', { id: id })
        Swal.fire('Removed!', '', 'success')
        dispatch('getCreatedWorkouts')
      }
    },
    async getWorkoutById ({ state }, id) {
      const result = await API.post('get-workout-by-id', { id: id })
      state.workout = result.data
    },
    async getRatings ({ state }, program) {
      const result = await API.post('/get-workout-rating', { program: program })
      if (result.data.length === 0) {
        return 0
      }
      return result.data.reduce((a, b) => a + b, 0) / result.data.length
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
    async setRating ({ state }, data) {
      await API.post('/auth/set-workout-rating', data)
    },
    async getUserRatings ({ state }) {
      const result = await API.post('/auth/get-user-workout-rating')
      state.userRatings = result.data
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
    }
  },
  getters: {
    workoutPlans: (state) => state.workoutPlans,
    loggedInUser: (state) => state.user,
    userFavoriteWorkouts: (state) => state.userFavoriteWorkouts,
    workout: (state) => state.workout,
    completedWorkouts: (state) => state.completedWorkouts,
    userCreatedWorkouts: (state) => state.userCreatedWorkouts,
    userRatings: (state) => state.userRatings,
    editingWorkout: (state) => state.editingWorkout
  }
})
