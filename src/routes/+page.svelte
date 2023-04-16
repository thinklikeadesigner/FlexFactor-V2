<script lang="ts">
	import BodyComposition from '$lib/components/BodyComposition.svelte';
	import FitnessLevel from '$lib/components/FitnessLevel.svelte';
	import Forecast from '$lib/components/Forecast.svelte';
	import { Step, Stepper } from '@skeletonlabs/skeleton';
</script>

<Stepper>
	<Step>
		<svelte:fragment slot="header">Result</svelte:fragment>
		<FitnessLevel />
	</Step>
	<Step>
		<svelte:fragment slot="header">Result</svelte:fragment>
		<Forecast />
	</Step>
	<Step>
		<svelte:fragment slot="header">Result</svelte:fragment>
		<BodyComposition />
	</Step>
</Stepper>
