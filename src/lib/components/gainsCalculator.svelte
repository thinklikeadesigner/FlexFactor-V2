<script>
	import { RangeSlider } from '@skeletonlabs/skeleton';

	let sex = 'male';
	let startingWeight = 150;
	let fitnessLevel = 'intermediate';
	let desiredGains = 5;

	let gainsMin = 1;
	let gainsMax = 25;
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
			<div class="text-xs">{gainsMin} / {gainsMax}</div>
		</div>
	</RangeSlider>
</form>
