<script lang="ts">
	import UserStore from '../../stores/UserStore';
	import {
		calculateBodyComposition,
		type BodyComposition
	} from '../../utils/BodyCompositionResults';
	import BodyStatsCard from './BodyStatsCard.svelte';

	let { currentWeight, initialBodyFatPercent, desiredGains, pratio } = $UserStore;

	const { endingWeight, endingBodyFatPercent } = calculateBodyComposition(
		pratio,
		desiredGains,
		currentWeight,
		initialBodyFatPercent
	) as BodyComposition;
</script>

<section class="w-11/12 m-auto">
	<h2 class="mb-4">Body Composition Results</h2>
	<p class="unstyled mb-4 font-medium text-lg text-center">Gaining {desiredGains}lbs of muscle</p>

	<BodyStatsCard
		bodyFat={initialBodyFatPercent}
		bodyWeight={currentWeight}
		title="Starting Stats"
		colour="primary"
	/>

	<BodyStatsCard
		bodyFat={endingBodyFatPercent}
		bodyWeight={endingWeight}
		title="Ending Stats"
		colour="secondary"
	/>
	<p class="unstyled mb-4 font-medium text-lg text-center">Time to gains:</p>
</section>
