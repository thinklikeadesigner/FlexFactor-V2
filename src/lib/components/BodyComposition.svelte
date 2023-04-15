<script lang="ts">
	import { get } from 'svelte/store';
	import UserStore from '../../stores/UserStore';
	import User from '../../utils/User';
	import { calculateBodyComposition } from '../../utils/BodyCompositionResults';

	let { currentWeight, bf, desiredMuscleGain } = $UserStore;
	let totalWeightGain: number= 1;

	const bodyComposition = calculateBodyComposition(desiredMuscleGain, totalWeightGain, currentWeight, bf);
</script>

<form >
  <label for="desired-muscle" class="flex justify-between items-center"
		>Muscle you want to build (lbs):
		<input
			type="number"
			id="desired-muscle"
			bind:value={desiredMuscleGain}
			class="input w-3/5 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
			required
		/>
	</label>
</form>