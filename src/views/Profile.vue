
<template>
  <div class="h-full flex flex-col bg-gray-100 dark:bg-gray-700 shadow-xl overflow-y-scroll">
    <div class="ml-3 h-7 flex justify-end items-center">
      <button type="button"
        class="bg-gray-100 dark:bg-gray-700 m-1 p-3 justify-end rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500">
        <span class="sr-only">Close panel</span>
        <!-- Heroicon name: outline/x -->
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
          aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="bg-green-300 shadow-lg pb-3 rounded-b-3xl">
      <div class="flex  rounded-b-3xl bg-gray-100 dark:bg-gray-700 space-y-5 flex-col items-center py-7">
        <!-- <img class="h-28 w-28 rounded-full"
          src="https://s3-eu-west-1.amazonaws.com/turistforeningen/images/lz/3Q/g5-940.jpeg"
          alt="User"> -->
        <span class="text-3xl font-normal">{{ loggedInUser.username }}</span>
      </div>
    </div>

    Saved Programs
    <div class="grid rounded-2xl divide-y divide-dashed hover:divide-solid  justify-evenly bg-gray-50 dark:bg-gray-300 m-3 mt-10 grid-cols-3">
      <div class="col-span-1 p-3"  v-for="workout in userSavedWorkouts" :key="workout._id">
        <div class="flex flex-col">
          Name: {{ workout.name }} <br />
          Comment: {{ workout.comment }} <br />
          Creator: {{ workout.creator }} <br />
          Program:
          <li v-for="(exercise, idx) in workout.workout">
            {{ exercise.name }} - Sets: {{ exercise.sets }} - Reps:{{ exercise.reps }}
          </li>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
/*
{
  "_id": "624fda40aeebf2dbe32573ef", 
  "name": "Gro program",
  "comment": "loltest", 
  "workout": [ 
    { "name": "Adductor", "reps": 1, "sets": 1 },
    { "name": "Air Bike", "reps": 1, "sets": 1 } 
  ], 
  "creator": "JIB", 
  "tags": "test"
}

*/
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
      'loginUser',
      'getSavedWorkouts',
      'getUserCookie'
    ])
  },
  computed: {
    ...mapGetters([
      'workoutPlans',
      'loggedInUser',
      'userSavedWorkouts'
    ])
  },
  async mounted() {
    await this.getUserCookie()
    await this.getSavedWorkouts(this.loggedInUser)
  }
}
</script>