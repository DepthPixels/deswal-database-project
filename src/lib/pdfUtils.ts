import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import { handleFetch } from '$lib/supabaseInterface';

export async function downloadFullList() {
  const data = await handleFetch();

  const doc = new jsPDF();

  const tableRows = data.map(item => [
    item.patient_id,
    item.date_of_usg instanceof Date ? item.date_of_usg.toLocaleDateString() : item.date_of_usg,
    item.patient_name,
    item.husband_name,
    item.patient_age,
    item.number_of_male_children,
    item.number_of_female_children,
    item.male_children_ages,
    item.female_children_ages,
    item.address,
    item.mobile_no,
    item.referred_by,
    item.last_menstrual_period instanceof Date ? item.last_menstrual_period.toLocaleDateString() : item.last_menstrual_period,
    item.gestational_age,
    item.rch_id
  ])

  autoTable(doc, {
    head: [['Patient ID', 'Date of USG', 'Patient Name', 'Husband Name', 'Patient Age', 'Number of Male Children', 'Number of Female Children', 'Male Children Ages', 'Female Children Ages', 'Address', 'Mobile No', 'Referred By', 'Last Menstrual Period', 'Gestational Age', 'RCH ID']],
    body: tableRows
  });
  doc.save('full_list.pdf');
} 