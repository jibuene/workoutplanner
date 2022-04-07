<template>
  <div class="bg-gray-50">
    <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
      <h2 class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
        THE NEW WORKOUT PLANNER 3002
      </h2>
    </div>
    <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
      <router-link
        to="/create"
        class="inline-flex rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-white transition duration-150 ease-in-out hover:bg-indigo-500">
          Click here to create workout
      </router-link>
      <router-link
        to="/browse"
        class="inline-flex rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-white transition duration-150 ease-in-out hover:bg-indigo-500">
          Click here to browse workouts
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      lol: '123'
    }
  },
  methods: {
    ...mapActions([
      'testLol'
    ])
  },
  mounted () {
    // this.test()
  }
}
</script>