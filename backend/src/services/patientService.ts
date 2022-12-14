import patientData from '../../data/patients';

import { NewPatientEntry, NonSensitivePatientEntry, Patient } from '../types';

import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientData;

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ssn, ...keepProperties}) => keepProperties);
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

const addPatient = (
  entry: NewPatientEntry
): Patient => {
  
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  findById
};