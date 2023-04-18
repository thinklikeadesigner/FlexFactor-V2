<script>
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';

	import Footer from '$lib/components/Footer.svelte';

	import Header from '$lib/components/Header.svelte';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<Header />
<section class="container w-11/12 flex flex-col justify-center items-center m-auto  relative z-10">
	<AppShell>
		<slot />
	</AppShell>
</section>

<Footer />

<div
	class="hero absolute h-full w-full top-0 opacity-30 z-[2] bg-no-repeat bg-cover bg-center bg-hero"
/>

<style>
</style>
