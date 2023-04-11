import { fail, type Actions } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';
import { clearFitnessLevels, getFitnessLevels, removeFitnessLevel } from '$lib/server/fitnessLevel';
import { addFitnessLevel } from '../../lib/server/fitnessLevel';
import { getFitnessLevel } from '../../utils/FitnessLevel';

export const load: PageServerLoad = async () => {
	const fitnessLevels = getFitnessLevels();
	return { fitnessLevels };
};

export const actions: Actions = {
	addFitnessLevel: async ({ request }) => {
		const formData = await request.formData();
		const sex = String(formData.get('sex'));
		const exercise = String(formData.get('exercise'));
		const weight = Number(formData.get('weight'));
		const oneRepMax = Number(formData.get('oneRepMax'));
		if (!sex || !exercise || !weight || !oneRepMax) return fail(400, { exercise, missing: true });

		const fitness = await getFitnessLevel(sex, exercise, weight, oneRepMax);
		addFitnessLevel(fitness);
		console.log(fitness);

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
