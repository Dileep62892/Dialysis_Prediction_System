export interface HealthMarker {
  name: string;
  value: number;
  minRange: number;
  maxRange: number;
  unit: string;
}

export interface PatientData {
  id: string;
  userId: string;
  name: string;
  age: number;
  creatinine: number;
  bun: number;
  potassium: number;
  hasDiabetes: boolean;
  systolicBP: number;
  diastolicBP: number;
  gfr: number;
  urineColor: UrineColor;
  date: string;
}

export type UrineColor = 
  | 'clear'
  | 'lightYellow'
  | 'darkYellow'
  | 'brown'
  | 'pink'
  | 'cloudy'
  | 'green'
  | 'foamy'
  | 'cola';

export interface UrineAnalysis {
  color: UrineColor;
  indication: string;
  interpretation: string;
}

export interface ReferenceRanges {
  ageGroup: string;
  creatinine: { min: number; max: number };
  bun: { min: number; max: number };
  gfr: { min: number; max: number };
  potassium: { min: number; max: number };
  systolicBP: { min: number; max: number };
  diastolicBP: { min: number; max: number };
}

export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
}