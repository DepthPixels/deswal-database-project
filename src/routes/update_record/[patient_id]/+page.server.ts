import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { handleFetch, handleUpdate } from '$lib/supabaseInterface';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.tenant) {
		throw redirect(303, '/auth/login');
	}

	const data = await handleFetch(parseInt(params.patient_id), locals.tenant.id);

	return {
		patients: data ?? [],
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.tenant) {
			throw redirect(303, '/auth/login');
		}

		const inData = await request.formData();
		await handleUpdate(inData, locals.tenant.id);

		throw redirect(303, '/');
	}
} satisfies Actions;