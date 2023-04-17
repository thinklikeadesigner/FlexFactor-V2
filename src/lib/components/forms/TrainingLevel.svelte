<script lang="ts">
	import { SlideToggle, RadioGroup, RadioItem, RangeSlider } from '@skeletonlabs/skeleton';
	import { getFitnessLevel } from '../../../utils/FitnessLevel';
	import UserStore from '../../../stores/UserStore';
	import { to_number } from 'svelte/internal';

	let sex: string = $UserStore.sex;

	const toggleSex = () => {
		if (sex === 'male') {
			sex = 'female';
			$UserStore.sex = sex;
		} else if (sex === 'female') {
			sex = 'male';
			$UserStore.sex = sex;
		}
	};
	$: $UserStore.fitnessLevel = getFitnessLevel(
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

	const activityLevels = {
		sedentary: 'Sedentary',
		lightlyActive: 'Light',
		moderatelyActive: 'Moderate',
		veryActive: 'High',
		extraActive: 'Extreme'
	};

</script>

<svelte:head>
	<title>Flex Factor</title>
	<meta name="description" content="Science-based Gains Calculator" />
</svelte:head>

<form action="submit" class="flex flex-col gap-3 mt-6 mb-10 max-w-xl m-auto px-2">
	<label for="age" class="flex justify-between items-center font-semibold"
		>Age
		<input
			type="number"
			id="age"
			min={16}
			max={65}
			bind:value={$UserStore.age}
			class="input w-2/5 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none {$UserStore.age <
				16 || $UserStore.age > 65
				? 'input-error'
				: ''}"
			required
		/>
	</label>

	<label for="sex" class="flex justify-between items-center font-semibold"
		>Sex
		<div class="w-2/5">
			<SlideToggle name="sex" on:change={toggleSex}>{sexLabel}</SlideToggle>
		</div></label
	>

	<label for="weight" class="flex justify-between items-center font-semibold"
		>Current Weight (lbs)
		<input
			type="number"
			id="weight"
			bind:value={$UserStore.currentWeight}
			class="input w-2/5 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none {$UserStore.currentWeight <
				80 || $UserStore.currentWeight > 350
				? 'input-error'
				: ''}"
			required
		/>
	</label>

	<label for="height" class="flex justify-between items-center font-semibold"
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
				<p class="unstyled font-light text-center">{heightInFeetInches}</p>
			</RangeSlider>
		</div>
	</label>

	<p class="font-semibold">Select exercise for One Rep Max (1RM):</p>
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
			class="input w-1/4 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none {$UserStore.oneRepMax <
			1
				? 'input-error'
				: ''}"
			required
		/>
	</label>

	<p class="font-semibold">Select your activity level:</p>
	<RadioGroup display="flex-col" class="w-1/2 m-auto">
		{#each Object.entries(activityLevels) as [value, name]}
			<RadioItem {value} bind:group={$UserStore.activityLevel} {name}>{name}</RadioItem>
		{/each}
	</RadioGroup>
</form>
