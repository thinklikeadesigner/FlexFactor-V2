<script>
	import { UserStore } from './../../stores/UserStore';
	import { RangeSlider } from '@skeletonlabs/skeleton';
	import { calculateTimeToGains } from '../../utils/MuscleGainCalculator';

	let desiredGains = 2;

	let gainsMin = 1;
	let gainsMax = 25;

	$: timeToGains = calculateTimeToGains(
		$UserStore.sex,
		$UserStore.currentWeight,
		$UserStore.fitnessLevel,
		desiredGains
	);
	$: [minTime, maxtime] = timeToGains;

	$: estimatedMessage = `You should reach your goals in ${minTime} to ${maxtime} months`;
	$: if (!minTime || !maxtime) {
		estimatedMessage = 'Could not calculate estimate';
	}
</script>

<form action="">
	<h4>Sex</h4>

	<div>
		<label for="male"
			>Male: <input type="radio" name="sex" bind:group={$UserStore.sex} value="male" /></label
		>

		<label for="female"
			>Female: <input type="radio" name="sex" bind:group={$UserStore.sex} value="female" /></label
		>
	</div>

	<h4>Fitness Level</h4>
	<div class="flex items-center">
		<label for="level">Beginner:</label>
		<input type="radio" name="level" bind:group={$UserStore.fitnessLevel} value="beginner" />

		<label for="level">Intermediate:</label>
		<input type="radio" name="level" bind:group={$UserStore.fitnessLevel} value="intermediate" />

		<label for="level">Advanced:</label>
		<input type="radio" name="level" bind:group={$UserStore.fitnessLevel} value="advanced" />
	</div>
	<label for="weight"
		>Current Weight: <input
			type="number"
			bind:value={$UserStore.currentWeight}
			min={80}
			name="weight"
			class="text-black"
		/>lbs</label
	>

	<RangeSlider
		name="range-slider"
		bind:value={$UserStore.currentWeight}
		min={80}
		max={300}
		step={1}
	>
		<div class="flex justify-between items-center">
			<h4>Current Weight</h4>
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
<pre>{JSON.stringify($UserStore)}</pre>
