<script>
// Your selected Skeleton theme:
import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
// This contains the bulk of Skeletons required styles:
import '@skeletonlabs/skeleton/styles/all.css';
// Finally, your application's global stylesheet (sometimes labeled 'app.css')
import '../app.postcss';
	import { AppShell } from "@skeletonlabs/skeleton";

</script>

<section class="container w-1/2 flex flex-col justify-center items-center m-auto pt-10">
<AppShell>
	<slot />
</AppShell>
</section>
<style>
</style>
