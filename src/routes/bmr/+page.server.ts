import { fail, type Actions } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';
import { clearTodos, getTodos, removeTodo } from '$lib/server/database';
import { addTodo } from '../../lib/server/database';
import NutritionCalculator from '../../utils/NutritionCalculatorTypescript';

export const load: PageServerLoad = async () => {
	const todos = getTodos();
	return { todos };
};

export const actions: Actions = {
	addTodo: async ({ request }) => {
		const formData = await request.formData();

		// (bmrType = 'calculateBMRWithBF1'),
		// 	(weight = 145),
		// 	(height = 64),
		// 	(age = 29),
		// 	(sex = 'female'),
		// 	(bf = 0.12),
		// 	(activityLevel = 'sedentary');

		const bmrType = String(formData.get('bmrType'));
		const weight = Number(formData.get('weight'));
		const height = Number(formData.get('height'));
		const age = Number(formData.get('age'));
		const sex = String(formData.get('sex'));
		const bf = Number(formData.get('bf'));
		const activityLevel = String(formData.get('activityLevel'));

		if (!bmrType || !weight || !height || !age || !sex || !bf || !activityLevel)
			return fail(400, { weight, missing: true });
		const calculator = new NutritionCalculator();
		const results: string = JSON.stringify(
			calculator.calculateMacronutrients(bmrType, weight, height, age, sex, bf, activityLevel)
		);
		addTodo(results);

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
