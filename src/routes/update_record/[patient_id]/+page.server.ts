import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { handleFetch, handleUpdate } from '$lib/supabaseInterface';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const data = await handleFetch(parseInt(params.patient_id));

	return {
		patients: data ?? [],
	};
};

export const actions = {
	default: async (event) => {
		const inData = await event.request.formData();

		handleUpdate(inData);

		throw redirect(303, '/');
	}
} satisfies Actions;