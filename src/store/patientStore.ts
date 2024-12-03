import { create } from 'zustand';
import { PatientData } from '../types/health';

interface PatientStore {
  currentPatient: PatientData | null;
  patientHistory: PatientData[];
  setCurrentPatient: (patient: PatientData | null) => void;
  addPatient: (patient: PatientData) => void;
  loadPatientHistory: (userId: string) => void;
  deletePatient: (patientId: string) => void;
  updatePatient: (patient: PatientData) => void;
}

const STORAGE_KEY = 'dialysis_app_patient_history';

export const usePatientStore = create<PatientStore>((set) => ({
  currentPatient: null,
  patientHistory: [],
  
  setCurrentPatient: (patient) => set({ currentPatient: patient }),
  
  addPatient: (patient) => {
    set((state) => {
      const newHistory = [patient, ...state.patientHistory];
      localStorage.setItem(`${STORAGE_KEY}_${patient.userId}`, JSON.stringify(newHistory));
      return { patientHistory: newHistory };
    });
  },
  
  loadPatientHistory: (userId) => {
    const historyStr = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
    const history = historyStr ? JSON.parse(historyStr) : [];
    set({ patientHistory: history });
  },
  
  deletePatient: (patientId) => {
    set((state) => {
      const patient = state.patientHistory.find(p => p.id === patientId);
      if (!patient) return state;

      const newHistory = state.patientHistory.filter(p => p.id !== patientId);
      localStorage.setItem(`${STORAGE_KEY}_${patient.userId}`, JSON.stringify(newHistory));
      return { patientHistory: newHistory };
    });
  },
  
  updatePatient: (patient) => {
    set((state) => {
      const newHistory = state.patientHistory.map(p => 
        p.id === patient.id ? patient : p
      );
      localStorage.setItem(`${STORAGE_KEY}_${patient.userId}`, JSON.stringify(newHistory));
      return { patientHistory: newHistory };
    });
  }
}));