<script lang="ts">
	import { UserStore } from '../../../stores/UserStore';
	import { getFitnessLevel } from '../../../utils/FitnessLevel';
	import { determinePRatio } from '../../../utils/PRatioDeterminer';
	import { calculateFatMass, calculateLeanMass } from '../../../utils/MassCalculator';
	import { calculateMacronutrients } from '../../../utils/NutritionCalculations';

	let bodyFat = 10;
	let bodyFatMin = 4;
	let bodyFatMax = 20;

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
		Carbs: `${macros.carb}g`,
		Protein: `${macros.protein}g`,
		Fat: `${macros.fat}g`,
		Calories: macros.calories,
		'Daily Surplus': dailySurplus,
		'New Total Calories': macros.calories + dailySurplus
	};

	let errorMessage: string;

	$: if (!macros.protein || !macros.carb || !macros.fat || !macros.calories) {
		errorMessage = 'Could not calculate estimate';
	}
</script>

<section class="px-4 pt-8 pb-28">
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
