import type { Actions } from './$types';
import { supabase } from '$lib/supabaseClient';

export const actions = {
	default: async (event) => {
		// TODO log the user in
		const inData = await event.request.formData();

		
		const { error } = await supabase
			.from('patients')
			.insert({ patient_id: inData.get('patient_id'), date_of_usg: inData.get('date_of_usg'), patient_name: inData.get('patient_name'), husband_name: inData.get('husband_name'), patient_age: inData.get('patient_age'), last_menstrual_period: inData.get('last_menstrual_period'), number_of_male_children: inData.get('number_of_male_children'), number_of_female_children: inData.get('number_of_female_children'), referred_by: inData.get('referred_by'), mobile_no: inData.get('mobile_no'), address: inData.get('address') });
	}
} satisfies Actions;