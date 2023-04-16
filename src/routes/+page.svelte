<script lang="ts">
	import BodyComposition from '$lib/components/BodyComposition.svelte';
	import FitnessLevel from '$lib/components/forms/FitnessLevel.svelte';
	import Forecast from '$lib/components/forms/Forecast.svelte';
	import Macros from '$lib/components/forms/Macros.svelte';
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
		<Macros />
	</Step>
	<Step>
		<svelte:fragment slot="header">Result</svelte:fragment>
		<BodyComposition />
	</Step>
</Stepper>
