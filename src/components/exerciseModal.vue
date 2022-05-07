<template> 
	<div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" @click="this.$emit('cancel')">
		<div class="flex items-end justify-center pt-4 px-4 pb-20 sm:block sm:p-0">
			<div class="fixed inset-0 bg-base-100/90 bg-opacity-75 transition-opacity" tabindex="0"  aria-hidden="true"></div>
			<label for="my-modal-4" class="modal cursor-pointer visible opacity-100 pointer-events-auto">
				<label class="modal-box" for="" v-on:click.stop>
					<div class="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
						<h3 class="text-lg leading-6 font-medium" id="modal-title">{{ exercise.name }}</h3>
						<div class="mt-2">
							<table class="table table-compact w-full">
								<thead>
								</thead>
								<tbody>
									<tr v-for="(data, idx) in exercise" :key="idx">
										<template v-if="!['name', 'instructions', 'customInstructions'].includes(idx)">
											<template v-if="Array.isArray(data)">
												<td class="border-sky-700 align-top bg-base-300">{{ idx.toUpperCase() }}:</td>
												<td class="border-sky-700 bg-base-300"><div v-for="item in data" :key="item">{{ firstLetterUppercase(item) }}</div></td>
											</template>
											<template v-else>
												<td class="border-sky-700 bg-base-300">{{ idx.toUpperCase() }}:</td>
												<td class="border-sky-700 bg-base-300">{{ firstLetterUppercase(data) }}</td>
											</template>
										</template>
									</tr>
								</tbody>
							</table>
							<template v-if="exercise['customInstructions']">
								<p class="text-sm whitespace-pre-line">Instructions: <br /> {{ exercise['customInstructions'].replaceAll('.', '\n') }}</p>
							</template>
							<template v-if="!exercise['customInstructions']">
								<div class="w-full my-6 md:mb- text-center">
									<label class="block uppercase tracking-wide text-xs mb-2" for="grid-zip">
										Write custom instructions if you want to
									</label>
									<textarea
										class="textarea textarea-bordered w-full rounded-none"
										id="grid-zip"
										type="text"
										rows="8"
										v-model="instructions"
										></textarea>
								</div>
							</template>
							<img
								:src="`../../exercises/${exercise.name.replaceAll(' ', '_').replaceAll('/', '_')}/images/0.jpg`"
								class="p-1 border border-base-300 rounded"
								alt="No image available"
								:hidden="!swapImage"
							/>
							<img
								:src="`../../exercises/${exercise.name.replaceAll(' ', '_').replaceAll('/', '_')}/images/1.jpg`"
								class="p-1 border border-base-300 rounded"
								alt="No image available"
								:hidden="swapImage"
							/>
						</div>
					</div>
					<div v-if="!exercise['customInstructions']">
						<div class="flex justify-center">
							<div class="w-full px-3 mb-6 md:mb- text-center">
								<label class="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-zip">
									Sets
								</label>
								<input 
									class="input input-bordered w-full"
									id="grid-zip"
									type="number"
									placeholder="0"
									v-model="sets">
							</div>
							<div class="w-full px-3 md:mb- text-center">
								<label class="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-zip">
									Reps
								</label>
								<input
									class="input input-bordered w-full"
									id="grid-zip"
									type="number"
									placeholder="0"
									v-model="reps">
							</div>
						</div>
						<div class="mt-6 text-center">
							<button
								type="button"
								class="btn btn-accent mr-4"
								@click="this.$emit('cancel')"
							>
								Cancel
							</button>
							<button
								type="button"
								class="btn btn-primary"
								@click="this.$emit('addToWorkout', { name: exercise.name, reps: reps, sets: sets, customInstructions: instructions })"
							>
								Add to workout
							</button>
						</div>
					</div>
					<div class="text-center my-2" v-else>
						<button
							type="button"
							class="btn btn-primary mr-4"
							@click="this.$emit('cancel')"
						>
							Ok
						</button>
					</div>
				</label>
			</label>
		</div>
	</div>
</template>
<script>
import { SimpleBar } from 'simplebar-vue3'

export default {
	props: ['exercise'],
	components: {
		SimpleBar
	},
	data () {
		return {
			sets: 0,
			reps: 0,
			instructions: this.exercise['instructions']?.join(' ') || '',
			swapImage: true
		}
	},
	computed: {
	},
	methods: {
		firstLetterUppercase (word) {
			if (!word) {
				return null
			}
			if (typeof word === 'number') {
				return word
			}
			return word.slice(0, 1).toUpperCase() + word.slice(1)
		}
	},
  beforeDestroy() {
    console.log('Main Vue destroyed')
  },
	created () {
		setInterval(() => {
			this.swapImage = !this.swapImage
		}, 1000)
	}
}
</script>
<style>
	.simplebar-scrollbar{
		width: 10px;
  }
</style>