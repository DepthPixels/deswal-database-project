import { supabase } from '$lib/supabaseClient';

// Fetching must be self contained in +page.server.ts
export async function handleFetch(isAscending: boolean = true, patient_id: number | null = null): Promise<Patient[]> {
  if (patient_id) {
    var { data, error } = await supabase
      .from('patients')
      .select<'patients', Patient>()
      .eq('patient_id', patient_id);
  } else {
    var { data, error } = await supabase
      .from('patients')
      .select<'patients', Patient>()
      .order('patient_id', { ascending: isAscending });
  }

  if (error) {
    console.error('Error fetching patients:', error.message);
    return [];
  }

  return data ?? [];
}

export async function handleFetchFiltered(listFilter: ListFilter, startDate: Date, endDate: Date): Promise<Patient[]> {
  if (listFilter === 'Female Children') {
    var { data, error } = await supabase
      .from('patients')
      .select<'patients', Patient>()
      .neq('number_of_female_children', 0)
      .eq('number_of_male_children', 0)
      .gte('date_of_usg', startDate)
      .lte('date_of_usg', endDate)
      .order('patient_id', { ascending: true });
  } else if (listFilter === 'RPOC') {
    var { data, error } = await supabase
      .from('patients')
      .select<'patients', Patient>()
      .not('gestational_age', 'ilike', '%w%d')
      .gte('date_of_usg', startDate)
      .lte('date_of_usg', endDate)
      .order('patient_id', { ascending: true });
  } else if (listFilter === 'Full') {
    var { data, error } = await supabase
      .from('patients')
      .select<'patients', Patient>()
      .gte('date_of_usg', startDate)
      .lte('date_of_usg', endDate)
      .order('patient_id', { ascending: true });
  } else {
    var data: Patient[] | null = []
  }

  return data ?? [];
}


// Insert Function
export async function handleAddition(inData: FormData): Promise<void> {
  const { error } = await supabase
        .from('patients')
        .insert({ patient_id: inData.get('patient_id'), date_of_usg: inData.get('date_of_usg'), patient_name: inData.get('patient_name'), husband_name: inData.get('husband_name'), patient_age: inData.get('patient_age'), last_menstrual_period: inData.get('last_menstrual_period'), number_of_male_children: inData.get('number_of_male_children'), number_of_female_children: inData.get('number_of_female_children'), male_children_ages: inData.get('male_children_ages'), female_children_ages: inData.get('female_children_ages'), referred_by: inData.get('referred_by'), mobile_no: inData.get('mobile_no'), address: inData.get('address'), gestational_age: inData.get('gestational_age'), rch_id: inData.get('rch_id') });
  
  if (error) {
    console.error('Error adding patients:', error.message);
  }
}

// Delete Function
export async function handleDeletion(idList: string[]): Promise<void> {
  const { error } = await supabase
			.from('patients')
			.delete()
			.in('patient_id', idList);

  if (error) {
    console.error('Error deleting patients:', error.message);
  }
}

// Update Function
export async function handleUpdate(inData: FormData, originalId: number): Promise<void> {
  if (originalId != Number(inData.get('patient_id'))) {
    handleAddition(inData);
    handleDeletion([originalId.toString()]);
  } else {
    const { error } = await supabase
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

    if (error) {
      console.error('Error updating patients:', error.message);
    }
  }
}

// Helper for autofilling next patient ID.
export async function getNewestId(): Promise<number> {
  const { data, error } = await supabase
        .from('patients')
        .select('patient_id', { count: 'exact' })
        .order('patient_id', { ascending: false })
        .limit(1);
  
  if (error) {
    console.error('Error fetching newest patient ID:', error.message);
    return 0; // Return 0 if there's an error
  }
  return data[0]?.patient_id || 0;
}

export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}
