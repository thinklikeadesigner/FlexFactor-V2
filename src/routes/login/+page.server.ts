import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const user = String(formData.get('user'));
		const password = String(formData.get('password'));

		const errors: Record<string, unknown> = {};

		if (!user || typeof user !== 'string') {
			errors.user = 'required';
		}

		if (!password || typeof password !== 'string') {
			errors.password = 'required';
		}

		if (Object.keys(errors).length > 0) {
			const data = {
				data: Object.fromEntries(formData),
				errors
			};
			return fail(400, data);
		}
		throw redirect(303, '/todos');
	}
};
