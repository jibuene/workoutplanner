<template>
  <!-- dracula goated -->
  <div data-theme="dracula">
    <header class="navbar bg-base-100" v-if="$route.meta.title">
      <div class="flex-1">
        <div class="relative w-full">
          <h1 class="md:text-3xl font-bold leading-tight">
            <span class="text-sky-400 font-light italic">ONLY</span> GAINS / {{ $route.meta.title }}
            <label v-if="isMobile()" data-collapse-toggle="mobile-menu" @click="hiddenMenu = !hiddenMenu" type="button" class="btn btn-circle btn-sm swap swap-rotate float-right" aria-controls="mobile-menu" aria-expanded="false">
              <svg v-if="hiddenMenu" class="fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
              <svg v-if="!hiddenMenu" class="fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
            </label>
          </h1>
            <div class="md:block md:w-auto" id="mobile-menu" v-if="(hiddenMenu && isMobile()) || !isMobile()">
              <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <router-link to="/" @click="hiddenMenu = false" class="block mt-1 py-2 pl-3 bg-base-300 rounded md:bg-transparent md:text-sky-500 md:p-0" aria-current="page">Home</router-link>
                </li>
                <li>
                  <router-link to="/Create" @click="hiddenMenu = false" class="block mt-1 py-2 pl-3 bg-base-300 rounded md:bg-transparent md:text-sky-500 md:p-0" aria-current="page">Create</router-link>
                </li>
                <li>
                  <router-link to="/Browse" @click="hiddenMenu = false" class="block mt-1 py-2 pl-3 bg-base-300 rounded md:bg-transparent md:text-sky-500 md:p-0" aria-current="page">Browse</router-link>
                </li>
                <template v-if="loggedInUser?.username?.length > 0">
                  <li>
                    <router-link @click="hiddenMenu = false" to="/Profile" class="block mt-1 py-2 pl-3 bg-base-300 rounded md:bg-transparent md:text-sky-500 md:p-0" aria-current="page">Profile</router-link>
                  </li>
                  <li>
                    <button @click="logoff()" class="block mt-1 py-2 pl-3 rounded md:bg-transparent md:text-red-700 md:p-0">Log out</button>
                  </li>
                </template>
                <li v-else>
                  <router-link
                    @click="hiddenMenu = false"
                    to="/Login"
                    class="block mt-1 py-2 pl-3 bg-base-300 rounded md:bg-transparent md:text-sky-500 md:p-0">
                    Login
                  </router-link>
                </li>
              </ul>
            </div>
        </div>
      </div>
      <!-- <div>
        <h1
          v-if="loggedInUser?.username?.length > 0"
          class="text-3xl italic float-right font-normal hidden md:flex">
          WELCOME {{ loggedInUser?.username }}
        </h1>
        <router-link
          to="/Login"
          v-else
          class="text-3xl italic float-right font-normal hidden md:flex">
          Login
        </router-link>
      </div> -->
    </header>
    <main class="bg-base-300 h-screen mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
      <router-view />
    </main>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      hiddenMenu: false
    }
  },
  computed: {
    ...mapGetters([
      'loggedInUser'
    ]),
    mobile() {
      return this.$vuetify.breakpoint.sm
    }
  },
  methods: {
    ...mapActions(['getUserCookie', 'authUser', 'logoff']),
    isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.authUser()
  }
}
</script>