import React, { useEffect } from 'react';
import { Trash2, Download, Calendar } from 'lucide-react';
import { PatientData } from '../types/health';
import { usePatientStore } from '../store/patientStore';
import { generatePDF } from '../utils/pdfGenerator';

interface Props {
  userId: string;
}

const PatientHistory: React.FC<Props> = ({ userId }) => {
  const { patientHistory, loadPatientHistory, deletePatient } = usePatientStore();

  useEffect(() => {
    if (userId) {
      loadPatientHistory(userId);
    }
  }, [userId, loadPatientHistory]);

  const handleDownload = async (record: PatientData) => {
    await generatePDF(record);
  };

  // Filter records for current user
  const userRecords = patientHistory.filter(record => record.userId === userId);

  if (!userRecords || userRecords.length === 0) {
    return (
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Patient History</h3>
        <p className="text-gray-600">No records found.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Patient History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GFR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creatinine</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BUN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potassium</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urine Color</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diabetes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      {new Date(record.date).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.gfr}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.creatinine}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.bun}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.potassium}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.systolicBP}/{record.diastolicBP}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.urineColor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.hasDiabetes ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDownload(record)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deletePatient(record.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;