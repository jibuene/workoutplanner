
<template>
  <div class="h-full flex flex-col">
    <div class="col-span-1 p-3">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div class="md:col-span-1 lg:col-span-2" >
          <div class="card bg-base-200 rounded-sm">
            <div class="card-body">
              <h5 class="card-title justify-center">{{ workout.name }}</h5>
              <div class="flex justify-center">
                <h3 class="text-2xl font-bold">{{ workout.comment }}</h3>
              </div>
            </div>
            <div class="card-actions justify-center">
              <span class="text-gray-500">Creator: {{ workout.creator }}</span>
            </div>
            <div class="card-actions justify-between">
              <div class="rating ml-2 mt-5" v-if="userRatings.find(x => x.program === workoutId)">
                <input
                  @change="setRating({ rating: key, program: workoutId })"
                  :disabled="loggedInUser.length === 0"
                  :checked="userRatings.find(x => x.program === workoutId).rating === key"
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-300 ml-1"
                  v-for="key in [1, 2, 3, 4, 5]"
                  :key="key"
                />
              </div>
              <div class="rating ml-2 mt-5" v-else>
                <input
                  @change="setRating({ rating: key, program: workoutId })"
                  :disabled="loggedInUser.length === 0"
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-300 ml-1"
                  v-for="key in [1, 2, 3, 4, 5]"
                  :key="key"
                />
              </div>
              <button
                class="btn btn-accent m-2"
                @click="setFavoriteWorkout({ program: workoutId, username: loggedInUser.username})"
                :disabled="loggedInUser.length === 0"
                v-if="userFavoriteWorkouts.filter(x => x._id === workoutId).length === 0">
                ⭐
              </button>
              <button class="btn m-2" @click="removeFavoriteWorkout(workoutId)" v-else>
                ❌ Remove from favorites
              </button>
            </div>
          </div>
        </div>
        <div class="h-full py-8 px-6 space-y-6 rounded bg-base-200">
          <label for="workoutComment" class="">
            <h5 class="text-xl card-title">Personal workout comment</h5>
            <p class="text-sm text-gray-500">This can only be seen by you</p>
          </label>
          <textarea
            class="textarea w-full bg-base-300"
            id="workoutComment"
            rows="2"
            placeholder="Write your comment here"
            v-model="comment"
            :disabled="loggedInUser.length === 0"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <section class="relative py-8">
          <div class="break-words">
            <h3 class="font-semibold text-lg">Workout Program</h3>
            <div class="overflow-x-auto">
              <table class="table table-compact w-full">
                <thead>
                  <tr>
                    <td class="bg-sky-400 text-sky-100 border-sky-700">Exercise</td>
                    <th class="bg-sky-400 text-sky-100 border-sky-700">Sets</th>
                    <th class="bg-sky-400 text-sky-100 border-sky-700">Reps</th>
                    <th class="bg-sky-400 text-sky-100 border-sky-700">Completed</th>
                  </tr>
                </thead> 
                <tbody>
                  <tr v-for="(exercise, idx) in workout.workout" :key="idx">
                    <td @click="selectedExercise = exercise, showExerciseModal=true">{{ exercise.name }}</td>
                    <td>{{ exercise.sets }}</td>
                    <td>{{ exercise.reps }}</td>
                    <td>
                      <input class="checkbox checkbox-primary" type="checkbox" name="Completed workout">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
        <exerciseModal v-if="showExerciseModal" :exercise="selectedExercise" @cancel="showExerciseModal = false" />
        <button
          class="btn mt-3"
          @click="saveCompletedWorkout({ program: workout.name, date: new Date(), comment: comment, username: loggedInUser.username})"
          :disabled="loggedInUser.length === 0">
          Save completed workout
        </button>
      </section>
    </div>
    <div v-if="loggedInUser.length === 0" class="text-error">
      Login to enable all features
    </div>
  </div>
</template>
<script>
import exerciseModal from '@/components/exerciseModal.vue'

import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Browse',
  data () {
    return {
      workoutId: this.$route.params.id,
      showExerciseModal: false,
      selectedExercise: [],
      comment: ''
    }
  },
  components: {
    exerciseModal
  },
  methods: {
    ...mapActions([
      'getWorkoutById',
      'saveCompletedWorkout',
      'setFavoriteWorkout',
      'getFavoriteWorkouts',
      'removeFavoriteWorkout',
      'setRating',
      'getRatings'
    ])
  },
  computed: {
    ...mapGetters([
      'workout',
      'loggedInUser',
      'userFavoriteWorkouts',
      'userRatings'
    ])
  },
  async mounted() {
    await this.getWorkoutById(this.workoutId)
    if (this.loggedInUser.length !== 0) {
      await this.getFavoriteWorkouts()
      await this.getRatings()
    }
  }
}
</script>
<style>

[type='radio']:checked {
  background-image: none
}

</style>