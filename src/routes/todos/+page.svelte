<script lang="ts">
	import { enhance } from "$app/forms";
    import type { ActionData, PageData, SubmitFunction } from './$types';
    

    export let data: PageData;
    export let form: ActionData

let loading = false;

const addTodo: SubmitFunction = (input) => {

loading = true
console.log(loading)
    return async ({update}) => {
     loading = false
     console.log(loading)
        await update()
    }
}

</script>

<pre>{JSON.stringify(data, null, 2)}</pre>
<div class="py-10">
    <div class="card p-4">

        <ul class="list">
            {#each data.todos as todo}
            <li class="">
                <span class="flex-auto capitalize" >
                    {todo.text}
                </span>
                <form action="?/removeTodo" method="POST" use:enhance>
                <input class="input" type="hidden" name="id" value={todo.id}>
                <button type="submit" class="btn variant-ghost-error text-error-400 m-0 bg-none border-none">DELETE</button>
              
            </form>
            </li>
            {/each}
        </ul>
    
        <form action="?/addTodo" method="POST" use:enhance={addTodo}>
   {#if form?.missing}
   <div   class="flex flex-row justify-between">

           <input class="input input-error w-1/2" type="text" name="todo" />
           <button  class="btn" type="submit"> 
            + Add todo
        </button>
        <button type="submit" formaction="?/clearTodos" class="btn">  clear</button>
        </div>  
                <p class="text-error-400">This field is required</p>
       {:else}
                <div class="flex flex-row justify-between">
           <input class="input w-1/2" type="text" name="todo" />
           <button class="btn" type="submit"> + Add todo </button>
           <button type="submit" formaction="?/clearTodos" class="btn">  clear</button>
        </div>
           {/if}
  
           </form>

        {#if form?.success}
<p>Added todo!</p>
        {/if}
    </div>
</div>