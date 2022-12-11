import patientData from '../../data/patients.json';

import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';

import { v1 as uuid } from 'uuid';

const patients: Array<PatientEntry> = patientData;

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ssn, ...keepProperties}) => keepProperties);
};

const addPatient = (
  entry: NewPatientEntry
): PatientEntry => {
  
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient
};