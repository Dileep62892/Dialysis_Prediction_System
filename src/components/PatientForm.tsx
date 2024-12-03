import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { PatientData } from '../types/health';
import { referenceRanges } from '../utils/referenceRanges';
import { urineAnalysisData } from '../utils/urineAnalysis';

interface Props {
  onSubmit: (data: PatientData) => void;
}

const PatientForm: React.FC<Props> = ({ onSubmit }) => {
  const [showHelp, setShowHelp] = useState(false);
  const [formData, setFormData] = useState<Partial<PatientData>>({
    hasDiabetes: false,
    urineColor: 'clear'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit({
        ...formData,
        id: Date.now().toString(),
        date: new Date().toISOString()
      } as PatientData);
      setFormData({ hasDiabetes: false, urineColor: 'clear' });
    }
  };

  const isFormValid = () => {
    return formData.name && 
           formData.age && 
           formData.creatinine && 
           formData.gfr &&
           formData.bun &&
           formData.potassium &&
           formData.systolicBP &&
           formData.diastolicBP;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Patient Information</h2>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="text-gray-500 hover:text-gray-700"
        >
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>

      {showHelp && (
        <div className="mb-6 p-4 bg-blue-50 rounded-md animate-fade-in">
          <h3 className="font-semibold mb-4">Health Markers Reference Guide:</h3>
          
          {/* Health Markers Section */}
          <div className="space-y-4 mb-6">
            {referenceRanges.map((range, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-2">{range.ageGroup}</h4>
                <ul className="space-y-2 text-sm">
                  <li>💉 Creatinine: {range.creatinine.min}-{range.creatinine.max} mg/dL</li>
                  <li>🔬 BUN: {range.bun.min}-{range.bun.max} mg/dL</li>
                  <li>📊 GFR: {range.gfr.min}-{range.gfr.max} mL/min/1.73m²</li>
                  <li>⚡ Potassium: {range.potassium.min}-{range.potassium.max} mEq/L</li>
                  <li>❤️ Blood Pressure: {range.systolicBP.min}/{range.diastolicBP.min} - {range.systolicBP.max}/{range.diastolicBP.max} mmHg</li>
                </ul>
              </div>
            ))}
          </div>

          {/* Urine Color Interpretation Section */}
          <div className="mt-6">
            <h4 className="font-semibold mb-4">🌈 Urine Color Interpretation:</h4>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(urineAnalysisData).map(([color, analysis]) => (
                <div key={color} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-gray-200"
                      style={{
                        backgroundColor: 
                          color === 'clear' ? '#f8fafc' :
                          color === 'lightYellow' ? '#fef9c3' :
                          color === 'darkYellow' ? '#fbbf24' :
                          color === 'brown' ? '#92400e' :
                          color === 'pink' ? '#fecdd3' :
                          color === 'cloudy' ? '#e5e7eb' :
                          color === 'green' ? '#86efac' :
                          color === 'foamy' ? '#f1f5f9' :
                          '#451a03' // cola
                      }}
                    />
                    <h5 className="font-medium text-gray-900">
                      {color.replace(/([A-Z])/g, ' $1').split(/(?=[A-Z])/).join(' ').replace(/^./, str => str.toUpperCase())}
                    </h5>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">{analysis.indication}</p>
                  <p className="text-sm text-gray-600">{analysis.interpretation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            value={formData.age || ''}
            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">GFR (mL/min/1.73m²)</label>
          <input
            type="number"
            value={formData.gfr || ''}
            onChange={(e) => setFormData({ ...formData, gfr: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Creatinine (mg/dL)</label>
          <input
            type="number"
            step="0.1"
            value={formData.creatinine || ''}
            onChange={(e) => setFormData({ ...formData, creatinine: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">BUN (mg/dL)</label>
          <input
            type="number"
            value={formData.bun || ''}
            onChange={(e) => setFormData({ ...formData, bun: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Potassium (mEq/L)</label>
          <input
            type="number"
            step="0.1"
            value={formData.potassium || ''}
            onChange={(e) => setFormData({ ...formData, potassium: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Pressure</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Systolic"
              value={formData.systolicBP || ''}
              onChange={(e) => setFormData({ ...formData, systolicBP: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Diastolic"
              value={formData.diastolicBP || ''}
              onChange={(e) => setFormData({ ...formData, diastolicBP: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Urine Color</label>
          <select
            value={formData.urineColor}
            onChange={(e) => setFormData({ ...formData, urineColor: e.target.value as any })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="clear">Clear</option>
            <option value="lightYellow">Light Yellow</option>
            <option value="darkYellow">Dark Yellow</option>
            <option value="brown">Brown</option>
            <option value="pink">Pink</option>
            <option value="cloudy">Cloudy</option>
            <option value="green">Green</option>
            <option value="foamy">Foamy</option>
            <option value="cola">Cola</option>
          </select>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.hasDiabetes}
              onChange={(e) => setFormData({ ...formData, hasDiabetes: e.target.checked })}
              className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Diabetes Status</span>
          </label>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Analyze
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;