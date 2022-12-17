import patientData from '../../data/patients';

import { NewPatient, NonSensitivePatient, Patient } from '../types';

import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientData;

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ssn, ...keepProperties}) => keepProperties);
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

const addPatient = (
  entry: NewPatient
): Patient => {
  
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  findById
};