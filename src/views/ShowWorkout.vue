<template>
  <div class="h-full flex flex-col">
    <div class="col-span-1 p-3">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div class="md:col-span-1 lg:col-span-2" >
          <div class="card bg-base-200 rounded-sm shadow-xl">
            <div class="card-body">
              <h5 class="card-title justify-center">{{ workout.name }}</h5>
              <p class="flex justify-center">{{ workout.comment }}</p>
            </div>
            <div class="card-actions justify-center">
              <span class="text-gray-500">Creator: {{ workout.creator }}</span>
            </div>
            <div class="card-actions justify-between">
              <div class="ml-3">
                <rating :id="workoutId" :userRating="this.userRatings" :disabled="loggedInUser.length === 0" />
              </div>
              <button
                class="btn hover:btn-accent m-2"
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
        <div class="h-full py-8 px-6 space-y-6 rounded bg-base-200 shadow-xl">
          <label for="workoutComment" class="">
            <h5 class="text-xl card-title">Personal workout comment</h5>
            <p class="text-sm text-gray-500">This can only be seen by you</p>
          </label>
          <textarea
            class="textarea w-full bg-base-300 textarea-secondary"
            id="workoutComment"
            rows="2"
            :placeholder="loggedInUser.length === 0 ? 'You must be logged in to comment' : 'Type here...'"
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
                <tr v-for="(exercise, idx) in workout.workout" :key="idx" @click="selectedExercise = exercise, showExerciseModal=true">
                  <td class="cursor-pointer">{{ exercise.name }}</td>
                  <td class="cursor-pointer">{{ exercise.sets }}</td>
                  <td class="cursor-pointer">{{ exercise.reps }}</td>
                  <td v-on:click.stop>
                    <label :for="idx" class="btn modal-button">📝</label>
                    <input type="checkbox" :id="idx" class="modal-toggle" />
                    <div class="modal">
                      <div class="modal-box">
                        <h3 class="font-bold text-lg">Weight / Sets</h3>
                        <div v-for="(set, sidx) in workoutLog[idx]" :key="sidx">
                        <p class="py-2">Set: {{ sidx + 1 }}</p>
                        <label class="input-group">
                          <span class="w-1/6">Weight</span>
                          <input type="number" class="input input-bordered" v-model="set.weight">
                        </label>
                        <label class="input-group my-1">
                          <span class="w-1/6">Reps</span>
                          <input type="number" class="input input-bordered" v-model="set.reps">
                        </label>
                        </div>
                        <div class="modal-action">
                          <label :for="idx" class="btn">Finished</label>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <span class="text-gray-500">Click on an exercise to show instructions</span>
          </div>
        </div>
        <exerciseModal v-if="showExerciseModal" :exercise="selectedExercise" @cancel="showExerciseModal = false" />
        <button
          class="btn mt-3"
          @click="saveCompletedWorkout({ program: workout.name, workoutId: workoutId, date: new Date(), comment: comment, username: loggedInUser.username, workoutLog: workoutLog })"
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
import rating from '@/components/rating.vue'

import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Browse',
  data () {
    return {
      workoutId: this.$route.params.id,
      showExerciseModal: false,
      selectedExercise: [],
      comment: '',
      workoutLog: []
    }
  },
  components: {
    exerciseModal,
    rating
  },
  methods: {
    ...mapActions([
      'getWorkoutById',
      'saveCompletedWorkout',
      'setFavoriteWorkout',
      'getFavoriteWorkouts',
      'removeFavoriteWorkout',
      'setRating',
      'getUserRatings'
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
    // {{ [[{ weight: 25.5, reps: 12 }, { weight: 25.5, reps: 12 }, { weight: 0, reps: 0 }],[{ weight: 25.5, reps: 12 }, { weight: 25.5, reps: 12 }, { weight: 0, reps: 0 }]] }}
    await this.getWorkoutById(this.workoutId)
    if (this.loggedInUser.length !== 0) {
      await this.getFavoriteWorkouts()
      await this.getUserRatings()
      this.workout.workout.map((x, idx) => {
        this.workoutLog[idx] = [],
        [...Array(x.sets)].forEach((z, idxx) => {
          this.workoutLog[idx].push({ weight: 0, reps: x.reps })
        })
      })
    }
  }
}
</script>
<style scoped>

  [type='radio']:checked {
    color: gold;
    background-color: gold;
    background-image: none;
  }

</style>