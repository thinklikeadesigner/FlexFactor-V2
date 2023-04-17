<script>
	import { UserStore } from '../../../stores/UserStore';
	import { RadioGroup, RadioItem, RangeSlider } from '@skeletonlabs/skeleton';
	import { calculateTimeToGains } from '../../../utils/MuscleGainTimeCalculator';
	import { getFitnessLevel } from '../../../utils/FitnessLevel';
	import { determinePRatio } from '../../../utils/PRatioDeterminer';
	import { calculateFatMass, calculateLeanMass } from '../../../utils/MassCalculator';

	let calorieSurplusRange = [2.5, 5, 10, 15, 25];
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
	$: timeToGains = calculateTimeToGains(
		$UserStore.sex,
		$UserStore.currentWeight,
		fitnessLevel,
		$UserStore.desiredGains
	);
	$: [minTime, maxtime] = timeToGains;

	$: estimatedMessage = `You should reach your goals in about ${minTime} to ${maxtime} months`;
	$: if (!minTime || !maxtime) {
		estimatedMessage = 'Could not calculate estimate';
	}
</script>

<form class="flex flex-col justify-between gap-5 px-2 mt-6 mb-8 max-w-xl">
	<!-- calculates p-ratio -->
	<RangeSlider
		name="range-slider"
		bind:value={$UserStore.initialBodyFatPercent}
		min={bodyFatMin}
		max={bodyFatMax}
		step={1}
	>
		<div class="flex justify-between items-center ">
			<p class="unstyled text-xl font-semibold">Current BodyFat %:</p>
			<p class="unstyled text-base">{$UserStore.initialBodyFatPercent} / {bodyFatMax}</p>
		</div>
	</RangeSlider>

	<p class="unstyled text-lg">Increasing calorie intake by:</p>
	<RadioGroup class="flex items-center">
		{#each calorieSurplusRange as value}
			<RadioItem type="radio" {value} bind:group={$UserStore.calorieSurplus} name="" id=""
				>{value}%</RadioItem
			>
		{/each}
	</RadioGroup>
	<!-- calculates time to gains -->

	<RangeSlider
		name="range-slider"
		bind:value={$UserStore.desiredGains}
		min={gainsMin}
		max={gainsMax}
		step={1}
	>
		<div class="flex justify-between items-center">
			<p class="unstyled text-lg">Muscle mass you want to gain:</p>
			<p class="unstyled text-lg">{$UserStore.desiredGains}lbs</p>
		</div>
	</RangeSlider>

	<div class="bg-white bg-opacity-10 m-4 rounded-2xl max-w-md p-4">
		<p class="unstyled text-xl font-semibold text-center">{estimatedMessage}</p>
	</div>
</form>
