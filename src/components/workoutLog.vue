<template>
	<div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" @click="this.$emit('cancel')">
		<div class="flex items-end justify-center pt-4">
			<div class="fixed inset-0 bg-base-100/90 bg-opacity-75 transition-opacity" tabindex="0"  aria-hidden="true"></div>
        <table class="table table-zebra table-compact border-2 modal-box">
        <thead>
          <th>Exercise</th>
          <th>weight/Reps</th>
        </thead>
        <tbody>
          <tr v-for="(exercise, idx) in workout.workout" :key="idx">
            <td>{{ exercise.name }}</td>
            <td>
              <div v-for="(sets) in workoutLog.workoutLog[idx]" :key="sets">{{ sets.weight }} Kg - {{ sets.reps }} reps</div>
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
  props: ['workoutLog', 'workoutId'],
  name: 'ShowCompletedWorkout',
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
    await this.getWorkoutById(this.workoutId)
  }
}
</script>
<style scoped>

</style>