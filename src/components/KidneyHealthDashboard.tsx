import React from 'react';
import { Activity, AlertTriangle, TrendingUp, Heart } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { PatientData } from '../types/health';
import { calculateGFR } from '../utils/calculations';
import { referenceRanges } from '../utils/referenceRanges';

interface Props {
  patientData: PatientData;
}

const KidneyHealthDashboard: React.FC<Props> = ({ patientData }) => {
  const gfr = calculateGFR(patientData);
  const ageGroup = patientData.age < 13 ? 0 : patientData.age >= 60 ? 2 : 1;
  const ranges = referenceRanges[ageGroup];

  const healthMarkers = [
    {
      name: 'Creatinine',
      value: patientData.creatinine,
      minRange: ranges.creatinine.min,
      maxRange: ranges.creatinine.max,
      unit: 'mg/dL'
    },
    {
      name: 'eGFR',
      value: gfr,
      minRange: ranges.gfr.min,
      maxRange: ranges.gfr.max,
      unit: 'mL/min/1.73m²'
    },
    {
      name: 'BUN',
      value: patientData.bun,
      minRange: ranges.bun.min,
      maxRange: ranges.bun.max,
      unit: 'mg/dL'
    },
    {
      name: 'Potassium',
      value: patientData.potassium,
      minRange: ranges.potassium.min,
      maxRange: ranges.potassium.max,
      unit: 'mEq/L'
    }
  ];

  const getSeverityLevel = (value: number, min: number, max: number) => {
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

  const getStatusColor = (severity: string) => {
    switch (severity) {
      case 'Critical High':
      case 'Critical Low':
        return 'text-red-600 bg-red-100';
      case 'Severe High':
      case 'Severe Low':
        return 'text-orange-600 bg-orange-100';
      case 'Moderate High':
      case 'Moderate Low':
        return 'text-yellow-600 bg-yellow-100';
      case 'Mild High':
      case 'Mild Low':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  const getDeviationPercentage = (value: number, min: number, max: number) => {
    const midpoint = (min + max) / 2;
    const deviation = ((value - midpoint) / midpoint) * 100;
    return deviation.toFixed(1);
  };

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Health Markers Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMarkers.map((marker) => {
          const severity = getSeverityLevel(marker.value, marker.minRange, marker.maxRange);
          const deviation = getDeviationPercentage(marker.value, marker.minRange, marker.maxRange);
          
          return (
            <div key={marker.name} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-700">{marker.name}</h3>
                {severity !== 'Normal' && (
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="text-2xl font-bold mb-1">
                {marker.value} {marker.unit}
              </div>
              <div className="text-sm text-gray-500">
                Normal range: {marker.minRange} - {marker.maxRange} {marker.unit}
              </div>
              <div className={`mt-2 px-2 py-1 rounded-full text-sm font-medium inline-block ${getStatusColor(severity)}`}>
                {severity} ({deviation}% deviation)
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Dialysis Indicators</h3>
        <div className="space-y-4">
          <div className={`p-3 rounded-lg ${patientData.creatinine > 4.0 ? 'bg-red-100' : 'bg-green-100'}`}>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              <span className="font-medium">Creatinine Level</span>
            </div>
            <p className="mt-1 text-sm">
              {patientData.creatinine > 4.0 
                ? 'High creatinine levels indicate potential need for dialysis'
                : 'Creatinine levels are within manageable range'}
            </p>
          </div>

          <div className={`p-3 rounded-lg ${gfr < 15 ? 'bg-red-100' : 'bg-green-100'}`}>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">GFR Status</span>
            </div>
            <p className="mt-1 text-sm">
              {gfr < 15
                ? 'Low GFR indicates kidney failure requiring dialysis'
                : 'GFR indicates adequate kidney function'}
            </p>
          </div>

          <div className={`p-3 rounded-lg ${patientData.potassium > 6.0 ? 'bg-red-100' : 'bg-green-100'}`}>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Potassium Level</span>
            </div>
            <p className="mt-1 text-sm">
              {patientData.potassium > 6.0
                ? 'High potassium levels require immediate attention'
                : 'Potassium levels are within safe range'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidneyHealthDashboard;