import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PatientData } from '../types/health';
import { referenceRanges } from './referenceRanges';
import { urineAnalysisData } from './urineAnalysis';

export const generatePDF = (patientData: PatientData) => {
  const doc = new jsPDF();
  const ageGroup = patientData.age < 13 ? 0 : patientData.age >= 60 ? 2 : 1;
  const ranges = referenceRanges[ageGroup];
  
  // Title
  doc.setFontSize(22);
  doc.setTextColor(44, 82, 130);
  doc.text('Kidney Health Analysis Report', 20, 20);
  
  // Date
  doc.setFontSize(10);
  doc.setTextColor(102, 102, 102);
  doc.text(`Report Date: ${new Date().toLocaleString()}`, 20, 30);

  // Patient Information Table
  const patientInfo = [
    ['Patient Details', ''],
    ['Name', patientData.name],
    ['Age', `${patientData.age} years`],
    ['Date of Analysis', new Date(patientData.date).toLocaleString()],
    ['Diabetes Status', patientData.hasDiabetes ? 'Yes' : 'No']
  ];

  autoTable(doc, {
    startY: 40,
    head: [['Category', 'Details']],
    body: patientInfo,
    theme: 'striped',
    headStyles: { fillColor: [44, 82, 130] },
    styles: { fontSize: 10 }
  });

  // Health Markers Analysis
  const healthMarkers = [
    ['Health Marker', 'Current Value', 'Normal Range', 'Status'],
    [
      'GFR',
      `${patientData.gfr} mL/min/1.73m²`,
      `${ranges.gfr.min}-${ranges.gfr.max} mL/min/1.73m²`,
      getMarkerStatus(patientData.gfr, ranges.gfr.min, ranges.gfr.max)
    ],
    [
      'Creatinine',
      `${patientData.creatinine} mg/dL`,
      `${ranges.creatinine.min}-${ranges.creatinine.max} mg/dL`,
      getMarkerStatus(patientData.creatinine, ranges.creatinine.min, ranges.creatinine.max)
    ],
    [
      'BUN',
      `${patientData.bun} mg/dL`,
      `${ranges.bun.min}-${ranges.bun.max} mg/dL`,
      getMarkerStatus(patientData.bun, ranges.bun.min, ranges.bun.max)
    ],
    [
      'Potassium',
      `${patientData.potassium} mEq/L`,
      `${ranges.potassium.min}-${ranges.potassium.max} mEq/L`,
      getMarkerStatus(patientData.potassium, ranges.potassium.min, ranges.potassium.max)
    ]
  ];

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,
    head: [['Health Markers Analysis', '', '', '']],
    body: healthMarkers,
    theme: 'striped',
    headStyles: { fillColor: [44, 82, 130] },
    styles: { fontSize: 10 }
  });

  // Blood Pressure Analysis
  const bpAnalysis = [
    ['Blood Pressure Analysis', ''],
    ['Current Reading', `${patientData.systolicBP}/${patientData.diastolicBP} mmHg`],
    ['Normal Range', `${ranges.systolicBP.min}/${ranges.diastolicBP.min} - ${ranges.systolicBP.max}/${ranges.diastolicBP.max} mmHg`],
    ['Status', getBPStatus(patientData.systolicBP, patientData.diastolicBP, ranges)]
  ];

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,
    head: [['Category', 'Details']],
    body: bpAnalysis,
    theme: 'striped',
    headStyles: { fillColor: [44, 82, 130] },
    styles: { fontSize: 10 }
  });

  // Urine Analysis
  const urineAnalysis = urineAnalysisData[patientData.urineColor];
  const urineInfo = [
    ['Urine Analysis', ''],
    ['Color', formatUrineColor(patientData.urineColor)],
    ['Indication', urineAnalysis.indication],
    ['Interpretation', urineAnalysis.interpretation]
  ];

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,
    head: [['Category', 'Details']],
    body: urineInfo,
    theme: 'striped',
    headStyles: { fillColor: [44, 82, 130] },
    styles: { fontSize: 10 },
    columnStyles: {
      1: { cellWidth: 120 }
    }
  });

  // Save the PDF
  doc.save(`kidney-health-report-${patientData.name}-${new Date().toISOString().split('T')[0]}.pdf`);
};

const formatUrineColor = (color: string): string => {
  return color
    .replace(/([A-Z])/g, ' $1')
    .split(/(?=[A-Z])/)
    .join(' ')
    .replace(/^./, str => str.toUpperCase());
};

const getMarkerStatus = (value: number, min: number, max: number): string => {
  if (value < min) {
    const deviation = ((min - value) / min) * 100;
    if (deviation > 30) return 'Critical Low';
    if (deviation > 20) return 'Severe Low';
    if (deviation > 10) return 'Moderate Low';
    return 'Mild Low';
  }
  if (value > max) {
    const deviation = ((value - max) / max) * 100;
    if (deviation > 30) return 'Critical High';
    if (deviation > 20) return 'Severe High';
    if (deviation > 10) return 'Moderate High';
    return 'Mild High';
  }
  return 'Normal';
};

const getBPStatus = (
  systolic: number,
  diastolic: number,
  ranges: typeof referenceRanges[0]
): string => {
  if (systolic > ranges.systolicBP.max || diastolic > ranges.diastolicBP.max) {
    return 'High Blood Pressure';
  }
  if (systolic < ranges.systolicBP.min || diastolic < ranges.diastolicBP.min) {
    return 'Low Blood Pressure';
  }
  return 'Normal';
};