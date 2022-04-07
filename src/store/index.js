import { createStore } from 'vuex'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import Swal from 'sweetalert2'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

export default createStore({
  state: {
    workoutPlans: [],
    user: [],
    userToken: ''
  },
  actions: {
    async getWorkouts ({ state, commit }) {
      const data = await axios.get('http://localhost:3000')
      commit('setWorkoutPlans', data.data)
    },
    async saveWorkout ({ state }, data) {
      await axios.post('http://localhost:3000/insert', { data })
    },
    async createUser ({ state }, user) {
      user.password = (bcrypt.hashSync(user.password, bcrypt.genSaltSync()))
      await axios.post('http://localhost:3000/create-user', user)
    },
    async findUserData ({ state }, username) {
      return axios.post('http://localhost:3000/get-user', { username: username })
    },
    async authUser ({ state }, user) {
      return axios.post('http://localhost:3000/auth-user', user)
    },
    async getUserCookie ({ state }) {
      const user = cookies.get('user')
      const userIsValid = await axios.post('http://localhost:3000/verify-token', user)
      if (userIsValid.data.message !== 'Errytinn OKI') {
        return console.log('Token not valid')
      }
      
      if (user) {
        state.user = user
      }
    },
    async loginUser ({ state, dispatch }, user) {
      let login

      try {
        login = await dispatch('authUser', user)
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
        Swal.fire({
          icon: 'success',
          title: 'You have been logged in',
          showConfirmButton: false,
          timer: 1500
        })
      }
      // const userData = await dispatch('findUserData', user.username)
      // if (userData.data.length === 0) {
      //   return Swal.fire({
      //     icon: 'question',
      //     title: 'Found no user with username "' + user.username + '"'
      //   })        
      // }
      // if (bcrypt.compareSync(user.password, userData.data.password)) {
      //   Swal.fire({
      //     icon: 'success',
      //     title: 'You have been logged in',
      //     showConfirmButton: false,
      //     timer: 1500
      //   })
      // } else {
      //   return Swal.fire({
      //     icon: 'error',
      //     title: 'Wrong password'
      //   })
      // }
    }
  },
  getters: {
    workoutPlans: (state) => state.workoutPlans,
    loggedInUser: (state) => state.user
  },
  mutations: {
    setWorkoutPlans (state, data) {
      state.workoutPlans = data
    }
  }
})
