<script lang="ts">
	import BodyComposition from '$lib/components/BodyComposition.svelte';
	import { Stepper, Step } from '@skeletonlabs/skeleton';
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
