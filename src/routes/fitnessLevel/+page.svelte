<script lang="ts">
	// import { enhance, type SubmitFunction } from '$app/forms';
	import BodyComposition from '$lib/components/BodyComposition.svelte';
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import GainsCalculator from '$lib/components/gainsCalculator.svelte';

	// export let data: PageData;
	// export let form: ActionData;

	// let loading = false;

	// let error = false;

	// const addFitnessLevel: SubmitFunction = (input) => {
	// 	loading = true;
	// 	console.log(input);
	// 	return async ({ update }) => {
	// 		loading = false;
	// 		console.log(loading);
	// 		await update();
	// 	};
	// };
</script>

<Stepper>
	<Step>
		<svelte:fragment slot="header">Result</svelte:fragment>
		<BodyComposition />
	</Step>
	<Step>
		<svelte:fragment slot="header">Result</svelte:fragment>
		<BodyComposition />
	</Step>
</Stepper>

<!-- <pre>{JSON.stringify(data, null, 2)}</pre>
<div class="py-10">
	<div class="card p-4">
		<ul class="list">
			{#each data.fitnessLevels as fitnessLevel}
				<li class="">
					<span class="flex-auto capitalize">
						{fitnessLevel.text}
					</span>
					<form action="?/removeFitnessLevel" method="POST" use:enhance>
						<input class="input" type="hidden" name="id" value={fitnessLevel.id} />
						<button
							type="submit"
							class="btn variant-ghost-error text-error-400 m-0 bg-none border-none">DELETE</button
						>
					</form>
				</li>
			{/each}
		</ul>

		<form action="?/addFitnessLevel" method="POST" use:enhance={addFitnessLevel}>
			{#if form?.missing}
				<div class="flex flex-col justify-between">
					<label class="label" for="sex"
						><span>sex</span>
						<input class="input input-error w-1/2" type="text" name="sex" /></label
					>
					<label class="label" for="exercise">
						<span>exercise</span>
						<input class="input input-error w-1/2" type="text" name="exercise" />
					</label>
					<label class="label" for="weight"
						><span>weight</span><input
							class="input input-error w-1/2"
							type="text"
							name="weight"
						/></label
					>
					<label class="label" for="onerepmax"
						><span>onerepmax</span>
						<input class="input input-error w-1/2" type="text" name="oneRepMax" />
					</label>
					<button class="btn" type="submit"> + Add fitnessLevel </button>
					<button type="submit" formaction="?/clearFitnessLevels" class="btn"> clear</button>
				</div>
				<p class="text-error-400">This field is required</p>
			{:else}
				<div class="flex flex-col justify-between">
					<label class="label" for="sex"
						><span>sex</span>
						<input class="input w-1/2" type="text" name="sex" /></label
					>
					<label class="label" for="exercise">
						<span>exercise</span>
						<input class="input w-1/2" type="text" name="exercise" />
					</label>
					<label class="label" for="weight"
						><span>weight</span><input class="input w-1/2" type="text" name="weight" /></label
					>
					<label class="label" for="onerepmax"
						><span>onerepmax</span>
						<input class="input w-1/2" type="text" name="oneRepMax" />
					</label>
					<button class="btn" type="submit"> + Add fitnessLevel </button>
					<button type="submit" formaction="?/clearFitnessLevels" class="btn"> clear</button>
				</div>
			{/if}
		</form>

		{#if form?.success}
			<p>Added fitnessLevel!</p>
		{/if}
	</div>
</div> -->
