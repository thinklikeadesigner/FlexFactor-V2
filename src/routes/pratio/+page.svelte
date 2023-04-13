<script lang="ts">
	import { RangeSlider } from '@skeletonlabs/skeleton';
	import { determinePRatio } from '../../utils/PRatioDeterminer';
	import GainsCalculator from '$lib/components/gainsCalculator.svelte';
	import { calculateBodyComposition } from '../../utils/BodyCompositionResults';

	let sex = 'male';
	let fitnessLevel = 'beginner';
	let calorieSurplus = 10;

	let calorieSurplusRange = [2.5, 5, 10, 15, 25];

	let bodyFat = 10;
	let bodyFatMin = 4;
	let bodyFatMax = 20;

	$: if (sex === 'male') {
		bodyFat = 10;
		bodyFatMin = 4;
		bodyFatMax = 20;
	} else {
		bodyFat = 22;
		bodyFatMin = 12;
		bodyFatMax = 40;
	}

	let values: { sex: string; fitnessLevel: string; bodyFat: number; calorieSurplus: number };

	$: values = { sex, fitnessLevel, bodyFat, calorieSurplus };

	let pRatio = 1;
	$: pRatio = determinePRatio(sex, calorieSurplus, bodyFat, fitnessLevel);


</script>

<form action="">
	<h2>Calculate p-ratio</h2>
	<h4>Sex</h4>
	<div>
		<label for="male">Male: <input type="radio" name="sex" bind:group={sex} value="male" /></label>

		<label for="female"
			>Female: <input type="radio" name="sex" bind:group={sex} value="female" /></label
		>
	</div>

	<h4>Fitness Level</h4>
	<div class="flex items-center">
		<label for="Beginner">Beginner:</label>
		<input type="radio" name="level" bind:group={fitnessLevel} value="beginner" />

		<label for="Intermediate">Intermediate:</label>
		<input type="radio" name="level" bind:group={fitnessLevel} value="intermediate" />

		<label for="Advanced">Advanced:</label>
		<input type="radio" name="level" bind:group={fitnessLevel} value="advanced" />
	</div>

	<RangeSlider name="range-slider" bind:value={bodyFat} min={bodyFatMin} max={bodyFatMax} step={1}>
		<div class="flex justify-between items-center">
			<h4>BodyFat %</h4>
			<div class="text-xs">{bodyFat} / {bodyFatMax}</div>
		</div>
	</RangeSlider>

	<h4>Calorie Surplus</h4>
	<div class="flex items-center">
		{#each calorieSurplusRange as value}
			<label><input type="radio" {value} bind:group={calorieSurplus} name="" id="" />{value}%</label
			>
		{/each}
	</div>

	<div class="bg-white text-black p-5 my-5 rounded-3xl">
		<h2>Your p-ratio:{pRatio}</h2>
	</div>
</form>

<GainsCalculator />
