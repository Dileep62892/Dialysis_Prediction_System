import React from 'react';
import { Activity, Heart, Gauge, Thermometer } from 'lucide-react';
import { PatientData } from '../types/health';
import { referenceRanges } from '../utils/referenceRanges';

interface Props {
  patientData: PatientData;
}

const HealthMarkersAnalysis: React.FC<Props> = ({ patientData }) => {
  const getAgeGroup = (age: number) => {
    if (age < 13) return 0;
    if (age >= 60) return 2;
    return 1;
  };

  const calculateDeviation = (value: number, min: number, max: number) => {
    const midpoint = (min + max) / 2;
    return ((value - midpoint) / midpoint) * 100;
  };

  const getSeverityLevel = (deviation: number): {
    level: string;
    color: string;
  } => {
    const absDeviation = Math.abs(deviation);
    if (absDeviation > 50) return { level: 'Critical', color: 'text-red-600 bg-red-100' };
    if (absDeviation > 30) return { level: 'Severe', color: 'text-orange-600 bg-orange-100' };
    if (absDeviation > 20) return { level: 'Moderate', color: 'text-yellow-600 bg-yellow-100' };
    if (absDeviation > 10) return { level: 'Mild', color: 'text-blue-600 bg-blue-100' };
    return { level: 'Normal', color: 'text-green-600 bg-green-100' };
  };

  const ageGroup = getAgeGroup(patientData.age);
  const ranges = referenceRanges[ageGroup];

  const markers = [
    {
      name: 'Creatinine',
      value: patientData.creatinine,
      range: ranges.creatinine,
      unit: 'mg/dL',
      icon: <Activity className="w-5 h-5" />
    },
    {
      name: 'GFR',
      value: patientData.gfr,
      range: ranges.gfr,
      unit: 'mL/min/1.73m²',
      icon: <Gauge className="w-5 h-5" />
    },
    {
      name: 'BUN',
      value: patientData.bun,
      range: ranges.bun,
      unit: 'mg/dL',
      icon: <Thermometer className="w-5 h-5" />
    },
    {
      name: 'Potassium',
      value: patientData.potassium,
      range: ranges.potassium,
      unit: 'mEq/L',
      icon: <Heart className="w-5 h-5" />
    }
  ];

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Health Markers Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {markers.map((marker) => {
          const deviation = calculateDeviation(marker.value, marker.range.min, marker.range.max);
          const { level, color } = getSeverityLevel(deviation);

          return (
            <div key={marker.name} className="bg-white rounded-lg shadow p-4 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {marker.icon}
                  <h3 className="font-semibold">{marker.name}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${color}`}>
                  {level}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">
                  {marker.value} {marker.unit}
                </p>
                <p className="text-sm text-gray-600">
                  Normal range: {marker.range.min}-{marker.range.max} {marker.unit}
                </p>
                <p className="text-sm">
                  Deviation: {deviation.toFixed(1)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HealthMarkersAnalysis;