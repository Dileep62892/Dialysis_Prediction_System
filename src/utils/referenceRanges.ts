import { ReferenceRanges } from '../types/health';

export const referenceRanges: ReferenceRanges[] = [
  {
    ageGroup: 'Children (2-12)',
    creatinine: { min: 0.3, max: 0.7 },
    bun: { min: 5, max: 18 },
    gfr: { min: 90, max: 140 },
    potassium: { min: 3.3, max: 4.6 },
    systolicBP: { min: 90, max: 110 },
    diastolicBP: { min: 60, max: 75 }
  },
  {
    ageGroup: 'Adults (13-59)',
    creatinine: { min: 0.7, max: 1.3 },
    bun: { min: 7, max: 20 },
    gfr: { min: 90, max: 120 },
    potassium: { min: 3.5, max: 5.0 },
    systolicBP: { min: 90, max: 120 },
    diastolicBP: { min: 60, max: 80 }
  },
  {
    ageGroup: 'Elderly (60+)',
    creatinine: { min: 0.6, max: 1.2 },
    bun: { min: 8, max: 23 },
    gfr: { min: 60, max: 90 },
    potassium: { min: 3.5, max: 5.0 },
    systolicBP: { min: 100, max: 130 },
    diastolicBP: { min: 65, max: 85 }
  }
];