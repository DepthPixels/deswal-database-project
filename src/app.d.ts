// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import { SupabaseClient, Session } from '@supabase/supabase-js';
import type { Database } from '$lib/supabase';
import type { UserProfile, Tenant } from '$lib/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
			getUserProfile(): Promise<UserProfile | null>;
			userProfile?: UserProfile;
			tenant?: Tenant;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
