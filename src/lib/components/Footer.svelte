<script>
	let year = new Date().getFullYear();
  import linkedInLogo from '$lib/images/linkedin.png'
	const developers = [
		{ name: 'Rebecca Burch', linkedIn: 'https://www.linkedin.com/in/rebecca-burch/' },
		{ name: 'Devin Jaggernauth', linkedIn: 'https://www.linkedin.com/in/devin-jaggernauth/' }
	];
</script>

<footer
	class="container w-11/12 justify-center gap-2 flex items-center m-auto py-10 sticky top-[100vh] z-10"
>
	FlexFactor &copy; {year}
	{#each developers as {linkedIn, name}}
		<a href={linkedIn} target="_blank" rel="noreferrer" class="flex items-center">{name}</a>
	{/each}
</footer>
