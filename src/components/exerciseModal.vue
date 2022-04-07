<template> 
	<div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
			<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
			<div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
				<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<div class="sm:flex sm:items-start">
						<div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
							<!-- Heroicon name: plus-circle -->
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">{{ exercise.name }}</h3>
							<div class="mt-2">
								<template v-for="(data, idx) in exercise" :key="idx">
									<p class="text-sm text-gray-500" v-if="idx !== 'name'">{{ idx.toUpperCase() }}: {{ data }}</p>
								</template>
								<img
									:src="`../../public/exercises/${exercise.name.replaceAll(' ', '_').replaceAll('/', '_')}/images/0.jpg`"
									class="p-1 bg-white border rounded max-w-sm"
									alt="No image available"
								/>
								<div class="flex">
									<div class="w-full md:w-1/3 px-3 mb-6 md:mb- text-center">
										<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
											Sets
										</label>
										<input 
											class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											id="grid-zip"
											type="number"
											placeholder="0"
											v-model="sets">
									</div>
									<div class="w-full md:w-1/3 px-3 mb-6 md:mb- text-center">
										<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
											Reps
										</label>
										<input
											class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											id="grid-zip"
											type="number"
											placeholder="0"
											v-model="reps">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
					<button
						type="button"
						class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
						@click="this.$emit('addToWorkout', { name: exercise.name, reps: reps, sets: sets })"
					>
						Add to workout
					</button>
					<button
						type="button"
						class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
						@click="this.$emit('cancel')"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['exercise'],
		data () {
			return {
				sets: 0,
				reps: 0
			}
		},
		computed: {
		}
	}
</script>