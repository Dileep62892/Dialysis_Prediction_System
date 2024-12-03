import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import PatientForm from './PatientForm';
import AnalysisResult from './AnalysisResult';
import HealthMarkersAnalysis from './HealthMarkersAnalysis';
import KidneyHealthDashboard from './KidneyHealthDashboard';
import PatientHistory from './PatientHistory';
import { useAuthState } from '../hooks/useAuthState';
import { auth } from '../utils/auth';
import { PatientData } from '../types/health';
import { usePatientStore } from '../store/patientStore';

const Dashboard = () => {
  const { user } = useAuthState();
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const addPatient = usePatientStore(state => state.addPatient);

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  const handleFormSubmit = (data: PatientData) => {
    if (user) {
      const patientWithUser = {
        ...data,
        userId: user.id,
        date: new Date().toISOString()
      };
      setPatientData(patientWithUser);
      addPatient(patientWithUser);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dialysis Prediction System</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user.email}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <PatientForm onSubmit={handleFormSubmit} />
          {patientData && (
            <>
              <AnalysisResult patientData={patientData} />
              <HealthMarkersAnalysis patientData={patientData} />
              <KidneyHealthDashboard patientData={patientData} />
              <PatientHistory userId={user.id} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;