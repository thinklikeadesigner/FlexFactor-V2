<script lang="ts">
	import UserStore from '../../stores/UserStore';
	import {
		calculateBodyComposition,
		type BodyComposition
	} from '../../utils/BodyCompositionResults';
	import BodyStatsCard from './BodyStatsCard.svelte';

	console.table($UserStore);
	let { currentWeight, bf, desiredGains, pratio } = $UserStore;

	const { totalWeightGain, endingWeight, fatGained, endingBodyFatPercent } =
		calculateBodyComposition(pratio, desiredGains, currentWeight, bf) as BodyComposition;

	console.log({ totalWeightGain, endingWeight, fatGained, endingBodyFatPercent });
</script>

<section class="w-11/12 m-auto">
	<h2 class="mb-4">Body Composition Results</h2>
	<p class="unstyled mb-4 font-medium text-lg text-center">Gaining {desiredGains}lbs of muscle</p>

	<BodyStatsCard bodyFat={bf} bodyWeight={currentWeight} title="Starting Stats" colour="primary" />

	<BodyStatsCard
		bodyFat={endingBodyFatPercent}
		bodyWeight={endingWeight}
		title="Ending Stats"
		colour="secondary"
		{totalWeightGain}
		{fatGained}
	/>
	<p class="unstyled mb-4 font-medium text-lg text-center">Time to gains: </p>
	<ul>
		<!-- <li class="bg-warning-500" /> -->
		<!-- <li class="bg-secondary-500"><p class="unstyled leading-10"><span class="font-semibold">Ending Weight: </span>{endingWeight}lbs</p></li> -->
		<!-- <li class="bg-success-500">
			<p class="unstyled leading-10">
				<span class="font-semibold">Total Weight Gained: </span>{totalWeightGain}lbs
			</p>
		</li> -->
		<!-- <li  class="bg-warning-500"><p class="unstyled leading-10"><span class="font-semibold">Starting Body Fat: </span>{bf}%</p></li> -->
		<!-- <li class="bg-secondary-500"><p class="unstyled leading-10"><span class="font-semibold">Ending Body Fat: </span>{endingBodyFatPercent}%</p></li> -->
		<!-- <li class="bg-error-500">
			<p class="unstyled leading-10">
				<span class="font-semibold">Expected Fat Gained: </span>{fatGained}lbs
			</p> -->
		<!-- </li> -->
	</ul>
</section>
