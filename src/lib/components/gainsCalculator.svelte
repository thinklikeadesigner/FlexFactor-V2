<script>
	import { RangeSlider } from '@skeletonlabs/skeleton';
	import { calculateTimeToGains } from '../../utils/MuscleGainCalculator';

	let sex = 'male';
	let startingWeight = 150;
	let fitnessLevel = 'intermediate';
	let desiredGains = 5;

	let gainsMin = 1;
	let gainsMax = 25;

	// $: gains =[sex, startingWeight, fitnessLevel, desiredGains]
	$: timeToGains = calculateTimeToGains(sex, startingWeight, fitnessLevel, desiredGains);
	$:([minTime, maxtime] = timeToGains)
	
</script>

<form action="">
	<h4>Sex</h4>
	<div>
		<label for="male">Male: <input type="radio" name="sex" bind:group={sex} value="male" /></label>

		<label for="female"
			>Female: <input type="radio" name="sex" bind:group={sex} value="female" /></label
		>
	</div>

  <label for="weight">Current Weight: <input type="number" bind:value={startingWeight} name="weight" class="text-black">lbs</label>
	<h4>Fitness Level</h4>
	<div class="flex items-center">
		<label for="level">Beginner:</label>
		<input type="radio" name="level" bind:group={fitnessLevel} value="beginner" />

		<label for="level">Intermediate:</label>
		<input type="radio" name="level" bind:group={fitnessLevel} value="intermediate" />

		<label for="level">Advanced:</label>
		<input type="radio" name="level" bind:group={fitnessLevel} value="advanced" />
	</div>

	<RangeSlider name="range-slider" bind:value={desiredGains} min={gainsMin} max={gainsMax} step={1}>
		<div class="flex justify-between items-center">
			<h4>Desired Gains</h4>
			<div class="text-xs">{desiredGains} / {gainsMax}</div>
		</div>
	</RangeSlider>

	<div class="gains-output bg-white text-black p-5 my-5 rounded-3xl">
		<h4>You should achieve your gains in about {minTime} to {maxtime} weeks.</h4>
	</div>
</form>
