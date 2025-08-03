import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { getNewestId, handleAddition } from '$lib/supabaseInterface';

export const actions = {
	default: async (event) => {
		// TODO log the user in
		const inData = await event.request.formData();

		handleAddition(inData);
	}
} satisfies Actions;

export const load: PageServerLoad = async () => {
	const newestId = await getNewestId();

	return {
		nextEmptyId: newestId + 1 // Increment to ensure the next ID is unique
	};
};