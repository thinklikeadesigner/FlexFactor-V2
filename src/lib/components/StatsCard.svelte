<script lang="ts">
	import { ProgressRadial, SlideToggle } from '@skeletonlabs/skeleton';
	export let title: string;
</script>

<article class="my-4">
	<p class="unstyled mb-4 text-center text-xl font-normal">{title}</p>
	<div class="bg-white bg-opacity-10 m-auto rounded-2xl max-w-md p-4">
		<div class="flex justify-between items-center">
			<div class="flex flex-col items-center justify-between gap-2">
				<slot name="one"><!-- optional fallback --></slot>
			</div>
			<div class="text-right">
				<p class="unstyled leading-10">
					<slot name="two" />
				</p>
			</div>
		</div>
	</div>
</article>
