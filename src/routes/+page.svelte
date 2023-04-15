<script lang="ts">
	import { SlideToggle, RadioGroup, RadioItem, RangeSlider } from '@skeletonlabs/skeleton';
	import { getFitnessLevel } from '../utils/FitnessLevel';
	import UserStore from '../stores/UserStore';

	let sex: string = $UserStore.sex;

	const handleSubmit = () => {
		$UserStore.fitnessLevel = fitnessLevel;
	};

	const toggleSex = () => {
		if (sex === 'male') {
			sex = 'female';
			$UserStore.sex = sex;
		} else if (sex === 'female') {
			sex = 'male';
			$UserStore.sex = sex;
		}
	};
	$: fitnessLevel = getFitnessLevel(
		$UserStore.sex,
		$UserStore.exerciseName,
		$UserStore.currentWeight,
		$UserStore.oneRepMax
	);
	$: heightInFeetInches = convertInchestoFeet($UserStore.heightInInches);

	const convertInchestoFeet = (heightInInches: number) => {
		if (heightInInches < 48) return;
		if (heightInInches % 12 === 0) return `${heightInInches / 12} ft`;
		else return `${Math.trunc(heightInInches / 12)}ft, ${heightInInches % 12}in`;
	};

	$: sexLabel = `${sex.charAt(0).toUpperCase()}${sex.slice(1)}`;
</script>

<svelte:head>
	<title>Flex Factor</title>
	<meta name="description" content="Science-based Gains Calculator" />
</svelte:head>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-3 mt-12 max-w-xl m-auto">
	<label for="age" class="flex justify-between items-center"
		>Age
		<input
			type="number"
			id="age"
			bind:value={$UserStore.age}
			class="input w-3/5 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
			required
		/>
	</label>

	<label for="sex" class="flex justify-between items-center"
		>Sex
		<div class="w-3/5">
			<SlideToggle name="sex" on:change={toggleSex}>{sexLabel}</SlideToggle>
		</div></label
	>

	<label for="weight" class="flex justify-between items-center"
		>Current Weight (lbs)
		<input
			type="number"
			id="weight"
			bind:value={$UserStore.currentWeight}
			class="input w-3/5 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
			required
		/>
	</label>

	<label for="height" class="flex justify-between items-center"
		>Height
		<div class="w-3/5 self-left">
			<RangeSlider
				name="height"
				bind:value={$UserStore.heightInInches}
				min={48}
				max={96}
				step={1}
				class="w-auto"
			>
				<div class="text-sm">{heightInFeetInches}</div>
			</RangeSlider>
		</div>
	</label>

	<h4>Let's determine your fitness level</h4>
	<RadioGroup>
		<RadioItem bind:group={$UserStore.exerciseName} name="justify" value={'benchPress'}
			>Bench Press</RadioItem
		>
		<RadioItem bind:group={$UserStore.exerciseName} name="justify" value={'barbellSquat'}
			>Barbell Squat</RadioItem
		>
		<RadioItem bind:group={$UserStore.exerciseName} name="justify" value={'pullups'}
			>Pull-ups</RadioItem
		>
		<RadioItem bind:group={$UserStore.exerciseName} name="justify" value={'hipThrust'}
			>Hip Thrust</RadioItem
		>
	</RadioGroup>

	<label for="age" class="flex justify-between items-center">
		{#if $UserStore.exerciseName === 'pullups'}
			Max number of reps:
		{:else}
			Max weight for 1 repetition (lbs):
		{/if}
		<input
			type="number"
			id="age"
			bind:value={$UserStore.oneRepMax}
			class="input w-1/4 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
			required
		/>
	</label>

	<button type="submit" class="btn variant-filled px-8 w-auto mt-8 self-center"
		>Check My Fitness Level</button
	>
</form>

<h4 class="text-center">
	{#if fitnessLevel === 'invalid weight'}
		Your fitness level cannot be determined
	{:else if fitnessLevel !== ''}
		Your fitness level is {fitnessLevel.toUpperCase()}
	{/if}
</h4>

<style>
</style>
