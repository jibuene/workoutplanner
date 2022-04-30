<template>
<div>
  <div v-if="workoutProgram.workout.length > 0">
    Current workout program
    <table class="table table-compact w-full">
      <thead>
        <tr>
          <td class="bg-sky-400 text-sky-100 border-sky-700">Exercise</td>
          <th class="bg-sky-400 text-sky-100 border-sky-700">Sets</th>
          <th class="bg-sky-400 text-sky-100 border-sky-700">Reps</th>
        </tr>
      </thead> 
      <tbody>
        <tr v-for="(exercise, idx) in workoutProgram.workout.filter(x => x !== null)" :key="idx">
          <td>{{ exercise.name }}</td>
          <td>{{ exercise.sets }}</td>
          <td>{{ exercise.reps }}</td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-primary my-3" @click="showSaveWorkoutModal = true">
      Save workout
    </button>
  </div>
  <div class="lg:flex lg:justify-between" v-if="exercises.length > 0">
    <!-- <div>
      Current Filter:
      <li v-for="(filter, idx) in workoutFilter.filter(x => x !== null)" :key="idx">{{ filter }}</li>
    </div> -->
    <div class="p-2 bg-base-100 rounded">
      <div class="text-center">
        <label class="uppercase tracking-wide text-xs font-bold">
          Search exercises
        </label>
        <input 
          class="input w-full bg-base-300"
          id="grid-zip"
          type="text"
          placeholder=""
          v-model="workoutTextFilter">
      </div>
      <div v-for="(object, idx) in Object.keys(exercises[0])" :key="idx" class="">
        <exerciseFilter
          v-if="!['instructions', 'name'].includes(object)"
          :id="object"
          :title_text="object"
          :listdata="this.returnDistinct(this.exercises, object)"
          v-model="workoutFilter[idx]"
        />
      </div>
      <hr />
    Results: {{ filterJson.length }}

    </div>
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-1 justify-evenly text-center p-5 bg-base-100 lg:ml-5 sm:mt-5 lg:mt-0 mt-5">
      <div v-for="(exercise, idx) in filterJson" :key="idx" class="bg-base-300 md:h-12 h-24 rounded-lg justify-center" @click="selectedExercise = exercise, showExerciseModal=true">{{ exercise.name }}</div>
    </div>
    <exerciseModal v-if="showExerciseModal" :exercise="selectedExercise" @addToWorkout="addToWorkout" @cancel="showExerciseModal = false" />
    <saveWorkoutModal v-if="showSaveWorkoutModal" :workout="workoutProgram" @close="showSaveWorkoutModal = false"/>
  </div>
</div>
</template>

    // EXAMPLE DATASET
    // {
    //   "name": "3/4 Sit-Up",
    //   "force": "pull",
    //   "level": "beginner",
    //   "mechanic": "compound",
    //   "equipment": "body only",
    //   "primaryMuscles": [
    //     "abdominals"
    //   ],
    //   "secondaryMuscles": [],
    //   "instructions": [
    //     "Lie down on the floor and secure your feet. Your legs should be bent at the knees.",
    //     "Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position.",
    //     "Flex your hips and spine to raise your torso toward your knees.",
    //     "At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only Â¾ of the way down.",
    //     "Repeat for the recommended amount of repetitions."
    //   ],
    //   "category": "strength"
    // },

<script>
import { mapActions } from 'vuex'
import json from '../../public/exercises.json'
import exerciseFilter from '@/components/exerciseFilter.vue'
import exerciseModal from '@/components/exerciseModal.vue'
import saveWorkoutModal from '@/components/saveWorkoutModal.vue'
import programViewer from '@/components/programViewer.vue'

export default {
  name: 'Create',
  components: {
    exerciseFilter,
    exerciseModal,
    saveWorkoutModal,
    programViewer
  },
  data () {
    return {
      exercises: [],
      level: 'dx',
      workoutFilter: [],
      workoutTextFilter: [],
      showExerciseModal: false,
      showSaveWorkoutModal: false,
      selectedExercise: [],
      workoutProgram: {
        name: '',
        comment: '',
        workout: [],
        creator: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'saveWorkout'
    ]),
    async getExercises () {
      this.exercises = json.exercises
    },
    returnDistinct (json = this.exercises, column) {
      if (Array.isArray(json.map(x => x[column])[0])) {
        const extraArr = []
        json.map(x => x[column]).map(x => {
          x.map(x => {
            return extraArr.push(x)
          })
        })
        return [...new Set(extraArr)]
      }
      return [...new Set(json.map(x => x[column]))]
    },
    addToWorkout (item) {
      this.showExerciseModal = false
      this.workoutProgram.workout.push(item)
    }
  },
  computed: {
    filterJson () {
      let newArr = this.exercises
      if (this.workoutTextFilter.length > 0) {
        const rgxp = new RegExp(`${this.workoutTextFilter.toLowerCase()}*`, 'g')
        newArr = newArr.filter(x => x.name.toLowerCase().match(rgxp))
      }
      Object.keys(newArr[0]).map((object, idx) => {
        if (this.workoutFilter[idx]?.length > 0) {
          if (['primaryMuscles', 'secondaryMuscles'].includes(object)) {
            newArr = newArr.filter(x => this.workoutFilter[idx].every(r => x[object].includes(r)))
          } else {
            newArr = newArr.filter(x => this.workoutFilter[idx].includes(x[object]))
          }
        }
      })
      return newArr
    }
  },
  mounted () {
    this.getExercises()
  }
}
</script>
