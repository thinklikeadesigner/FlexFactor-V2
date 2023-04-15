<script lang="ts">
	import { get } from 'svelte/store';
	import UserStore from '../../stores/UserStore';
	import {
		calculateBodyComposition,
		type BodyComposition
	} from '../../utils/BodyCompositionResults';

	let { currentWeight, bf, desiredMuscleGain, pRatio } = $UserStore;

	const { totalWeightGain, endingWeight, fatGained, endingBodyFatPercent } =
		calculateBodyComposition(pRatio, desiredMuscleGain, currentWeight, bf) as BodyComposition;


		console.log({ totalWeightGain, endingWeight, fatGained, endingBodyFatPercent })
</script>

<section class="w-3/5 m-auto">
	<h2 class="mb-4">Body Composition Results</h2>
	<p class="unstyled mb-4 font-medium text-lg">Gaining {desiredMuscleGain}lbs of muscle</p>
	<ul >
		<li class="bg-warning-500" ><p class="unstyled leading-10"><span class="font-semibold">Starting Weight: </span>{currentWeight}lbs</p></li>
		<li class="bg-secondary-500"><p class="unstyled leading-10"><span class="font-semibold">Ending Weight: </span>{endingWeight}lbs</p></li>
		<li class="bg-success-500"><p class="unstyled leading-10"><span class="font-semibold">Total Weight Gained: </span>{totalWeightGain}lbs</p></li>
		<li  class="bg-warning-500"><p class="unstyled leading-10"><span class="font-semibold">Starting Body Fat: </span>{bf}%</p></li>
		<li class="bg-secondary-500"><p class="unstyled leading-10"><span class="font-semibold">Ending Body Fat: </span>{endingBodyFatPercent}%</p></li>
		<li  class="bg-error-500"><p class="unstyled leading-10"><span class="font-semibold">Expected Fat Gained: </span>{fatGained}lbs</p></li>
	</ul>
	

</section>
