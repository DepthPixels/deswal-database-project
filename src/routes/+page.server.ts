import type { PageServerLoad } from './$types';
import { handleFetch } from '$lib/supabaseInterface';

export const load: PageServerLoad = async ({ locals }) => {
  // Ensure user is authenticated and has tenant access
  if (!locals.tenant) {
    return {
      patients: []
    };
  }

  const data = await handleFetch(null, locals.tenant.id);

  return {
    patients: data ?? [],
  };
};