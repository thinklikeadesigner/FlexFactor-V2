<script>
	import { UserStore } from '../../../stores/UserStore';
	import { RangeSlider } from '@skeletonlabs/skeleton';
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

	$: estimatedMessage = `You should reach your goals in ${minTime} to ${maxtime} months`;
	$: if (!minTime || !maxtime) {
		estimatedMessage = 'Could not calculate estimate';
	}
</script>

<form>
	<!-- calculates p-ratio -->
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
<!-- calculates time to gains -->
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
	<RangeSlider
		name="range-slider"
		bind:value={$UserStore.desiredGains}
		min={gainsMin}
		max={gainsMax}
		step={1}
	>
		<div class="flex justify-between items-center">
			<h4>Desired Gains</h4>
			<div class="text-xs">{$UserStore.desiredGains} / {gainsMax}</div>
		</div>
	</RangeSlider>

	<div class="gains-output bg-white text-black p-5 my-5 rounded-3xl">
		<h4>{estimatedMessage}</h4>
	</div>
</form>
