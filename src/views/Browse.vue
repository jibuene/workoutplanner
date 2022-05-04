<template>
  <div>
    <div class="form-control md:mb- text-center bg-base-100 p-2 rounded mb-2">
      <label class="uppercase tracking-wide text-xs font-bold">
        Search workouts
      </label>
      <input 
        class="input w-full bg-base-300"
        id="grid-zip"
        type="text"
        placeholder=""
        v-model="workoutFilter">
      <hr class="border-0 bg-base-100 h-px mt-3">
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-evenly">
      <div v-for="(plan, idx) in filterWorkoutsByTag" :key="idx" class="card bg-base-100 cursor-pointer pb-4 rounded" @click="goToWorkout(plan._id)">
        <div class="card-body p-3 md:p-6">
          <div class="card-title">{{ plan.name }}</div>
          <p class="text-sm">{{ plan.comment }}</p>
          <div v-for="(workout) in plan.workout" :key="workout._id">
            <p class="text-xs md:text-sm truncate">{{ workout.name }} - reps: {{ workout.reps }} - sets: {{ workout.sets }}</p>
          </div>
        </div>
        <label class="label p-3 md:p-6">
          <span class="label-text-alt">Created by: {{ plan.creator }}</span>
          <span class="label-text-alt">Tags: {{ plan.tags }}</span>
        </label>
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
    ]),
    goToWorkout (id) {
      return this.$router.push({ path: '/workout/' + id })
    }
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