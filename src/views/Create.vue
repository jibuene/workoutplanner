<template>
<div class="">
  <div class="alert alert-info shadow-lg mb-5" v-if="editingWorkout.name">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span>Editing workoutplan: {{ editingWorkout.name }}</span>
    </div>
  </div>
  <div v-if="workoutProgram.workout.length > 0" class="overflow-x-auto">
    Current workout program
    <table class="table table-compact w-full">
      <thead>
        <tr>
          <td class="bg-sky-400 text-sky-100 border-sky-700">Exercise</td>
          <th class="bg-sky-400 text-sky-100 border-sky-700">Sets</th>
          <th class="bg-sky-400 text-sky-100 border-sky-700">Reps</th>
          <th class="bg-sky-400 text-sky-100 border-sky-700">Description</th>
          <th class="bg-sky-400 text-sky-100 border-sky-700"></th>
        </tr>
      </thead> 
      <tbody>
        <tr v-for="(exercise, idx) in workoutProgram.workout.filter(x => x !== null)" :key="idx">
          <td>{{ exercise.name }}</td>
          <td><input class="input input-bordered" type="number" min="0" oninput="this.value = Math.abs(this.value)" v-model="exercise.sets"></td>
          <td><input class="input input-bordered" type="number" min="0" oninput="this.value = Math.abs(this.value)"  v-model="exercise.reps"></td>
          <td class="cursor-pointer">
            <label :for="idx" class="btn modal-button">📝</label>
            <input type="checkbox" :id="idx" class="modal-toggle" />
            <div class="modal">
              <div class="modal-box">
                <h3 class="font-bold text-lg">Editing instrucitons</h3>
                <textarea class="textarea textarea-bordered w-full" rows="8" v-model="exercise.customInstructions"></textarea>
                <div class="modal-action">
                  <label :for="idx" class="btn">Finished</label>
                </div>
              </div>
            </div>
          </td>
          <td @click="removeExercise(idx)" class="cursor-pointer">🗑️</td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-primary my-3" @click="showSaveWorkoutModal = true">
      Save workout
    </button>
  </div>
  <div class="lg:flex lg:justify-between" v-if="exercises.length > 0">
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
      <hr />
      <div class="p-2 bg-base-300 rounded mt-3">
        <p>Select page</p>
        <div class="grid grid-cols-4 gap-1">
          <button
            v-for="idx in Math.floor(filteredArrayLength / 100) + 1"
            :key="idx" class="btn btn-sm"
            @click="pageSelected = idx - 1"
            :class="pageSelected === idx - 1 ? 'btn-accent' : ''">
              {{ idx }}
            </button>
        </div>
      </div>
      <hr />
      <!-- <div class="p-2 bg-base-300 rounded mt-3">
        Current Filter: <button @click="workoutFilter = []">Clear Filter</button>
        <li v-for="(filter, idx) in workoutFilter.filter(x => x !== null && x.length > 0)" :key="idx">{{ filter }}</li>
      </div> -->
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-1 justify-evenly text-center p-2 bg-base-100 lg:ml-5 sm:mt-5 lg:mt-0 mt-5" v-if="filterJson.length > 0">
      <div v-for="(exercise, idx) in filterJson" :key="idx" class="card bg-base-100 shadow-xl rounded-sm image-full z-0" @click="selectedExercise = exercise, showExerciseModal=true">
          <figure>
            <img
              v-lazy="`../../exercises/${exercise.name.replaceAll(' ', '_').replaceAll('/', '_')}/images/1.jpg`"
              class=""
              alt="No image available"
            />
          </figure>
          <div class="card-body">
            <div class="card-title">
              {{ exercise.name }}
            </div>
          </div>
      </div>
    </div>
    <div class="flex justify-start" v-else>
      <div class="text-2xl">No results</div>
    </div>
    <exerciseModal v-if="showExerciseModal" :exercise="selectedExercise" @addToWorkout="addToWorkout" @cancel="showExerciseModal = false" />
    <saveWorkoutModal v-if="showSaveWorkoutModal" :workout="workoutProgram" @close="showSaveWorkoutModal = false" @reset="resetData()" :editingWorkout="editingWorkout._id"/>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import json from '../../public/exercises.json'
import exerciseFilter from '@/components/exerciseFilter.vue'
import exerciseModal from '@/components/exerciseModal.vue'
import saveWorkoutModal from '@/components/saveWorkoutModal.vue'
import programViewer from '@/components/programViewer.vue'
import Swal from 'sweetalert2'

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
      pageSelected: 0,
      filteredArrayLength: 0,
      exercises: [],
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
    async resetData () {
      this.workoutProgram = {
        name: '',
        comment: '',
        workout: [],
        creator: ''
      },
      this.showSaveWorkoutModal = false
    },
    async removeExercise (idx) {
      const result = await Swal.fire({
        title: 'Do you want to remove this exercise from the program?',  
        showDenyButton: true, 
        confirmButtonText: 'Yes',  
        denyButtonText: 'No',
      })
      if (result.isConfirmed) {
        this.workoutProgram.workout.splice(idx, idx + 1)
      }
    },
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
    ...mapGetters(['editingWorkout']),
    filterJson () {
      let newArr = this.exercises
      if (this.workoutTextFilter.length > 0) {
        const rgxp = new RegExp(`${this.workoutTextFilter.toLowerCase()}*`, 'g')
        console.log(newArr.filter(x => x.name.toLowerCase().match(rgxp)))
        newArr = newArr.filter(x => x.name.toLowerCase().match(rgxp))
      }
      if (newArr.length === 0) {
        return []
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
      this.pageSelected = this.pageSelected * 100 > newArr.length ? 0 : this.pageSelected
      this.filteredArrayLength = newArr.length
      return newArr.filter((x, idx) => idx >= this.pageSelected * 100 && idx < (this.pageSelected * 100) + 100)
    }
  },
  mounted () {
    this.getExercises()
    if (this.editingWorkout.workout) {
      this.workoutProgram.workout = this.editingWorkout.workout
      this.workoutProgram.name = this.editingWorkout.name
      this.workoutProgram.comment = this.editingWorkout.comment
      this.workoutProgram.tags = this.editingWorkout.tags
      this.workoutProgram.private = this.editingWorkout.private
    }
  }
}
</script>
<style>
.card.image-full:before {
  border-radius: 1px;
}
</style>