
<template>
  <div class="h-full flex flex-col bg-gray-100 dark:bg-gray-700 shadow-xl overflow-y-scroll">
    <div class="col-span-1 p-3">
      <div class="flex flex-col">
        Name: {{ workout.name }} <br />
        Comment: {{ workout.comment }} <br />
        Creator: {{ workout.creator }} <br />
        Program:
        <div v-for="(exercise, idx) in workout.workout" class="border-4 border-teal-400">
          {{ exercise.name }} - Sets: {{ exercise.sets }} - Redps:{{ exercise.reps }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import json from '../../public/exercises.json'

import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Browse',
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
      'workout'
    ])
  },
  async mounted() {
    await this.getWorkoutById(this.workoutId)
  }
}
</script>