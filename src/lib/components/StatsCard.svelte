<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	export let percentVal: number;
	export let title: string;
	export let colour: string;
</script>

<div class="bg-white bg-opacity-10 m-2 rounded-2xl max-w-md p-4">
	<h3>{title}</h3>
	<div class="flex justify-between items-center">
		<div class="flex flex-col items-center justify-between gap-2">
			<p>Body Fat</p>
			<ProgressRadial
				value={percentVal}
				width="w-24"
				font={108}
				stroke={96}
				meter="stroke-{colour}-500"
				track="stroke-{colour}-500/30">{percentVal}%</ProgressRadial
			>
		</div>
		<div class="text-right">
			<p class="unstyled leading-10">
				<slot />
			</p>
		</div>
	</div>
</div>
