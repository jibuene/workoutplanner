
<template>
<div>
  <div class="stats shadow mb-4 flex">
    
    <div class="stat">
      <div class="stat-figure text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
      </div>
      <div class="stat-title">Total Favorites</div>
      <div class="stat-value text-primary">{{ userCreatedWorkouts.reduce((a, b) => a + b.favorites, 0) }}</div>
      <div class="stat-desc">Total of your created workouts</div>
    </div>
    <div class="stat">
      <div class="stat-figure">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      </div>
      <div class="stat-title">Overall Rating</div>
      <div class="stat-value">{{ totalRating.reduce((a, b) => a + b, 0) / totalRating.length }}</div>
      <div class="stat-desc">Total of your created workouts</div>
    </div>
    <div class="stat">
      <div class="stat-figure text-secondary">
        <div class="avatar rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <div class="w-16 rounded-full">
            <img src="data:image/jpeg;base64,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" />
          </div>
        </div>
      </div>
      <div class="stat-actions">Welcome {{ loggedInUser.username }}</div>
    </div>
  </div>
  <div>
    <h1 class="text-3xl font-bold ">Completed workouts</h1>
    <div class="overflow-x-auto">
      <table class="table table-compact w-full mt-3 ">
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
  </div>
  <div class="my-5">
    <h1 class="text-3xl font-bold">Favorites ⭐</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-evenly py-3">
      <div v-for="(plan, idx) in userFavoriteWorkouts" :key="idx" class="card bg-base-100 cursor-pointer pb-4 rounded" @click="goToWorkout(plan._id)">
        <div class="card-body p-3 md:p-6">
          <div class="card-title">{{ plan.name }}</div>
          <p class="text-sm">{{ plan.comment }}</p>
          <div v-for="(workout) in plan.workout" :key="workout._id">
            <p class="text-xs md:text-sm truncate">{{ workout.name }} - reps: {{ workout.reps }} - sets: {{ workout.sets }}</p>
          </div>
        </div>
        <div class="rating ml-2 mt-5" >
          <rating :id="plan._id" :userRating="this.userRatings" v-on:click.stop />
        </div>
        <label class="label p-3 md:p-6">
          <p class="label-text-alt truncate">Created by: {{ plan.creator }}</p>
          <p class="label-text-alt truncate" v-if="plan.tags?.length > 0">Tags: <span v-for="(tag, idx) in plan.tags.split(',')" :key="idx" class="badge badge-primary">{{ tag }}</span></p>
        </label>
      </div>
    </div>
    <p class="leading-none flex justify-evenly">Click on a workout to show it</p>
  </div>
  <div>
    <h1 class="text-3xl font-bold">User created workouts</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-evenly py-3">
      <div v-for="(plan, idx) in userCreatedWorkouts" :key="idx" class="card bg-base-100 cursor-pointer pb-4 rounded inline-block" @click="goToWorkout(plan._id)">
          <button class="btn btn-accent w-1/2 btn-sm rounded-none" @click="editWorkout(plan)" v-on:click.stop>Edit</button>
          <button class="btn btn-error w-1/2 btn-sm rounded-none" @click="deleteWorkout(plan._id)" v-on:click.stop>Delete</button>
        <div class="card-body p-3 md:p-6">
          <div class="card-title">{{ plan.name }}</div>
          <p class="text-sm">{{ plan.comment }}</p>
          <div v-for="(workout) in plan.workout" :key="workout._id">
            <p class="text-xs md:text-sm truncate">{{ workout.name }} - reps: {{ workout.reps }} - sets: {{ workout.sets }}</p>
          </div>
        </div>
        <div class="rating ml-2 mt-5" v-if="userRatings && userRatings.find(x => x.program === plan._id)" >
          <rating :id="plan._id" :userRating="this.userRatings" :disabled="loggedInUser.length === 0" v-on:click.stop />
        </div>
        <label class="label p-3 md:p-6">
          <p class="label-text-alt truncate">Favorites: {{ plan.favorites }}</p>
          <p class="label-text-alt truncate" v-if="plan.tags?.length > 0">Tags: <span v-for="(tag, idx) in plan.tags.split(',')" :key="idx" class="badge badge-primary">{{ tag }}</span></p>
        </label>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import rating from '@/components/rating.vue'

export default {
  name: 'Browse',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      totalRating: []
    }
  },
  components: {
    rating
  },
  methods: {
    ...mapActions([
      'createUser',
      'loginUser',
      'getFavoriteWorkouts',
      'getCompletedWorkouts',
      'getCreatedWorkouts',
      'getUserRatings',
      'setRating',
      'getRatings',
      'editWorkout',
      'deleteWorkout'
    ]),
    goToWorkout (id) {
      return this.$router.push({ path: '/workout/' + id })
    }
  },
  computed: {
    ...mapGetters([
      'workoutPlans',
      'loggedInUser',
      'userFavoriteWorkouts',
      'completedWorkouts',
      'userCreatedWorkouts',
      'userRatings'
    ])
  },
  async mounted() {
    await this.getFavoriteWorkouts()
    await this.getCompletedWorkouts(this.loggedInUser)
    await this.getCreatedWorkouts(this.loggedInUser)
    await this.getUserRatings()
    this.userCreatedWorkouts.map(async x => {
      const rating = await this.getRatings(x._id)
      if (rating !== 0) {
        this.totalRating.push(rating)
      }
    })
  }
}
</script>
<style scoped>

  [type='checkbox']:checked, [type='radio']:checked {
    color: gold;
    background-color: gold;
    background-image: none;
  }

</style>