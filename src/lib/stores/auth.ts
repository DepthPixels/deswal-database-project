import { writable } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';
import type { AuthContext, UserProfile, Tenant } from '$lib/types';

// Create the auth store
function createAuthStore() {
  const { subscribe, set, update } = writable<AuthContext>({
    user: null,
    profile: null,
    tenant: null,
    isLoading: true
  });

  return {
    subscribe,
    
    // Initialize auth state
    initialize: async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          await loadUserProfile(session.user);
        } else {
          set({
            user: null,
            profile: null,
            tenant: null,
            isLoading: false
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        set({
          user: null,
          profile: null,
          tenant: null,
          isLoading: false
        });
      }
    },

    // Sign in user
    signIn: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      if (data.user) {
        await loadUserProfile(data.user);
      }
      
      return data;
    },

    // Sign up user
    signUp: async (email: string, password: string, tenantSlug?: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            tenant_slug: tenantSlug
          }
        }
      });

      if (error) throw error;
      return data;
    },

    // Sign out user
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      set({
        user: null,
        profile: null,
        tenant: null,
        isLoading: false
      });
    },

    // Update user profile
    updateProfile: (profile: UserProfile) => {
      update(state => ({
        ...state,
        profile
      }));
    },

    // Switch tenant (for users with multiple tenant access)
    switchTenant: async (tenantId: string) => {
      update(state => ({ ...state, isLoading: true }));
      
      try {
        // Update user's active tenant
        const { error } = await supabase
          .from('user_profiles')
          .update({ tenant_id: tenantId })
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

        if (error) throw error;

        // Reload profile and tenant data
        const user = (await supabase.auth.getUser()).data.user;
        if (user) {
          await loadUserProfile(user);
        }
      } catch (error) {
        console.error('Error switching tenant:', error);
        update(state => ({ ...state, isLoading: false }));
        throw error;
      }
    }
  };

  // Helper function to load user profile and tenant data
  async function loadUserProfile(user: any) {
    try {
      update(state => ({ ...state, isLoading: true }));

      // Fetch user profile with tenant data
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select(`
          *,
          tenant:tenants(*)
        `)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        set({
          user,
          profile: null,
          tenant: null,
          isLoading: false
        });
        return;
      }

      set({
        user,
        profile: profile as UserProfile,
        tenant: profile.tenant as Tenant,
        isLoading: false
      });
    } catch (error) {
      console.error('Error loading user profile:', error);
      set({
        user,
        profile: null,
        tenant: null,
        isLoading: false
      });
    }
  }
}

export const authStore = createAuthStore();

// Listen to auth changes
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    // Profile will be loaded by the sign in method
  } else if (event === 'SIGNED_OUT') {
    authStore.signOut();
  }
});