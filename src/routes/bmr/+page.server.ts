import { fail, type Actions } from '@sveltejs/kit';

import type { Action, PageServerLoad } from './$types';
import { clearFitnessLevels, getFitnessLevels, removeFitnessLevel } from '$lib/server/fitnessLevel';
import { addFitnessLevel } from '../../lib/server/fitnessLevel';
import NutritionCalculator from '../../utils/NutritionCalculatorTypescript';

export const load: PageServerLoad = async () => {
	const fitnessLevels = getFitnessLevels();
	return { fitnessLevels };

};

export const actions: Actions = {
	addFitnessLevel: async ({ request }) => {
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
		addFitnessLevel(results);

		return { success: true };
	},
	removeFitnessLevel: async ({ request }) => {
		const formData = request.formData();
		const fitnessLevelId = Number((await formData).get('id'));

		removeFitnessLevel(fitnessLevelId);

		return { success: true };
	},
	clearFitnessLevels: () => {
		clearFitnessLevels();
	}
};
