import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { getNewestId, handleAddition } from '$lib/supabaseInterface';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.tenant) {
			throw redirect(303, '/auth/login');
		}

		const inData = await request.formData();

		await handleAddition(inData, locals.tenant.id);
		
		throw redirect(303, '/');
	}
} satisfies Actions;

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.tenant) {
		throw redirect(303, '/auth/login');
	}

	const newestId = await getNewestId(locals.tenant.id);

	return {
		nextEmptyId: newestId + 1 // Increment to ensure the next ID is unique
	};
};