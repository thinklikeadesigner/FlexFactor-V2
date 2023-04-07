<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<pre>{JSON.stringify(form, null, 2)}</pre>
<h1>User</h1>
<form method="POST" use:enhance>
	<label class="label" for="age"
		><span>age</span>
		<input class="text-black input" type="text" name="age" value={form?.data?.age ?? ''} />
	</label>
	{#if form?.errors?.age}
		<p class="text-red-400">nooo</p>
	{/if}
	<label class="label" for="sex"
		><span>sex</span>
		<input class="text-black input" type="text" name="sex" value={form?.data?.sex ?? ''} />
	</label>

	{#if form?.errors?.sex}
		<p class="text-red-400">nooo</p>
	{/if}
	<label class="label" for="height"
		><span>height</span>
		<input class="text-black input" type="text" name="height" value={form?.data?.height ?? ''} />
	</label>
	{#if form?.errors?.height}
		<p class="text-red-400">nooo</p>
	{/if}
	<button type="submit">Login</button>
</form>
