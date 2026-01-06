import type { PageServerLoad } from './$types';
import { getRowsCount, handleFetchRange } from '$lib/supabaseInterface';

export const load: PageServerLoad = async ({ url }) => {
  const page = +(url.searchParams.get('page') || 1);

  const data = await handleFetchRange(false, (page - 1) * 40, (page * 40) - 1);
  const count = await getRowsCount();

  return {
    patients: data ?? [],
    paging: {
      count,
      page
    }
  };
};