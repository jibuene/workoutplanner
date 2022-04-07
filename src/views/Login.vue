
<template>
  <div class="shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-4/4">
      <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
          Username
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username" v-model="user.username">
      </div>
      <div class="mb-6">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" v-model="user.password">
        <p class="text-red text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white hover:italic" type="button" @click="createUser(user)">
          Create User
        </button>
        <button class="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white hover:italic" type="button" @click="loginUser(user)">
          Login
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
          Forgot Password?
        </a>
      </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Browse',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'createUser',
      'loginUser'
    ])
  },
  computed: {
    ...mapGetters([
      'workoutPlans'
    ])
  }
}
</script>