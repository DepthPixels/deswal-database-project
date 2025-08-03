import { supabase } from '$lib/supabaseClient';
import type { Patient } from '$lib/types';

// Fetching must be self contained in +page.server.ts
export async function handleFetch(patient_id: number | null = null, tenantId?: string): Promise<Patient[]> {
  let query = supabase.from('patients').select<'patients', Patient>();
  
  // Apply tenant filter if provided (for server-side operations)
  if (tenantId) {
    query = query.eq('tenant_id', tenantId);
  }
  
  if (patient_id) {
    query = query.eq('patient_id', patient_id);
  } else {
    query = query.order('patient_id', { ascending: true });
  }
  
  const { data, error } = await query;

  if (error) {
    console.error('Error fetching patients:', error.message);
    return [];
  } else {
    console.log("Data loaded:", data);
  }

  return data ?? [];
}


// Insert Function
export async function handleAddition(inData: FormData, tenantId: string): Promise<void> {
  const { error } = await supabase
        .from('patients')
        .insert({ 
          tenant_id: tenantId,
          patient_id: inData.get('patient_id'), 
          date_of_usg: inData.get('date_of_usg'), 
          patient_name: inData.get('patient_name'), 
          husband_name: inData.get('husband_name'), 
          patient_age: inData.get('patient_age'), 
          last_menstrual_period: inData.get('last_menstrual_period'), 
          number_of_male_children: inData.get('number_of_male_children'), 
          number_of_female_children: inData.get('number_of_female_children'), 
          male_children_ages: inData.get('male_children_ages'), 
          female_children_ages: inData.get('female_children_ages'), 
          referred_by: inData.get('referred_by'), 
          mobile_no: inData.get('mobile_no'), 
          address: inData.get('address'), 
          gestational_age: inData.get('gestational_age'), 
          rch_id: inData.get('rch_id') 
        });
  
  if (error) {
    console.error('Error adding patients:', error.message);
  }
}

// Delete Function
export async function handleDeletion(idList: string[], tenantId?: string): Promise<void> {
  let query = supabase.from('patients').delete().in('patient_id', idList);
  
  // Apply tenant filter if provided (for server-side operations)
  if (tenantId) {
    query = query.eq('tenant_id', tenantId);
  }
  
  const { error } = await query;

  if (error) {
    console.error('Error deleting patients:', error.message);
  }
}

// Update Function
export async function handleUpdate(inData: FormData, tenantId?: string): Promise<void> {
  let query = supabase
        .from('patients')
        .update({
          date_of_usg: inData.get('date_of_usg'),
          patient_name: inData.get('patient_name'),
          husband_name: inData.get('husband_name'),
          patient_age: inData.get('patient_age'),
          last_menstrual_period: inData.get('last_menstrual_period'),
          number_of_male_children: inData.get('number_of_male_children'),
          number_of_female_children: inData.get('number_of_female_children'),
          male_children_ages: inData.get('male_children_ages'),
          female_children_ages: inData.get('female_children_ages'),
          referred_by: inData.get('referred_by'),
          mobile_no: inData.get('mobile_no'),
          address: inData.get('address'),
          gestational_age: inData.get('gestational_age'),
          rch_id: inData.get('rch_id')
        })
        .eq('patient_id', inData.get('patient_id'));
  
  // Apply tenant filter if provided (for server-side operations)
  if (tenantId) {
    query = query.eq('tenant_id', tenantId);
  }
  
  const { error } = await query;

  if (error) {
    console.error('Error updating patients:', error.message);
  }
}

// Helper for autofilling next patient ID.
export async function getNewestId(tenantId?: string): Promise<number> {
  let query = supabase
        .from('patients')
        .select('patient_id', { count: 'exact' })
        .order('patient_id', { ascending: false })
        .limit(1);
  
  // Apply tenant filter if provided (for server-side operations)
  if (tenantId) {
    query = query.eq('tenant_id', tenantId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching newest patient ID:', error.message);
    return 0; // Return 0 if there's an error
  }
  return data[0]?.patient_id || 0;
}

// Tenant management functions
export async function createTenant(tenantData: {
  name: string;
  slug: string;
  address?: string;
  phone?: string;
  email?: string;
  license_number?: string;
  pcpndt_registration?: string;
}): Promise<{ data: any; error: any }> {
  return await supabase
    .from('tenants')
    .insert(tenantData)
    .select()
    .single();
}

export async function createUserProfile(profileData: {
  user_id: string;
  tenant_id: string;
  role: string;
  full_name?: string;
  phone?: string;
}): Promise<{ data: any; error: any }> {
  return await supabase
    .from('user_profiles')
    .insert(profileData)
    .select()
    .single();
}

export async function getTenantBySlug(slug: string): Promise<{ data: any; error: any }> {
  return await supabase
    .from('tenants')
    .select('*')
    .eq('slug', slug)
    .single();
}