<template>
  <div class="max-w-screen-xl">
    <article class="prose">
      <h1>WORKOUT PLANNER 3002</h1>
      <p>Your one stop shop for workout programs.</p>
    </article>

    <div class="lg:flex sm:flex justify-between py-16">
      <router-link
        to="/create"
        class="btn btn-primary mb-3 md:mb-0 flex">
          Click here to create workout
      </router-link>
      <router-link
        to="/browse"
        class="btn btn-primary flex">
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