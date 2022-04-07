
<template>
  <div class="bg-gray-50 px-3">
    <div class="w-full md:mb- text-center">
      <label class="uppercase tracking-wide text-gray-700 text-xs font-bold my-2">
        Search workouts
      </label>
      <input 
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-zip"
        type="text"
        placeholder=""
        v-model="workoutFilter">
      <hr class="border-0 bg-gray-500 text-gray-500 h-px mt-3 mb-3">
    </div>
    <div class="lg:max-w-full lg:flex grid grid-cols-3 gap-2 justify-evenly text-center">
      <div v-for="(plan, idx) in filterWorkoutsByTag" :key="idx" class="border-r border-b border-t border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div class="mb-8">
          <div class="text-gray-900 font-bold text-xl mb-2">{{ plan.name }}</div>
          <p class="text-sm text-gray-600">{{ plan.comment }}</p>
          <template v-for="(workout) in plan.workout" :key="workout._id">
            <li class="truncate ">{{ workout.name }} - reps: {{ workout.reps }} - sets: {{ workout.sets }}</li>
          </template>
        </div>
        <div class="text-center">
          <div class="text-sm">
            <p class="text-gray-900 leading-none">Created by: {{ plan.creator }}</p>
            <p class="text-gray-900 leading-none">Tags: {{ plan.tags }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Browse',
  data () {
    return {
      workoutFilter: ''
    }
  },
  methods: {
    ...mapActions([
      'getWorkouts'
    ])
  },
  computed: {
    ...mapGetters([
      'workoutPlans'
    ]),
    filterWorkoutsByTag () {
      if (this.workoutFilter === '') {
        return this.workoutPlans
      }
      return this.workoutPlans.filter(x => x.tags && x.tags.split(',').some(rx => rx.match(this.workoutFilter)))
    }
  },
  mounted () {
    this.getWorkouts()
  }
}
</script>