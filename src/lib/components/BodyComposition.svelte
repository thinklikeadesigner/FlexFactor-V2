<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import UserStore from '../../stores/UserStore';
	import {
		calculateBodyComposition,
		type BodyComposition
	} from '../../utils/BodyCompositionResults';
	import BodyStatsCard from './BodyStatsCard.svelte';
	import { calculateTimeToGains } from '../../utils/MuscleGainTimeCalculator';

	let { currentWeight, initialBodyFatPercent, desiredGains, pratio } = $UserStore;

	function leanMass(weight: number, bf: number) {
		let result = weight * ((100 - bf) * 0.01);
		return result.toFixed(2);
	}

	function fatMass(weight: number, bf: number) {
		let result = weight * (bf * 0.01);
		return result.toFixed(2);
	}

	const { endingWeight, endingBodyFatPercent } = calculateBodyComposition(
		pratio,
		desiredGains,
		currentWeight,
		initialBodyFatPercent
	) as BodyComposition;

	$: timeToGains = calculateTimeToGains(
		$UserStore.sex,
		$UserStore.currentWeight,
		$UserStore.fitnessLevel,
		$UserStore.desiredGains
	);
	$: [minTime, maxtime] = timeToGains;

	$: estimatedMessage = `You should reach your goals in ${minTime} to ${maxtime} months`;
	$: if (!minTime || !maxtime) {
		estimatedMessage = 'Could not calculate estimate';
	}
</script>

<section class="w-11/12 m-auto">
	<h2 class="mb-4">Body Composition Results</h2>
	<p class="unstyled mb-4 font-medium text-lg text-center">Gaining {desiredGains}lbs of muscle</p>

	<BodyStatsCard
		bodyFat={endingBodyFatPercent}
		bodyWeight={endingWeight}
		fatLbs={fatMass(endingWeight, endingBodyFatPercent)}
		leanLbs={leanMass(endingWeight, endingBodyFatPercent)}
		title="Ending Stats"
		colour="secondary"
	/>
	<BodyStatsCard
		bodyFat={endingBodyFatPercent}
		bodyWeight={endingWeight}
		fatLbs={fatMass(currentWeight, initialBodyFatPercent)}
		leanLbs={leanMass(currentWeight, initialBodyFatPercent)}
		title="Starting Stats"
		colour="primary"
	/>

	<p class="unstyled mb-4 font-medium text-lg text-center">Time to gains:</p>
</section>
