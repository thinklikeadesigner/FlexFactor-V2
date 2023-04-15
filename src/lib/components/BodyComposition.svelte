<script lang="ts">
	import { get } from 'svelte/store';
	import UserStore from '../../stores/UserStore';
	import { calculateBodyComposition } from '../../utils/BodyCompositionResults';

	let { currentWeight, bf, desiredMuscleGain, pRatio } = $UserStore;

	const { totalWeightGain, endingWeight, fatGained, endingBodyFatPercent } = calculateBodyComposition(pRatio, desiredMuscleGain, currentWeight, bf);

  console.table({totalWeightGain, endingWeight, fatGained, endingBodyFatPercent})
  
</script>

