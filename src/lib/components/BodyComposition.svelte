<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import UserStore from '../../stores/UserStore';
	import {
		calculateBodyComposition,
		type BodyComposition
	} from '../../utils/BodyCompositionResults';
	import StatsCard from './StatsCard.svelte';
	import { calculateTimeToGains } from '../../utils/MuscleGainTimeCalculator';
	import { each, init } from 'svelte/internal';
	import { calculateMacronutrients } from '../../utils/NutritionCalculations';

	let { currentWeight, initialBodyFatPercent, desiredGains, pratio } = $UserStore;

	function leanMass(weight: number, bf: number) {
		let result = weight * ((100 - bf) * 0.01);
		return result.toFixed(2);
	}

	function fatMass(weight: number, bf: number) {
		let result = weight * (bf * 0.01);
		return result.toFixed(2);
	}
	$: macros = calculateMacronutrients(
		$UserStore.currentWeight,
		$UserStore.heightInInches,
		$UserStore.age,
		$UserStore.sex,
		$UserStore.initialBodyFatPercent,
		$UserStore.activityLevel
	);
	const { endingWeight, endingBodyFatPercent } = calculateBodyComposition(
		pratio,
		desiredGains,
		currentWeight,
		initialBodyFatPercent
	) as BodyComposition;
	const startCard = [
		{ title: 'Weight', label: 'lbs', content: currentWeight },
		{ title: 'Lean Mass', label: 'lbs', content: leanMass(currentWeight, initialBodyFatPercent) },
		{ title: 'Fat Mass', label: 'lbs', content: fatMass(currentWeight, initialBodyFatPercent) }
	];

	const endCard = [
		{ title: 'Weight', label: 'lbs', content: endingWeight },
		{ title: 'Lean Mass', label: 'lbs', content: leanMass(endingWeight, endingBodyFatPercent) },
		{ title: 'Fat Mass', label: 'lbs', content: fatMass(endingWeight, endingBodyFatPercent) }
	];

	$: macroCard = [
		{ title: 'carbs', label: 'g', content: macros.carb },
		{ title: 'protein', label: 'g', content: macros.protein },
		{ title: 'fat', label: 'g', content: macros.fat }
	];

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
	<StatsCard title="Starting Stats">
		<ProgressRadial
			slot="one"
			value={initialBodyFatPercent}
			width="w-24"
			font={108}
			stroke={96}
			meter="stroke-primary-500"
			track="stroke-primary-500/30">{initialBodyFatPercent}%</ProgressRadial
		>
		<div slot="two">
			<p>Body Fat</p>
			{#each startCard as item}
				<p class="unstyled leading-10">
					<span class="font-semibold">{item.title}: </span>{item.content + ' ' + item.label}
				</p>
			{/each}
		</div>
	</StatsCard>
	<StatsCard title="Starting Stats">
		<ProgressRadial
			slot="one"
			value={endingBodyFatPercent}
			width="w-24"
			font={108}
			stroke={96}
			meter="stroke-secondary-500"
			track="stroke-secondary-500/30">{endingBodyFatPercent}%</ProgressRadial
		>
		<div slot="two">
			<p>Body Fat</p>
			{#each endCard as item}
				<p class="unstyled leading-10">
					<span class="font-semibold">{item.title}: </span>{item.content + ' ' + item.label}
				</p>
			{/each}
		</div>
	</StatsCard>
	<StatsCard title=" Macros">
		<div slot="two">
			<p>Macros</p>
			{#each macroCard as item}
				<p class="unstyled leading-10">
					<span class="font-semibold">{item.title}: </span>{item.content + ' ' + item.label}
				</p>
			{/each}
		</div>
	</StatsCard>
	<p class="unstyled mb-4 font-medium text-lg text-center">Time to gains: {estimatedMessage}</p>
</section>
