import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import { handleFetch, handleFetchFiltered } from '$lib/supabaseInterface';

export async function downloadList(listFilter: ListFilter, startDate: Date, endDate: Date): Promise<void> {
  var data = await handleFetchFiltered(listFilter, startDate, endDate);

  const doc = new jsPDF({ orientation: 'landscape' });

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
    head: [[{content: 'Patient ID', styles: { cellWidth: 12 }}, {content: 'Date of USG', styles: { cellWidth: 18 }}, {content: 'Patient Name', styles: { cellWidth: 20 }}, {content: 'Husband Name', styles: { cellWidth: 20 }}, {content: 'Patient Age', styles: { cellWidth: 12 }}, {content: 'Number of Male Children', styles: { cellWidth: 13 }}, {content: 'Number of Female Children', styles: { cellWidth: 13 }}, {content: 'Male Children Ages', styles: { cellWidth: 13 }}, {content: 'Female Children Ages', styles: { cellWidth: 13 }}, {content: 'Address', styles: { cellWidth: 40 }}, {content: 'Mobile No', styles: { cellWidth: 23 }}, {content: 'Referred By', styles: { cellWidth: 40 }}, {content: 'Last Menstrual Period', styles: { cellWidth: 18 }}, {content: 'Gestational Age', styles: { cellWidth: 14 }}, {content: 'RCH ID', styles: { cellWidth: 18 }}]],
    body: tableRows,
    margin: 5,
    theme: 'grid',
    rowPageBreak: 'avoid',
    showHead: 'firstPage',
    headStyles: {
      fillColor: undefined,
      textColor: 20,
      fontSize: 12,
      fontStyle: 'bold',
      lineWidth: 0.5,
    },
  });

  doc.output('dataurlnewwindow', { filename: `${listFilter} List.pdf` });
}