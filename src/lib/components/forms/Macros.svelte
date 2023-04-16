<script>
	import { UserStore } from '../../../stores/UserStore';
	import { RangeSlider } from '@skeletonlabs/skeleton';
	import { calculateTimeToGains } from '../../../utils/MuscleGainTimeCalculator';
	import { getFitnessLevel } from '../../../utils/FitnessLevel';
	import { determinePRatio } from '../../../utils/PRatioDeterminer';
	import { calculateFatMass, calculateLeanMass } from '../../../utils/MassCalculator';
	import { calculateMacronutrients } from '../../../utils/NutritionCalculations';
	let calorieSurplusRange = [2.5, 5, 10, 15, 25];
	const activityLevels = [
		'sedentary',
		'lightlyActive',
		'moderatelyActive',
		'veryActive',
		'extraActive'
	];
	let bodyFat = 10;
	let bodyFatMin = 4;
	let bodyFatMax = 20;
	let gainsMin = 1;
	let gainsMax = 25;

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

	$: dailySurplus = macros.calories * 0.01 * $UserStore.calorieSurplus;

	$: estimatedMessage = `carbs: ${macros.carb}, protein: ${macros.protein}, fat: ${
		macros.fat
	}, calories: ${
		macros.calories
	}, daily surplus: ${dailySurplus}, calories including surplus: calories: ${
		macros.calories + dailySurplus
	}`;
	$: if (!macros.protein || !macros.carb || !macros.fat || !macros.calories) {
		estimatedMessage = 'Could not calculate estimate';
	}
</script>

<form action="">
	<RangeSlider
		name="range-slider"
		bind:value={$UserStore.currentWeight}
		min={80}
		max={300}
		step={1}
	>
		<div class="flex justify-between items-center">
			<h4>
				Current Weight <span
					><input
						type="number"
						bind:value={$UserStore.currentWeight}
						min={80}
						name="weight"
						class="text-black"
					/></span
				> lbs
			</h4>
			<div class="text-xs">{$UserStore.currentWeight} / {300}</div>
		</div>
	</RangeSlider>
</form>
<form>
	<RangeSlider
		name="range-slider"
		bind:value={$UserStore.initialBodyFatPercent}
		min={bodyFatMin}
		max={bodyFatMax}
		step={1}
	>
		<div class="flex justify-between items-center">
			<h4>BodyFat %</h4>
			<div class="text-xs">{$UserStore.initialBodyFatPercent} / {bodyFatMax}</div>
		</div>
	</RangeSlider>
	<form>
		<h4>Calorie Surplus</h4>
		<div class="flex items-center">
			{#each calorieSurplusRange as value}
				<label
					><input
						type="radio"
						{value}
						bind:group={$UserStore.calorieSurplus}
						name=""
						id=""
					/>{value}%</label
				>
			{/each}
		</div>
	</form>
	<h4>Activity Level:</h4>
	<div class="flex flex-col justify-start text-lg">
		{#each activityLevels as value}
			<label
				><input
					type="radio"
					{value}
					bind:group={$UserStore.activityLevel}
					name=""
					id=""
				/>{value}</label
			>
		{/each}
	</div>
	<p>{estimatedMessage}</p>
</form>
