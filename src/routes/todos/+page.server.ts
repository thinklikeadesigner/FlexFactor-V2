import { fail, type Actions } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';
import { clearTodos, getTodos, removeTodo } from '$lib/server/database';
import { addTodo } from '../../lib/server/database';

export const load: PageServerLoad = async () => {
	const todos = getTodos();
	return { todos };
};

export const actions: Actions = {
	addTodo: async ({ request }) => {
		const formData = await request.formData();
		const todo = String(formData.get('todo'));

		if (!todo) return fail(400, { todo, missing: true });

		addTodo(todo);

		return { success: true };
	},
	removeTodo: async ({ request }) => {
		const formData = request.formData();
		const todoId = Number((await formData).get('id'));

		removeTodo(todoId);

		return { success: true };
	},
	clearTodos: () => {
		clearTodos();
	}
};
