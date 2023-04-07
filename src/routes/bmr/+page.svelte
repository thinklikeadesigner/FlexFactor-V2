<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let loading = false;
	let error = false;

	const addTodo: SubmitFunction = (input) => {
		loading = true;
		console.log(input);
		return async ({ update }) => {
			loading = false;
			console.log(loading);
			await update();
		};
	};
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>
<div class="py-10">
	<div class="card p-4">
		<ul class="list">
			{#each data.todos as todo}
				<li class="">
					<span class="flex-auto capitalize">
						{todo.text}
					</span>
					<form action="?/removeTodo" method="POST" use:enhance>
						<input class="input" type="hidden" name="id" value={todo.id} />
						<button
							type="submit"
							class="btn variant-ghost-error text-error-400 m-0 bg-none border-none">DELETE</button
						>
					</form>
				</li>
			{/each}
		</ul>

		<form action="?/addTodo" method="POST" use:enhance={addTodo}>
			{#if form?.missing}
				<div class="flex flex-row justify-between">
					<label class="label" for="bmrType"
						><span>bmrType</span>
						<input class="input w-1/2" type="text" name="bmrType" /></label
					>
					<label class="label" for="weight">
						<span>weight</span>
						<input class="input w-1/2" type="text" name="weight" />
					</label>
					<label class="label" for="height"
						><span>height</span><input class="input w-1/2" type="text" name="height" /></label
					>
					<label class="label" for="age"
						><span>age</span>
						<input class="input w-1/2" type="text" name="age" />
					</label>
					<label class="label" for="sex"
						><span>sex</span>
						<input class="input w-1/2" type="text" name="sex" />
					</label>
					<label class="label" for="bf"
						><span>bf</span>
						<input class="input w-1/2" type="text" name="bf" />
					</label>
					<label class="label" for="activityLevel"
						><span>activityLevel</span>
						<input class="input w-1/2" type="text" name="activityLevel" />
					</label>
					<button class="btn" type="submit"> + Add todo </button>
					<button type="submit" formaction="?/clearTodos" class="btn"> clear</button>
				</div>
				<p class="text-error-400">This field is required</p>
			{:else}
				<div class="flex flex-row justify-between">
					<label class="label" for="bmrType"
						><span>bmrType</span>
						<input class="input input-error w-1/2" type="text" name="bmrType" /></label
					>
					<label class="label" for="weight">
						<span>weight</span>
						<input class="input input-error w-1/2" type="text" name="weight" />
					</label>
					<label class="label" for="height"
						><span>height</span><input
							class="input input-error w-1/2"
							type="text"
							name="height"
						/></label
					>
					<label class="label" for="age"
						><span>age</span>
						<input class="input input-error w-1/2" type="text" name="age" />
					</label>
					<label class="label" for="sex"
						><span>sex</span>
						<input class="input input-error w-1/2" type="text" name="sex" />
					</label>
					<label class="label" for="bf"
						><span>bf</span>
						<input class="input input-error w-1/2" type="text" name="bf" />
					</label>
					<label class="label" for="activityLevel"
						><span>activityLevel</span>
						<input class="input input-error w-1/2" type="text" name="activityLevel" />
					</label>
					<button class="btn" type="submit"> + Add todo </button>
					<button type="submit" formaction="?/clearTodos" class="btn"> clear</button>
				</div>
			{/if}
		</form>

		{#if form?.success}
			<p>Added todo!</p>
		{/if}
	</div>
</div>
