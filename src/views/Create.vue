<template>
  <div class="bg-gray-20 mx-2" v-if="exercises.length > 0">
    <div class="flex justify-center">
      <div class="flex justify-center bg-neutral-400 w-full border-b-2 border-neutral-900">
        <template v-for="(object, idx) in Object.keys(exercises[0])" :key="idx" class="">
          <newFilter v-if="!['instructions', 'name'].includes(object)" :id="object" :title_text="object" :listdata="this.returnDistinct(this.exercises, object)" v-model="workoutFilter[idx]"/>
        </template>
      </div>
    </div>
    <div>
      Current workout program
      <programViewer :program="workoutProgram.workout.filter(x => x !== null)" />
      <button
        type="button"
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
        @click="showSaveWorkoutModal = true"
      >
        Save workout
      </button>
    </div>
    <div>
      Current Filter:
      <li v-for="(filter, idx) in workoutFilter.filter(x => x !== null)" :key="idx">{{ filter }}</li>
    </div>
    <br />
    Results: {{ filterJson.length }}
    <div class="grid grid-cols-3 gap-1 justify-evenly text-center">
      <div v-for="(exercise, idx) in filterJson" :key="idx" class="bg-blue-900 w-26 h-14 rounded-lg text-white" @click="selectedExercise = exercise, showExerciseModal=true">{{ exercise.name }}</div>
    </div>
    <exerciseModal v-if="showExerciseModal" :exercise="selectedExercise" @addToWorkout="addToWorkout" @cancel="showExerciseModal = false" />
    <saveWorkoutModal v-if="showSaveWorkoutModal" :workout="workoutProgram" @close="showSaveWorkoutModal = false"/>
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
import json from '../../public/exercises/exercises.json'
import newFilter from '@/components/newFilter.vue'
import exerciseModal from '@/components/exerciseModal.vue'
import saveWorkoutModal from '@/components/saveWorkoutModal.vue'
import programViewer from '@/components/programViewer.vue'

export default {
  name: 'Create',
  components: {
    newFilter,
    exerciseModal,
    saveWorkoutModal,
    programViewer
  },
  data () {
    return {
      exercises: [],
      level: 'dx',
      workoutFilter: [],
      showExerciseModal: false,
      showSaveWorkoutModal: false,
      selectedExercise: [],
      workoutProgram: {
        name: 'xd',
        comment: 'loltest',
        workout: [],
        creator: 'JIB'
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
