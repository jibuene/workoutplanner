
<template>
<div>
  <div>
    <h1 class="text-3xl font-bold">Completed workouts</h1>
    <table class="table table-compact w-full mt-3">
      <thead>
        <tr>
          <td class="bg-sky-400 text-sky-100 border-sky-700">Date</td>
          <th class="bg-sky-400 text-sky-100 border-sky-700">Program Name</th>
          <th class="bg-sky-400 text-sky-100 border-sky-700">Comment</th>
        </tr>
      </thead> 
      <tbody>
        <tr v-for="(exercise, idx) in completedWorkouts" :key="idx">
          <td>{{ exercise.date.substring(0,10) }}</td>
          <td>{{ exercise.name }}</td>
          <td class="whitespace-pre-line">{{ exercise.comment }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="my-5">
    <h1 class="text-3xl font-bold">Favorites ⭐</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-evenly py-3">
      <div v-for="(plan, idx) in userSavedWorkouts" :key="idx" class="card bg-base-100 cursor-pointer pb-4 rounded" @click="goToWorkout(plan._id)">
        <div class="card-body p-3 md:p-6">
          <div class="card-title">{{ plan.name }}</div>
          <p class="text-sm">{{ plan.comment }}</p>
          <div v-for="(workout) in plan.workout" :key="workout._id">
            <p class="text-xs md:text-sm truncate">{{ workout.name }} - reps: {{ workout.reps }} - sets: {{ workout.sets }}</p>
          </div>
        </div>
        <label class="label p-3 md:p-6">
          <p class="label-text-alt truncate">Created by: {{ plan.creator }}</p>
          <p class="label-text-alt truncate">Tags: {{ plan.tags }}</p>
        </label>
      </div>
    </div>
    <p class="leading-none flex justify-evenly">Click on a workout to show it</p>
  </div>
  <div>
    <h1 class="text-3xl font-bold">User created workouts</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-evenly py-3">
      <div v-for="(plan, idx) in userCreatedWorkouts" :key="idx" class="card bg-base-100 cursor-pointer pb-4 rounded" @click="goToWorkout(plan._id)">
        <div class="card-body p-3 md:p-6">
          <div class="card-title">{{ plan.name }}</div>
          <p class="text-sm">{{ plan.comment }}</p>
          <div v-for="(workout) in plan.workout" :key="workout._id">
            <p class="text-xs md:text-sm truncate">{{ workout.name }} - reps: {{ workout.reps }} - sets: {{ workout.sets }}</p>
          </div>
        </div>
        <label class="label p-3 md:p-6">
          <p class="label-text-alt truncate">Created by: {{ plan.creator }}</p>
          <p class="label-text-alt truncate">Tags: {{ plan.tags }}</p>
        </label>
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
      'getUserCookie',
      'getCompletedWorkouts',
      'getCreatedWorkouts'
    ]),
    goToWorkout (id) {
      return this.$router.push({ path: '/workout/' + id })
    }
  },
  computed: {
    ...mapGetters([
      'workoutPlans',
      'loggedInUser',
      'userSavedWorkouts',
      'completedWorkouts',
      'userCreatedWorkouts'
    ])
  },
  async mounted() {
    await this.getUserCookie()
    await this.getSavedWorkouts(this.loggedInUser)
    await this.getCompletedWorkouts(this.loggedInUser)
    await this.getCreatedWorkouts(this.loggedInUser)
  }
}
</script>