import { PatientData } from '../types/health';

export const calculateGFR = (patientData: PatientData): number => {
  const { age, creatinine } = patientData;
  // CKD-EPI equation for eGFR
  const k = 0.7; // female
  const a = -0.329;
  const gfr = 141 * Math.min(creatinine / k, 1) ** a * 
              Math.max(creatinine / k, 1) ** -1.209 * 
              0.993 ** age;
  return Math.round(gfr);
};

export const assessDialysisRisk = (patientData: PatientData): {
  needsDialysis: boolean;
  severity: 'Normal' | 'Mild' | 'Moderate' | 'Severe' | 'Critical';
  recommendations: string[];
} => {
  const gfr = calculateGFR(patientData);
  const { creatinine, potassium, bun } = patientData;

  const needsDialysis = 
    creatinine > 4.0 ||
    gfr < 15 ||
    potassium > 6.0 ||
    bun > 100;

  let severity: 'Normal' | 'Mild' | 'Moderate' | 'Severe' | 'Critical' = 'Normal';
  
  if (gfr < 15 || creatinine > 4.0 || potassium > 6.0 || bun > 100) {
    severity = 'Critical';
  } else if (gfr < 30 || creatinine > 3.0 || potassium > 5.5 || bun > 80) {
    severity = 'Severe';
  } else if (gfr < 45 || creatinine > 2.0 || potassium > 5.0 || bun > 60) {
    severity = 'Moderate';
  } else if (gfr < 60 || creatinine > 1.5 || potassium > 4.5 || bun > 40) {
    severity = 'Mild';
  }

  const recommendations = [
    'Monitor fluid intake and output',
    'Follow a kidney-friendly diet',
    'Take prescribed medications regularly',
    'Regular blood pressure monitoring',
    'Exercise as tolerated',
    'Monitor BUN levels through regular blood tests',
    'Control protein intake as per medical advice',
    'Regular potassium level monitoring'
  ];

  return { needsDialysis, severity, recommendations };
};