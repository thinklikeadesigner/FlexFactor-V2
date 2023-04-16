<script lang="ts">
	import { RangeSlider } from '@skeletonlabs/skeleton';
	import { determinePRatio } from '../../utils/PRatioDeterminer';
	import UserStore from '../../stores/UserStore';
	import { calculateFatMass, calculateLeanMass } from '../../utils/MassCalculator';


	let calorieSurplusRange = [2.5, 5, 10, 15, 25];

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
		$UserStore.bf,
		$UserStore.fitnessLevel
	);

	$: $UserStore.initialLeanMass = calculateLeanMass($UserStore.currentWeight, $UserStore.bf);
	$: $UserStore.initialFatMass = calculateFatMass($UserStore.currentWeight, $UserStore.bf);

</script>

<form>
	<h2>Calculate p-ratio</h2>

	<RangeSlider
		name="range-slider"
		bind:value={$UserStore.bf}
		min={bodyFatMin}
		max={bodyFatMax}
		step={1}
	>
		<div class="flex justify-between items-center">
			<h4>BodyFat %</h4>
			<div class="text-xs">{$UserStore.bf} / {bodyFatMax}</div>
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

	<div class="bg-white text-black p-5 my-5 rounded-3xl">
		<h2>Your p-ratio:{$UserStore.pratio}</h2>
	</div>
</form>
