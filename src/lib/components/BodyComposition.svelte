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

	<div class="bg-white bg-opacity-10 m-2 rounded-2xl max-w-md p-4">
		<h3>Starting Stats</h3>
		<div class="flex justify-between items-center">
			<div class="flex flex-col items-center justify-between gap-2">
				<p>Body Fat</p>
				<ProgressRadial
					value={initialBodyFatPercent}
					width="w-24"
					font={108}
					stroke={96}
					meter="stroke-primary-500"
					track="stroke-primary-500/30">{initialBodyFatPercent}%</ProgressRadial
				>
			</div>
			<div class="text-right">
				<p class="unstyled leading-10">
					<span class="font-semibold">Weight: </span>{currentWeight}lbs
				</p>
				<p class="unstyled leading-10">
					<span class="font-semibold">Lean Mass: </span>{leanMass(
						currentWeight,
						initialBodyFatPercent
					)}lbs
				</p>
				<p class="unstyled leading-10">
					<span class="font-semibold">Fat Mass: </span>{fatMass(
						currentWeight,
						initialBodyFatPercent
					)}lbs
				</p>
			</div>
		</div>
	</div>
	<div class="bg-white bg-opacity-10 m-2 rounded-2xl max-w-md p-4">
		<h3>Ending Stats</h3>
		<div class="flex justify-between items-center">
			<div class="flex flex-col items-center justify-between gap-2">
				<p>Body Fat</p>
				<ProgressRadial
					value={endingBodyFatPercent}
					width="w-24"
					font={108}
					stroke={96}
					meter="stroke-secondary-500"
					track="stroke-secondary-500/30">{endingBodyFatPercent}%</ProgressRadial
				>
			</div>
			<div class="text-right">
				<p class="unstyled leading-10">
					<span class="font-semibold">Weight: </span>{endingWeight}lbs
				</p>
				<p class="unstyled leading-10">
					<span class="font-semibold">Lean Mass: </span>{leanMass(
						endingWeight,
						endingBodyFatPercent
					)}lbs
				</p>
				<p class="unstyled leading-10">
					<span class="font-semibold">Fat Mass: </span>{fatMass(
						endingWeight,
						endingBodyFatPercent
					)}lbs
				</p>
			</div>
		</div>
	</div>

	<p class="unstyled mb-4 font-medium text-lg text-center">Time to gains: {estimatedMessage}</p>
</section>
