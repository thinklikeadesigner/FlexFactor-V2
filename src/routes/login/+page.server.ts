import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const age = Number(formData.get('age'));
		const sex = String(formData.get('sex'));
		const height = Number(formData.get('height'));

		const errors: Record<string, unknown> = {};

		if (!age || typeof age !== 'number') {
			errors.age = 'required';
		}

		if (!sex || typeof sex !== 'string') {
			errors.sex = 'required';
		}

		if (!height || typeof height !== 'number') {
			errors.height = 'required';
		}

		if (Object.keys(errors).length > 0) {
			const data = {
				data: Object.fromEntries(formData),
				errors
			};
			return fail(400, data);
		}
		throw redirect(303, '/fitnessLevel');
	}
};
