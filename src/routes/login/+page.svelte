<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from "./$types";
export let form: ActionData


</script>

<pre>{JSON.stringify(form, null, 2)}</pre>
<h1>Forms</h1>
<form method="POST" use:enhance>
<input class="text-black" type="text" name="user" value={form?.data?.user ?? ''} />
{#if form?.errors?.user}
     <p class="text-red-400">nooo</p>
{/if}
<input class="text-black" type="password" name='password' value={form?.data?.password ?? ''} />
{#if form?.errors?.password}
     <p class="text-red-400">nooo</p>
{/if}
<button type="submit">Login</button>
</form>