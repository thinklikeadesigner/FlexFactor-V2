<script lang="ts">
	import BodyComposition from '$lib/components/BodyComposition.svelte';
	import FitnessLevel from '$lib/components/forms/TrainingLevel.svelte';
	import Forecast from '$lib/components/forms/Forecast.svelte';
	import Macros from '$lib/components/forms/Macros.svelte';
	import { Step, Stepper } from '@skeletonlabs/skeleton';
	import UserStore from '../stores/UserStore';

	let trainingLevelLocked = false;
	$: if (!$UserStore.age || !$UserStore.currentWeight || !$UserStore.oneRepMax) {
		trainingLevelLocked = true;
	} else trainingLevelLocked = false;

	function onCompleteHandler(e: Event): void {
		window.location.href = '/';
	}
</script>

<Stepper <Stepper on:complete={onCompleteHandler}>
	<Step locked={trainingLevelLocked} buttonNextType="submit">
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
	<Step>
		<svelte:fragment slot="header">Result</svelte:fragment>
		<BodyComposition />
	</Step>
</Stepper>
