import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { PatientData } from '../types/health';
import { assessDialysisRisk } from '../utils/calculations';

interface Props {
  patientData: PatientData;
}

const AnalysisResult: React.FC<Props> = ({ patientData }) => {
  const { needsDialysis, severity, recommendations } = assessDialysisRisk(patientData);
  
  return (
    <div className={`mt-6 p-6 rounded-lg shadow-md result-section ${
      needsDialysis ? 'bg-red-50' : 'bg-green-50'
    }`}>
      <div className="flex items-center gap-3 mb-4 animate-pulse-slow">
        {needsDialysis ? (
          <AlertTriangle className="w-8 h-8 text-red-500" />
        ) : (
          <CheckCircle className="w-8 h-8 text-green-500" />
        )}
        <h3 className={`text-xl font-semibold ${
          needsDialysis ? 'text-red-700' : 'text-green-700'
        }`}>
          {needsDialysis
            ? 'Sorry, your parameters are abnormal'
            : 'Yahoo! Your parameters are normal'
          }
        </h3>
      </div>
      
      <div className="mb-4">
        <p className={`text-lg ${needsDialysis ? 'text-red-600' : 'text-green-600'}`}>
          {needsDialysis
            ? 'You may need dialysis in the future. Please follow these recommendations carefully:'
            : 'Keep maintaining these healthy habits:'}
        </p>
      </div>

      <ul className="space-y-2">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-center gap-2 animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            <span className="text-gray-700">{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalysisResult;