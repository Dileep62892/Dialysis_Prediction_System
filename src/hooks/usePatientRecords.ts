import { useState, useEffect } from 'react';
import { PatientData } from '../types/health';

export const usePatientRecords = () => {
  const [records, setRecords] = useState<PatientData[]>(() => {
    const saved = localStorage.getItem('patientRecords');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('patientRecords', JSON.stringify(records));
  }, [records]);

  const addRecord = (record: PatientData) => {
    setRecords(prev => [record, ...prev]);
  };

  const updateRecord = (updatedRecord: PatientData) => {
    setRecords(prev => prev.map(record => 
      record.id === updatedRecord.id ? updatedRecord : record
    ));
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  return {
    records,
    addRecord,
    updateRecord,
    deleteRecord
  };
};