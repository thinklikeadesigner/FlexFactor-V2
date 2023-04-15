<script lang="ts">
	import { get } from 'svelte/store';
	import UserStore from '../../stores/UserStore';
	import { calculateBodyComposition } from '../../utils/BodyCompositionResults';

	let { currentWeight, bf, desiredMuscleGain, pRatio } = $UserStore;

	const bodyComposition = calculateBodyComposition(pRatio, desiredMuscleGain, currentWeight, bf);

  console.table(bodyComposition)
</script>

