<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import UserStore from '../../stores/UserStore';



	const toggleUnitSystem = () => {
		if ($UserStore.unitSystem === 'imperial') $UserStore.unitSystem = 'metric';
		else if ($UserStore.unitSystem === 'metric') $UserStore.unitSystem = 'imperial';
	};
</script>

<header class="p-4 relative z-10">
	<a href="/">
		<img src="/images/logo.png" alt="Flex Factor Logo" class="max-h-24 m-auto" />
	</a>
	<label for="sex" class="flex justify-end items-center gap-2 font-light"
		>Unit
		<div class="w-1/3">
			<SlideToggle name="sex" on:change={toggleUnitSystem}
				>{$UserStore.unitSystem === 'imperial' ? `lb|ft` : `kg|cm`}</SlideToggle
			>
		</div></label
	>
</header>
