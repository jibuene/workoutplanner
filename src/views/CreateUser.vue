
<template>
  <div class="max-w-screen-xl">
      <div class="mb-4">
        <label class="label-text" for="username">
          Username
        </label>
        <input class="input input-bordered w-full" id="username" type="text" placeholder="Username" v-model="user.username">
      </div>
      <div class="mb-6">
        <label class="label-text" for="email">
          E-Mail
        </label>
        <input class="input input-bordered w-full" id="email" type="text" placeholder="E-Mail" v-model="user.email">
      </div>
      <div class="mb-6">
        <label class="label-text" for="password">
          Password
        </label>
        <input class="input input-bordered w-full" id="password" type="password" placeholder="******************" v-model="user.password">
      </div>
      <div class="md:flex justify-between">
        <button class="btn btn-primary mb-3 md:mb-0 flex w-full md:w-fit" type="button" @click="create()">
          Create User
        </button>
      </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'Browse',
  data () {
    return {
      user: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'createUser',
    ]),
    create () {
      if (this.user.username === '' || this.user.password === '' || this.user.email === '') {
        return Swal.fire({
          icon: 'error',
          title: 'Missing input',
          toast: true,
          timer: 2000,
          showConfirmButton: false
        })
      } else {
        this.createUser(this.user)
      }
    }
  },
  computed: {
    ...mapGetters([
      'workoutPlans'
    ])
  }
}
</script>