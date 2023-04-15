<script>
	let year = new Date().getFullYear();
	import linkedInLogo from '$lib/images/linkedin.png';
	const developers = [
		{ name: 'Rebecca Burch', linkedIn: 'https://www.linkedin.com/in/rebecca-burch/', github: 'https://github.com/thinklikeadesigner/' },
		{ name: 'Devin Jaggernauth', linkedIn: 'https://www.linkedin.com/in/devin-jaggernauth/', github: 'https://github.com/mentalcaries/' }
	];
</script>

<footer class="container w-10/12 m-auto py-10 sticky top-[100vh] z-10">
	<nav class="py-5 m-auto">
		<ul class="m-auto flex justify-center gap-2">
			<li><a href="/">Home</a></li>
			<li><a href="/disclaimer">Disclaimer</a></li>
		</ul>
	</nav>
	<div class="flex flex-col sm:flex-row gap-1 sm:gap-5 justify-center">
		<p class="text-center">FlexFactor &copy; {year}</p>
		{#each developers as { linkedIn, name, github }}
		<div class="flex justify-center items-center">
			<p class="unstyled text-sm">{name}</p>
			<a href={github} class="h-7" target="_blank" rel="noreferrer"><img src="/images/github.png" class="h-full" alt="GitHub Icon"></a>
			<a href={linkedIn} class="h-7" target="_blank" rel="noreferrer"><img src="/images/linkedin.png" class="h-full" alt="GitHub Icon"></a>
		</div>
		{/each}
	</div>
	
</footer>
