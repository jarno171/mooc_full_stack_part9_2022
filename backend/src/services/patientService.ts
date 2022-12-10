import patientData from '../../data/patients.json';

import { NonSensitivePatientEntry, PatientEntry } from '../types';

const patients: Array<PatientEntry> = patientData;

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
  return patients.map(({ssn, ...keepProperties}) => keepProperties);
};

const addDiagnose = () => {
  return null;
};

export default {
  getNonSensitiveEntries,
  addDiagnose
};