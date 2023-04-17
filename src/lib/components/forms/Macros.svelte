<script lang="ts">
	import { UserStore } from '../../../stores/UserStore';
	import { getFitnessLevel } from '../../../utils/FitnessLevel';
	import { determinePRatio } from '../../../utils/PRatioDeterminer';
	import { calculateFatMass, calculateLeanMass } from '../../../utils/MassCalculator';
	import { calculateMacronutrients } from '../../../utils/NutritionCalculations';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	let bodyFat = 10;
	let bodyFatMin = 4;
	let bodyFatMax = 20;

	const activityLevels = {
		sedentary: 'Sedentary',
		lightlyActive: 'Light',
		moderatelyActive: 'Moderate',
		veryActive: 'High',
		extraActive: 'Extreme'
	};
	const calorieSurplusRange = [2.5, 5, 10, 15, 25];

	$: if ($UserStore.sex === 'male') {
		bodyFat = 10;
		bodyFatMin = 4;
		bodyFatMax = 20;
	} else {
		bodyFat = 22;
		bodyFatMin = 12;
		bodyFatMax = 40;
	}

	$: $UserStore.pratio = determinePRatio(
		$UserStore.sex,
		$UserStore.calorieSurplus,
		$UserStore.initialBodyFatPercent,
		$UserStore.fitnessLevel
	);

	$: $UserStore.initialLeanMass = calculateLeanMass(
		$UserStore.currentWeight,
		$UserStore.initialBodyFatPercent
	);
	$: $UserStore.initialFatMass = calculateFatMass(
		$UserStore.currentWeight,
		$UserStore.initialBodyFatPercent
	);

	$: fitnessLevel = getFitnessLevel(
		$UserStore.sex,
		$UserStore.exerciseName,
		$UserStore.currentWeight,
		$UserStore.oneRepMax
	);
	$: macros = calculateMacronutrients(
		$UserStore.currentWeight,
		$UserStore.heightInInches,
		$UserStore.age,
		$UserStore.sex,
		$UserStore.initialBodyFatPercent,
		$UserStore.activityLevel
	);

	$: dailySurplus = Math.round(macros.calories * 0.01 * $UserStore.calorieSurplus);

	$: estimatedMacros = {
		Carbs: `${macros.carbs}g`,
		Protein: `${macros.protein}g`,
		Fat: `${macros.fat}g`,
		Calories: macros.calories,
		'Daily Surplus': dailySurplus,
		'New Total Calories': macros.calories + dailySurplus
	};

	let errorMessage: string;

	$: if (!macros.protein || !macros.carbs || !macros.fat || !macros.calories) {
		errorMessage = 'Could not calculate estimate';
	}
</script>

<section class="px-4 pb-8">
	<form class="flex flex-col justify-between gap-5 px-2 mt-6 mb-8 max-w-xl m-auto">
		<p class="unstyled text-lg">Increasing calorie intake by:</p>
		<RadioGroup class="flex items-center">
			{#each calorieSurplusRange as value}
				<RadioItem type="radio" {value} bind:group={$UserStore.calorieSurplus} name="" id=""
					>{value}%</RadioItem
				>
			{/each}
		</RadioGroup>
		<p class="font-semibold">Select your activity level:</p>
		<RadioGroup display="flex-col" class="w-1/2 m-auto">
			{#each Object.entries(activityLevels) as [value, name]}
				<RadioItem {value} bind:group={$UserStore.activityLevel} {name}>{name}</RadioItem>
			{/each}
		</RadioGroup>
	</form>
	{#if errorMessage}
		<p class="unstyled text-xl">{errorMessage}</p>
	{:else}
		<p class="unstyled max-w-md text-center py-4 font-semibold text-lg">
			For this bulk, you should consume:
		</p>
		<div class="bg-white bg-opacity-10 m-auto rounded-2xl max-w-md  p-4">
			{#each Object.entries(estimatedMacros) as [name, amount]}
				<p class="unstyled text-xl mb-2"><span class="font-bold pr-3">{name}:</span>{amount}</p>
			{/each}
		</div>
	{/if}
</section>
