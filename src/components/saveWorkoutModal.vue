<template> 
	<div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
			<div class="fixed inset-0 bg-base-100/90 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
			<label for="my-modal-4" class="modal cursor-pointer visible opacity-100 pointer-events-auto">
				<label class="modal-box relative" for="">
					<div class="mt-3 text-center sm:mt-0 sm:ml-4">
						<div class="mt-2">
							<div class="">
								<p v-if="editingWorkout" class="mb-3 text-xl">You are editing: {{ workout.name }}</p>
								<div class="w-full px-3 mb-6 md:mb- text-center">
									<label class="block uppercase tracking-wide text-xs mb-2" for="grid-zip">
										Name of program
									</label>
									<input 
										class="input input-bordered w-full"
										id="grid-zip"
										type="text"
										placeholder="Name of program"
										v-model="workout.name" required>
								</div>
								<div class="w-full px-3 mb-6 md:mb- text-center">
									<label class="block uppercase tracking-wide text-xs mb-2" for="grid-zip">
										Comment
									</label>
									<textarea
										class="textarea textarea-bordered w-full"
										id="grid-zip"
										type="text"
										placeholder="Write custom instructions/comments"
										v-model="workout.comment" required></textarea>
								</div>
								<div class="w-full px-3 mb-6 md:mb- text-center">
									<label class="block uppercase tracking-wide text-xs mb-2" for="grid-zip">
										Search tags (split with ,)
									</label>
									<input 
										class="input input-bordered w-full"
										id="grid-zip"
										type="text"
										placeholder="pull,push,bench,super awsm program3000"
										v-model="workout.tags">
								</div>
							</div>
						</div>
					</div>
					<div>
						<div class="form-control" @click="workout.private = !workout.private">
							<label class="label cursor-pointer pointer-events-none" >
								<span class="label-text">Private</span>
								<input type="checkbox" class="toggle toggle-primary" :checked="workout.private" />
							</label>
							<p class=" text-sm text-slate-500 mb-5 text-left">This will hide the program from the "Browse" section. <br />You can still share it using the URL<br /> <span class="text-warning">You can edit this later</span></p>
						</div>
					</div>
					<div>
						<button
							type="button"
							class="btn btn-accent mr-4"
							@click="this.$emit('close')"
						>
							Cancel
						</button>
						<button
							type="button"
							class="btn btn-primary"
							:disabled="workout.name === '' || workout.comment === ''"
							@click="saveWorkout(workout), this.$emit('reset')"
						>
							Save Workout
						</button>
					</div>
				</label>
			</label>
		</div>
	</div>
</template>
<script>
import { mapActions } from 'vuex'

	export default {
		props: ['workout', 'editingWorkout'],
		data () {
			return {
				sets: 0,
				checked: 0
			}
		},
		methods: {
			...mapActions([
				'saveWorkout'
			])
		}
	}
</script>