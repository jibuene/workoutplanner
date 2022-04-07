<script setup>
import { ref } from 'vue'

let counter = ref(0)

setInterval(() => {
  counter.value++
}, 1000)
</script>

<template>
  <div>
    <header class="bg-white shadow border-b-4 border-sky-400" v-if="$route.meta.title">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
          <span class="text-sky-400 font-light italic">ONLY</span> GAINS / {{ $route.meta.title }}
          <router-link
            to="/Login"
            v-if="loggedInUser.length === 0"
            class="text-3xl italic text-sky-500 float-right font-normal">
            Login
          </router-link>
          <span class="text-3xl italic text-sky-500 float-right font-normal" v-else>WELCOME {{ loggedInUser.username }}</span>
        </h1>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'loggedInUser'
    ])
  },
  methods: {
    ...mapActions(['getUserCookie'])
  },
  mounted () {
    this.getUserCookie()
  }
}
</script>