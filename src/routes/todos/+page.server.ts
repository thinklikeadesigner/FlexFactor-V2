import { fail, type Actions } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';
import { clearTodos, getTodos, removeTodo } from '$lib/server/database';
import { addTodo } from '../../lib/server/database';
import { female, male } from '../../utils/FitnessLevel';

export const load: PageServerLoad = async () => {
	const todos = getTodos();
	return { todos };
};

export const actions: Actions = {
	addTodo: async ({ request }) => {
		const formData = await request.formData();
		const sex = String(formData.get('sex'));
		const exercise = String(formData.get('exercise'));
		const weight = Number(formData.get('weight'));
		const oneRepMax = Number(formData.get('oneRepMax'));
		let fitness;
		if (!sex || !exercise || !weight || !oneRepMax) return fail(400, { exercise, missing: true });

		if (sex == 'female') {
			fitness = female.getLevel(exercise, weight, oneRepMax);
			addTodo(fitness);
		} else {
			fitness = male.getLevel(exercise, weight, oneRepMax);
			addTodo(fitness);
		}
		console.log(fitness);

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
