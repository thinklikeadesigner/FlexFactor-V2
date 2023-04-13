<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';

	let name: string;
	let age: number;
	let sex: string = 'male';
	let currentWeight: number;

	const handleSubmit = () => {
		console.log({ name, age, sex, currentWeight });
	};

	const toggleSex = () => {
		if (sex === 'male') {
			sex = 'female';
		} else if (sex === 'female') {
			sex = 'male';
		}
	};
</script>

<svelte:head>
	<title>Flex Factor</title>
	<meta name="description" content="Science-based Gains Calculator" />
</svelte:head>

<h1 class="text-center">Flex Factor 💪🏼</h1>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-3 mt-12 max-w-xl m-auto">
	<label for="name" class="flex justify-between items-center gap-3"
		>Name <input type="text" id="name" bind:value={name} class="input w-3/5" /></label
	>

	<label for="age" class="flex justify-between items-center"
		>Age
		<input
			type="number"
			id="age"
			bind:value={age}
			class="input w-3/5 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
		/>
	</label>

	<label for="sex" class="flex justify-between items-center"
		>Sex<div class="w-3/5">
			<SlideToggle name="sex" on:change={toggleSex}>{sex.toUpperCase()}</SlideToggle>
		</div></label
	>

	<!-- <fieldset class="flex justify-between">
		<legend class="mb-3 float-left">Sex</legend>
		<div class="flex justify-between w-3/5">
			<label for="male">Male: <input type="radio" name="sex" bind:group={sex} value="male" /></label
			>

			<label for="female"
				>Female: <input type="radio" name="sex" bind:group={sex} value="female" /></label
			>
		</div>
	</fieldset> -->

	<label for="weight" class="flex justify-between items-center"
		>Current Weight (lbs)
		<input
			type="number"
			id="weight"
			bind:value={currentWeight}
			class="input w-3/5 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
		/>
	</label>

	<button type="submit" class="btn variant-filled px-8 w-1/2 mt-8 self-center">Start</button>
</form>

<style>
</style>
