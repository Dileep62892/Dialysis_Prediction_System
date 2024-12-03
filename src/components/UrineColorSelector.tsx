import React, { useState } from 'react';
import { UrineColor } from '../types/health';
import { urineAnalysisData } from '../utils/urineAnalysis';

interface Props {
  value: UrineColor;
  onChange: (color: UrineColor) => void;
}

const UrineColorSelector: React.FC<Props> = ({ value, onChange }) => {
  const [showDetails, setShowDetails] = useState<UrineColor | null>(null);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Urine Color
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(urineAnalysisData).map(([color, analysis]) => (
          <div
            key={color}
            className={`relative bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
              value === color ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => onChange(color as UrineColor)}
            onMouseEnter={() => setShowDetails(color as UrineColor)}
            onMouseLeave={() => setShowDetails(null)}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-full border-2 border-gray-200"
                style={{
                  backgroundColor: getColorCode(color as UrineColor),
                }}
              />
              <h4 className="font-medium text-gray-900">{formatColorName(color)}</h4>
            </div>
            
            {showDetails === color && (
              <div className="absolute z-10 left-0 right-0 top-full mt-2 p-4 bg-white rounded-lg shadow-xl animate-fade-in">
                <p className="font-medium text-gray-900 mb-2">{analysis.indication}</p>
                <p className="text-sm text-gray-600">{analysis.interpretation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const getColorCode = (color: UrineColor): string => {
  const colorMap: Record<UrineColor, string> = {
    clear: '#f8fafc',
    lightYellow: '#fef9c3',
    darkYellow: '#fbbf24',
    brown: '#92400e',
    pink: '#fecdd3',
    cloudy: '#e5e7eb',
    green: '#86efac',
    foamy: '#f1f5f9',
    cola: '#451a03'
  };
  return colorMap[color];
};

const formatColorName = (color: string): string => {
  return color
    .replace(/([A-Z])/g, ' $1')
    .split(/(?=[A-Z])/)
    .join(' ')
    .replace(/^./, str => str.toUpperCase());
};

export default UrineColorSelector;