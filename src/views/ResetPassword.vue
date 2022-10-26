<template>
  <div class="max-w-screen-xl">
    <div class="mb-6">
      <label class="label-text" for="password">
        Password
      </label>
      <input class="input input-bordered w-full" id="password" type="password" placeholder="******************" v-model="password">
    </div>
    <button class="btn btn-accent" @click="resetPassword({ id: id, password: password })">Reset Password</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      id: this.$route.params.id,
      password: ''
    }
  },
  methods: {
    ...mapActions([
      'resetPassword'
    ])
  }
}
</script>