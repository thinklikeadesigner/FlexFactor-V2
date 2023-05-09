<script lang="ts">
	import { SlideToggle, RadioGroup, RadioItem, RangeSlider } from '@skeletonlabs/skeleton';
	import { getFitnessLevel } from '../../../utils/FitnessLevel';
	import UserStore from '../../../stores/UserStore';
	import { convertInchestoCm, convertKgtoLbs } from '../../../utils/unitConverters';

	let sex: string = $UserStore.sex;

	const toggleSex = () => {
		if (sex === 'male') {
			sex = 'female';
		} else if (sex === 'female') {
			sex = 'male';
		}
		$UserStore.sex = sex;
	};

	let weight: number | null;
	let age: number | null;
	let oneRepMax: number | null;

	$: $UserStore.currentWeight =
		$UserStore.unitSystem === 'imperial' ? (weight as number) : convertKgtoLbs(weight as number);

	$: $UserStore.age = age as number;
	

	$: $UserStore.oneRepMax = $UserStore.unitSystem === 'imperial' && $UserStore.exerciseName !== 'pullups'? oneRepMax as number : convertKgtoLbs(oneRepMax as number);

	$: console.table($UserStore);

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
</script>

<svelte:head>
	<title>Flex Factor</title>
	<meta name="description" content="Science-based Gains Calculator" />
</svelte:head>

<form action="submit" class="flex flex-col gap-3 mt-6 mb-28 max-w-xl m-auto px-2">
	<label for="age" class="flex justify-between items-center font-semibold"
		>Age
		<input
			type="number"
			id="age"
			min={16}
			max={65}
			bind:value={$UserStore.age}
			class="input w-2/5 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none {$UserStore.age <
				16 ||
			($UserStore.age > 65 && $UserStore.age)
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
		>Current Weight ({$UserStore.unitSystem === 'imperial' ? 'lbs' : 'kg'})
		<input
			type="number"
			id="weight"
			bind:value={weight}
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
				<p class="unstyled font-light text-center">
					{$UserStore.unitSystem === 'imperial'
						? heightInFeetInches
						: `${convertInchestoCm($UserStore.heightInInches)}cm`}
				</p>
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
			Max weight for 1 repetition ({$UserStore.unitSystem === 'imperial' ? 'lbs' : 'kg'}):
		{/if}
		<input
			type="number"
			id="age"
			bind:value={oneRepMax}
			class="input w-1/4 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none {$UserStore.oneRepMax <
			1
				? 'input-error'
				: ''}"
			required
		/>
	</label>
</form>
