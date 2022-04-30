
<template>
  <div class="max-w-screen-xl">
      <div class="mb-4">
        <label class="label-text" for="username">
          Username
        </label>
        <input class="input input-bordered w-full" id="username" type="text" placeholder="Username" v-model="user.username">
      </div>
      <div class="mb-6">
        <label class="label-text" for="password">
          Password
        </label>
        <input class="input input-bordered w-full" id="password" type="password" placeholder="******************" v-model="user.password">
        <p class="label-text-alt">Please choose a password.</p>
      </div>
      <div class="md:flex justify-between">
        <button class="btn btn-primary mb-3 md:mb-0 flex w-full md:w-fit" type="button" @click="createUser(user)">
          Create User
        </button>
        <button class="btn btn-primary mb-3 md:mb-0 flex w-full md:w-fit" type="button" @click="loginUser({ username: user, routerHist: this.$router.options.history.state.back })">
          Login
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker flex" href="#">
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