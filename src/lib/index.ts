// place files you want to import through the `$lib` alias in this folder.
// import { Database } from './supabase';

type Patient = {
  patient_id: number;
  date_of_usg: Date;
  patient_name: string;
  husband_name: string;
  patient_age: number;
  number_of_male_children: number;
  number_of_female_children: number;
  male_children_ages: string;
  female_children_ages: string;
  address: string;
  mobile_no: number;
  referred_by: string;
  last_menstrual_period: Date;
  gestational_age: string;
  rch_id: number;
};