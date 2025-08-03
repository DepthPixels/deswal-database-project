import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
  // Create Supabase client for server-side operations
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get: (key) => event.cookies.get(key),
      set: (key, value, options) => {
        event.cookies.set(key, value, { ...options, path: '/' });
      },
      remove: (key, options) => {
        event.cookies.delete(key, { ...options, path: '/' });
      }
    }
  });

  // Helper function to get session
  event.locals.getSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    return session;
  };

  // Helper function to get user profile with tenant info
  event.locals.getUserProfile = async () => {
    const session = await event.locals.getSession();
    if (!session?.user) return null;

    const { data: profile } = await event.locals.supabase
      .from('user_profiles')
      .select(`
        *,
        tenant:tenants(*)
      `)
      .eq('user_id', session.user.id)
      .eq('is_active', true)
      .single();

    return profile;
  };

  // Check authentication for protected routes
  const protectedRoutes = ['/dashboard', '/patients', '/add-form', '/update_record'];
  const isProtectedRoute = protectedRoutes.some(route => 
    event.url.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const session = await event.locals.getSession();
    
    if (!session) {
      throw redirect(303, '/auth/login');
    }

    // Check if user has a valid profile and tenant
    const profile = await event.locals.getUserProfile();
    if (!profile || !profile.tenant) {
      throw redirect(303, '/auth/setup');
    }

    // Make profile and tenant available to the request
    event.locals.userProfile = profile;
    event.locals.tenant = profile.tenant;
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range';
    }
  });
};