import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatPatientId } from "./patientId";

const fmt = (val) => {
  if (val === null || val === undefined || val === "") return "—";
  if (val instanceof Date) return val.toLocaleDateString("en-IN");
  if (typeof val === "string" && val.includes("T00:00")) {
    return new Date(val).toLocaleDateString("en-IN");
  }
  return String(val);
};

const addSection = (doc, title, rows, startY) => {
  // Section heading
  doc.setFillColor(0, 59, 122);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.rect(14, startY, 182, 8, "F");
  doc.text(title, 18, startY + 5.5);
  doc.setTextColor(0, 0, 0);

  autoTable(doc, {
    startY: startY + 8,
    body: rows,
    theme: "striped",
    alternateRowStyles: { fillColor: [240, 245, 255] },
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 65, textColor: [30, 40, 80] },
      1: { cellWidth: 117 },
    },
    margin: { left: 14, right: 14 },
    tableLineColor: [200, 210, 230],
    tableLineWidth: 0.2,
  });

  return doc.lastAutoTable.finalY + 6;
};

export const printPatientPDF = (p) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // ── Header ──
  doc.setFillColor(0, 59, 122);
  doc.rect(0, 0, 210, 32, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text("KLE Centenary Charitable Hospital", 105, 11, { align: "center" });
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Parivarthana Rehabilitation & De-addiction Unit", 105, 18, { align: "center" });
  doc.text("Yellur Road, Belgaum, Karnataka", 105, 24, { align: "center" });

  doc.setTextColor(0, 59, 122);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Patient Comprehensive Report", 105, 42, { align: "center" });

  doc.setDrawColor(0, 59, 122);
  doc.setLineWidth(0.5);
  doc.line(14, 45, 196, 45);

  let y = 50;

  // ── 1. Basic Information ──
  const basicRows = [
    ["Patient ID", formatPatientId(p.patientId)],
    ["Name", fmt(p.name)],
    ["Age", fmt(p.age)],
    ["Gender", fmt(p.sex)],
    ["Address", fmt(p.address)],
    ["District", fmt(p.district || p.disctrict)],
    ["Taluk", fmt(p.taluk)],
    ["Phone", fmt(p.phone)],
    ["Aadhar Number", fmt(p.aadharNumber)],
    ["Community", fmt(p.community)],
    ["Occupation", fmt(p.occupation)],
    ["Annual Income", fmt(p.annual_income)],
    ["Marital Status", fmt(p.marital_status)],
    ["Living Arrangement", fmt(p.living_arrangement)],
    ["Referral", fmt(p.referral || p.refferal)],
    ["Joining Date", fmt(p.joining_date)],
    ["Discharge Date", p.discharge_date ? fmt(p.discharge_date) : "Still Admitted"],
  ];
  y = addSection(doc, "1. Basic Information", basicRows, y);

  // ── 2. Presenting Complaints (Drug History) ──
  if (p.complaints && p.complaints.length > 0) {
    const complaintRows = p.complaints.map((c, i) => [
      `Complaint ${i + 1}`,
      `Type: ${fmt(c.drug_type)} | Drug: ${fmt(c.drug)} | Age of First Use: ${fmt(c.age_of_first_use)} | Year Use: ${fmt(c.year_use)} | Frequency: ${fmt(c.frequency_last_30_days)} | Qty: ${fmt(c.quantity_last_30_days)} | Route: ${fmt(c.route_stration)}`,
    ]);
    y = addSection(doc, "2. Presenting Complaints / Drug History", complaintRows, y);
  }

  // ── 3. Substance Use Details ──
  const substanceRows = [
    ["Reason for Starting", fmt(p.reason_start)],
    ["Reason for Continuing", fmt(p.reason_continue)],
    ["Stressors", fmt(p.stressors)],
    ["Last Use Date", fmt(p.last_use_date)],
    ["Last Use Quantity", fmt(p.last_use_quantity)],
    ["Withdrawal Symptoms", fmt(p.withdrawal_symptoms_experienced_when_the_patient_stopped)],
    ["Denial of Substance Problems", fmt(p.denial_of_substance_use_related_problems)],
    ["Motivation Factor", fmt(p.motivation_factor)],
    ["Willingness for Treatment", fmt(p.willingness_for_treatment)],
    ["Action Taken", fmt(p.action_taken)],
  ];
  y = addSection(doc, "3. Substance Use Assessment", substanceRows, y);

  // ── Page break check ──
  const checkPageBreak = (currentY, needed = 40) => {
    if (currentY + needed > 280) {
      doc.addPage();
      return 15;
    }
    return currentY;
  };

  y = checkPageBreak(y);

  // ── 4. Medical History ──
  const medicalRows = [
    ["Weight at Admission (kg)", fmt(p.weight_while_admission_in_kg)],
    ["Weight at Discharge (kg)", fmt(p.weight_while_discharge_in_kg)],
    ["Height (ft)", fmt(p.height_in_ft)],
    ["Sugar (mg)", fmt(p.sugar_in_mg)],
    ["Other Issues", fmt(p.other_issues)],
    ["Past Medical Problem", fmt(p.past_medical_problem)],
    ["Present Medical Problem", fmt(p.present_medical_problem)],
    ["Chronic Health Problem", fmt(p.chronic_health_problem)],
    ["Past Psychiatric Complication", fmt(p.past_psychiatric_complication)],
    ["Present Psychiatric Complication", fmt(p.present_psychiatric_complication)],
    ["History of Head Injuries", fmt(p.history_of_previous_head_injureies)],
    ["Allergy Knowledge", fmt(p.allergy_knowledge)],
    ["Psychiatric Illness", fmt(p.psychiatric_illness)],
  ];
  y = addSection(doc, "4. Medical History", medicalRows, y);
  y = checkPageBreak(y);

  // ── 5. Family History ──
  const familyRows = [
    ["Pedigree", fmt(p.pedigree)],
    ["Family History of Substance Abuse", fmt(p.family_history_substance_abuse)],
    ["Extra Marital Experience", fmt(p.extra_marital_experience)],
    ["Premarital Sexual Encounter", fmt(p.premarital_sexual_encounter)],
    ["High Risk Sexual Activity", fmt(p.involved_high_risk_sexual_activity)],
    ["Sexual Problems", fmt(p.sexual_problems)],
    ["Spouse Name", fmt(p.spouse_name)],
    ["Spouse Age", fmt(p.spouse_age)],
    ["Spouse Occupation", fmt(p.spouse_occupation)],
    ["Marriage Years", fmt(p.marriage_years)],
    ["Marriage Type", fmt(p.marriage_type)],
    ["Separation due to Addiction", fmt(p.marriage_seperation_due_to_addication)],
    ["Family Violence", fmt(p.family_violence)],
  ];
  y = addSection(doc, "5. Family & Marital History", familyRows, y);
  y = checkPageBreak(y);

  // ── 6. Occupational & Legal History ──
  const occupationalRows = [
    ["Occupation Age", fmt(p.occupation_age)],
    ["Occupation Duration", fmt(p.occupation_duration)],
    ["Job Change Frequently", fmt(p.job_change_frequently)],
    ["Period of Unemployment", fmt(p.period_of_unemployment)],
    ["Financial Debt", fmt(p.financial_debt)],
    ["Financial Debt Amount", fmt(p.financial_debt_amount)],
    ["Arrested", fmt(p.arrested)],
    ["Arrested Times", fmt(p.arrested_times)],
    ["Fined for Drunken Drive", fmt(p.fined_drunken_drive)],
    ["Accident Under Influence", fmt(p.accident_under_influence)],
    ["Assault", fmt(p.assault)],
    ["Incident Description", fmt(p.incident_description)],
    ["Action Taken on Incident", fmt(p.incident_action)],
  ];
  y = addSection(doc, "6. Occupational & Legal History", occupationalRows, y);
  y = checkPageBreak(y);

  // ── 7. Past Treatment History ──
  const treatmentRows = [
    ["Hospital Name", fmt(p.hospital_name)],
    ["Treatment Year", fmt(p.treatment_year)],
    ["Treatment Period", fmt(p.treatment_period)],
    ["Sober Period", fmt(p.sober_period)],
    ["Relapse Reason", fmt(p.relapse_reason)],
    ["Childhood Description", fmt(p.childhood_description)],
    ["Childhood Experience", fmt(p.childhood_experience)],
    ["Behavior Problems", fmt(p.behavior_problems)],
    ["Education Achievements", fmt(p.education_achievements)],
    ["Education Years", fmt(p.education_years)],
    ["Religious Belief", fmt(p.religious_belief)],
    ["Psychological Factors", fmt(p.psychological_factors)],
    ["Abstinence Period", fmt(p.abstinence_period)],
    ["Doctor Notes", fmt(p.doctor_notes)],
    ["Follow Up Notes", fmt(p.follow_up_notes)],
  ];
  addSection(doc, "7. Past Treatment History", treatmentRows, y);

  // ── Footer on all pages ──
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${totalPages}  |  Generated: ${new Date().toLocaleString("en-IN")}  |  KLE Centenary Charitable Hospital, Belgaum`,
      105,
      doc.internal.pageSize.height - 6,
      { align: "center" }
    );
    doc.setDrawColor(200);
    doc.setLineWidth(0.3);
    doc.line(14, doc.internal.pageSize.height - 9, 196, doc.internal.pageSize.height - 9);
  }

  doc.save(`KLE_Patient_${p.name || formatPatientId(p.patientId)}_${new Date().toISOString().split("T")[0]}.pdf`);
};
