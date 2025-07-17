import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

type Patient = {
  patient_id: number;
  date_of_usg: Date;
  patient_name: string;
  husband_name: string;
  patient_age: number;
  number_of_male_children: number;
  number_of_female_children: number;
  address: string;
  mobile_no: number;
  referred_by: string;
  last_menstrual_period: Date;
};

export const load: PageServerLoad = async () => {
  const { data, error } = await supabase.from('patients').select<'patients', Patient>();

  if (error) {
    console.error('Error loading patients:', error.message);
    return { patients: [] };
  }

  return {
    patients: data ?? [],
  };
};