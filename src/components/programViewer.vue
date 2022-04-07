<template> 
	<div class="flex flex-col">
		<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
				<div class="overflow-hidden">
					<table class="min-w-full border text-center">
						<thead class="border-b border-b bg-gray-800 boder-gray-900">
							<tr>
								<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 border-r text-white">
									#
								</th>
								<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 border-r text-white">
									Name
								</th>
								<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 border-r text-white">
									Sets
								</th>
								<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-white">
									Reps
								</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b" v-for="(exercise, idx) in program" :key="idx">
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{{ idx + 1 }}</td>
								<td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
									{{ exercise.name }}
								</td>
								<td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
									{{ exercise.sets }}
								</td>
								<td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
									{{ exercise.reps }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['program'],
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