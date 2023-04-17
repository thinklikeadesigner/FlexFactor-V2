<script lang="ts">
	import BodyComposition from '$lib/components/BodyComposition.svelte';
	import FitnessLevel from '$lib/components/forms/TrainingLevel.svelte';
	import Forecast from '$lib/components/forms/Forecast.svelte';
	import Macros from '$lib/components/forms/Macros.svelte';
	import { Step, Stepper } from '@skeletonlabs/skeleton';
	import UserStore from '../stores/UserStore';

	let trainingLevelLocked = false;

	$: validUserAge = $UserStore.age && $UserStore.age >= 16 && $UserStore.age <= 65;
	$: validUserWeight =
		$UserStore.currentWeight && $UserStore.currentWeight >= 80 && $UserStore.currentWeight <= 350;
	$: validUser1MR = $UserStore.oneRepMax && $UserStore.oneRepMax > 0;

	$: if (!validUserAge || !validUserWeight || !validUser1MR) {
		trainingLevelLocked = true;
	} else trainingLevelLocked = false;

	function onCompleteHandler(e: Event): void {
		window.location.href = '/';
		
	}
</script>

<Stepper on:complete={onCompleteHandler}>
	<Step locked={trainingLevelLocked}>
		<svelte:fragment slot="header">Training Level</svelte:fragment>
		<FitnessLevel />
	</Step>
	<Step>
		<svelte:fragment slot="header">Time Estimate</svelte:fragment>
		<Forecast />
	</Step>
	<Step>
		<svelte:fragment slot="header">Recommended Macro Intake</svelte:fragment>
		<Macros />
	</Step>
	<Step buttonCompleteLabel="Start Over">
		<svelte:fragment slot="header">Body Composition Result</svelte:fragment>
		<BodyComposition />
	</Step>
</Stepper>
