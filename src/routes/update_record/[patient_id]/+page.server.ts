import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { handleFetch, handleUpdate } from '$lib/supabaseInterface';
import { redirect } from '@sveltejs/kit';

let originalId : number;

export const load: PageServerLoad = async ({ params }) => {
	const data = await handleFetch(parseInt(params.patient_id));

	originalId = parseInt(params.patient_id);

	return {
		patients: data ?? [],
	};
};

function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

export const actions = {
	default: async (event) => {
		const inData = await event.request.formData();

		for (const [key, value] of inData.entries()) {
			if (typeof value === 'string') {
				inData.set(key, toTitleCase(value));
			}
		}

		handleUpdate(inData, originalId);

		throw redirect(303, '/');
	}
} satisfies Actions;