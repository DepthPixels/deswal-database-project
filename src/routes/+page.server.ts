import type { PageServerLoad } from './$types';
import { handleFetch } from '$lib/supabaseInterface';

export const load: PageServerLoad = async () => {
  const data = await handleFetch();

  return {
    patients: data ?? [],
  };
};