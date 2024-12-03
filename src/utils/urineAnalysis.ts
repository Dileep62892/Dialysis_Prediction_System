import { UrineColor, UrineAnalysis } from '../types/health';

export const urineAnalysisData: Record<UrineColor, UrineAnalysis> = {
  clear: {
    color: 'clear',
    indication: 'Healthy kidneys, good hydration.',
    interpretation: 'Normal kidney function and well-hydrated state. No concern for kidney disease.'
  },
  lightYellow: {
    color: 'lightYellow',
    indication: 'Normal hydration, possible mild dehydration.',
    interpretation: 'Kidney function is likely normal, but hydration could be slightly low. Drink more water.'
  },
  darkYellow: {
    color: 'darkYellow',
    indication: 'Dehydration, more concentrated urine.',
    interpretation: 'The kidneys are conserving water. Dehydration may be present. No immediate kidney concern, but hydration should be improved.'
  },
  brown: {
    color: 'brown',
    indication: 'Possible liver or kidney issues, hematuria, or muscle injury.',
    interpretation: 'May suggest kidney or liver problems, hematuria (blood in urine), or muscle breakdown (myoglobinuria). If persistent, kidney function should be evaluated.'
  },
  pink: {
    color: 'pink',
    indication: 'Hematuria (blood in urine), food or medication-related.',
    interpretation: 'Could be caused by blood in the urine (e.g., kidney stones, infection), certain foods (e.g., beets), or medications. Blood in the urine requires further evaluation for kidney damage or disease.'
  },
  cloudy: {
    color: 'cloudy',
    indication: 'Possible infection, kidney stones, or protein in the urine.',
    interpretation: 'Cloudy urine can indicate urinary tract infections (UTIs), kidney stones, or high protein levels. Potential sign of kidney dysfunction; should be evaluated.'
  },
  green: {
    color: 'green',
    indication: 'Infection, medications, or food dyes.',
    interpretation: 'Usually caused by medications or food dyes. Rarely, infections may cause this color. Kidney function should be assessed if associated with other symptoms.'
  },
  foamy: {
    color: 'foamy',
    indication: 'Proteinuria (excess protein in urine), kidney disease.',
    interpretation: 'Persistent foam could be a sign of kidney disease or damage, as it may indicate proteinuria. Further tests should be done to assess kidney function.'
  },
  cola: {
    color: 'cola',
    indication: 'Severe kidney damage, muscle injury (rhabdomyolysis), hematuria.',
    interpretation: 'This color may indicate severe kidney damage or muscle injury leading to myoglobin in the urine. Immediate medical attention is necessary, as dialysis may be required.'
  }
};

export const getUrineAnalysis = (color: UrineColor): UrineAnalysis => {
  return urineAnalysisData[color];
};