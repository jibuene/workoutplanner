<template>
  <div class="h-full flex flex-col">
    <div class="col-span-1 p-3">
      <table class="table">
      <thead>
        <th>Exercise</th>
        <th>weight/Reps</th>
      </thead>
      <tbody>
        <tr v-for="(exercise, idx) in workout.workout" :key="idx">
          <td>{{ exercise.name }}</td>
          <td>
            <div v-for="(sets) in showCompletedWorkout.workoutLog[idx]" :key="sets">{{ sets.weight }} Kg - {{ sets.reps }} reps</div>
          </td>
        </tr>
      </tbody>
      </table>
    </div>
  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ShowCompletedWorkout',
  data () {
    return {
      workoutId: this.$route.params.id
    }
  },
  methods: {
    ...mapActions([
      'getWorkoutById'
    ])
  },
  computed: {
    ...mapGetters([
      'showCompletedWorkout',
      'workout'
    ])
  },
  async mounted() {
    await this.getWorkoutById('6294be0f64a3e463918db958')
  }
}
</script>
<style scoped>

</style>