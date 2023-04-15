<script>
// Your selected Skeleton theme:
import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
// This contains the bulk of Skeletons required styles:
import '@skeletonlabs/skeleton/styles/all.css';
// Finally, your application's global stylesheet (sometimes labeled 'app.css')
import '../app.postcss';
	import { AppShell } from "@skeletonlabs/skeleton";

</script>

<section class="container w-11/12 flex flex-col justify-center items-center m-auto pt-10 relative z-10">
<AppShell>
	<slot />
</AppShell>
</section>
<div class="hero absolute h-full w-full top-0 opacity-30 z-[2] bg-no-repeat bg-cover bg-center bg-hero"></div>

<style>
	
</style>
