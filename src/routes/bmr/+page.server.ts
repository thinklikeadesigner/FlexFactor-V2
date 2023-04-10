import { fail, type Actions } from '@sveltejs/kit';
import { clearTodos, getTodos, removeTodo } from '$lib/server/database';
import { addTodo } from '../../lib/server/database';
import { calculateMacronutrients } from '../../utils/NutritionCalculations';
('../../utils/NutritionCalculations');

export const load: any = async () => {
	const todos = getTodos();
	return { todos };
};

export const actions: Actions = {
	addTodo: async ({ request }) => {
		const formData = await request.formData();

		// 	(weight = 145),
		// 	(height = 64),
		// 	(age = 29),
		// 	(sex = 'female'),
		// 	(bf = 0.12),
		// 	(activityLevel = 'sedentary');

		const weight = Number(formData.get('weight'));
		const height = Number(formData.get('height'));
		const age = Number(formData.get('age'));
		const sex = String(formData.get('sex'));
		const bf = Number(formData.get('bf'));
		const activityLevel = String(formData.get('activityLevel'));

		if (!weight || !height || !age || !sex || !bf || !activityLevel)
			return fail(400, { weight, missing: true });
		const results: string = JSON.stringify(
			calculateMacronutrients(weight, height, age, sex, bf, activityLevel)
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
