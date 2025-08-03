import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await locals.getSession();
  
  return {
    session,
    userProfile: locals.userProfile || null,
    tenant: locals.tenant || null
  };
};