import { 
  NewPatient,
  Gender,
  NewEntry,
  NewBaseEntry, 
  HealthCheckRating, 
  Discharge, 
  SickLeave, 
  HealthCheckEntryType,
  HospitalEntryType,
  OccupationalHealthcareEntryType
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatient => {
    const newEntry: NewPatient = {
      name: parseName(name),
      dateOfBirth: parseDate(dateOfBirth),
      ssn: parseSSN(ssn),
      gender: parseGender(gender),
      occupation: parseOccupation(occupation),
      entries: []
    };

  return newEntry;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};

const isHealthCheckEntryType = (text: unknown): text is HealthCheckEntryType => {
  return text === "HealthCheck";
};

const isHospitalEntryType = (text: unknown): text is HospitalEntryType => {
  return text === "Hospital";
};

const isOccupationalHealthcareEntryType = (text: unknown): text is OccupationalHealthcareEntryType => {
  return text === "OccupationalHealthcare";
};

const parseHealthCheckType = (type: unknown): HealthCheckEntryType => {
  if (!type || !isHealthCheckEntryType(type)) {
    throw new Error('Incorrect or missing type');
  }

  return type;
};

const parseHospitalEntryType = (type: unknown): HospitalEntryType => {
  if (!type || !isHospitalEntryType(type)) {
    throw new Error('Incorrect or missing type');
  }

  return type;
};

const parseOccupationalHealthcareEntryType = (type: unknown): OccupationalHealthcareEntryType => {
  if (!type || !isOccupationalHealthcareEntryType(type)) {
    throw new Error('Incorrect or missing type');
  }

  return type;
};

// https://stackoverflow.com/questions/49813443/type-guards-for-types-of-arrays
const isStringArray = (stringArray: unknown): stringArray is Array<string> => {
  if (!Array.isArray(stringArray)) {
    return false;
  }

  if (stringArray.some((item) => typeof item !== "string")) {
    return false;
  }

  return true;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<string> | undefined => {
  if ((!diagnosisCodes || !isStringArray(diagnosisCodes)) && !(diagnosisCodes === undefined)) {
    throw new Error('Incorrect or missing string array of diagnosis codes');
  }

  return diagnosisCodes;
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {

  if ((!healthCheckRating && !(healthCheckRating === 0)) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating');
  }

  return healthCheckRating;
};

// https://stackoverflow.com/questions/49707327/typescript-check-if-property-in-object-in-typesafe-way
const hasOwnProperty = <T, K extends PropertyKey>(object: unknown, property: string): object is T & Record<K, unknown> => {
  return Object.prototype.hasOwnProperty.call(object, property);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  if (!hasOwnProperty(param, 'date') || !hasOwnProperty(param, 'criteria')) {
    return false;
  }

  if (!param.date || !isString(param.date)) {
    return false;
  }

  if (!param.criteria || !isString(param.criteria)) {
    return false;
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
  if (!hasOwnProperty(param, 'startDate') || !hasOwnProperty(param, 'endDate')) {
    return false;
  }

  if (!param.startDate || !isString(param.startDate)) {
    return false;
  }

  if (!param.endDate || !isString(param.endDate)) {
    return false;
  }

  return true;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }

  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }

  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sickleave');
  }

  return sickLeave;
};

type CommonEntryFields = {
  description: unknown,
  date: unknown,
  specialist: unknown,
  diagnosisCodes: unknown,
};

type HealthCheckFields = {
  type: unknown,
  healthCheckRating: unknown
};

type HospitalFields = {
  type: unknown,
  discharge: unknown
};

type OccupationalHealthcareFields = {
  type: unknown,
  employerName: unknown,
  sickLeave: unknown
};

const parseCommonEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
}: CommonEntryFields): NewBaseEntry => {
  return {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
  };
};

const parseHealthCheckEntry = ({
  type,
  healthCheckRating
}: HealthCheckFields) => {
  return {
    type: parseHealthCheckType(type),
    healthCheckRating: parseHealthCheckRating(healthCheckRating)
  };
};

const parseHospitalEntry = ({
  type,
  discharge
}: HospitalFields) => {
  return {
    type: parseHospitalEntryType(type),
    discharge: parseDischarge(discharge)
  };
};

const parseOccupationalHealthcareEntry = ({
  type,
  employerName,
  sickLeave
}: OccupationalHealthcareFields) => {
  return {
    type: parseOccupationalHealthcareEntryType(type),
    employerName: parseEmployerName(employerName),
    sickLeave: parseSickLeave(sickLeave)
  };
};

const toNewHealthCheckEntry = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  healthCheckRating
}: HealthCheckFields & CommonEntryFields): NewEntry => {
  return {
    ...parseCommonEntry({
      description,
      date,
      specialist,
      diagnosisCodes
    }),
    ...parseHealthCheckEntry({
      type,
      healthCheckRating
    })
  };
};

const toNewHospitalEntry = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  discharge
}: CommonEntryFields & HospitalFields): NewEntry => {
  return {
    ...parseCommonEntry({
      description,
      date,
      specialist,
      diagnosisCodes
    }),
    ...parseHospitalEntry({
      type,
      discharge
    })
  };
};

const toNewOccupationalHealthcare = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  employerName,
  sickLeave
}: CommonEntryFields & OccupationalHealthcareFields): NewEntry => {
  return {
    ...parseCommonEntry({
      description,
      date,
      specialist,
      diagnosisCodes
    }),
    ...parseOccupationalHealthcareEntry({
      type,
      employerName,
      sickLeave
    })
  };
};

export const toNewEntry = ({ 
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  discharge,
  healthCheckRating,
  employerName,
  sickLeave
 }: CommonEntryFields & HealthCheckFields & HospitalFields & OccupationalHealthcareFields): NewEntry => {

  if (!type || !isString(type)) {
    throw new Error('Type is not a string');
  }

  switch(type) {
    case "HealthCheck":
      return toNewHealthCheckEntry({
        type,
        description,
        date,
        specialist,
        diagnosisCodes,
        healthCheckRating
      });
    case "Hospital":
      return toNewHospitalEntry({
        type,
        description,
        date,
        specialist,
        diagnosisCodes,
        discharge
      });
    case "OccupationalHealthcare":
      return toNewOccupationalHealthcare({
        type,
        description,
        date,
        specialist,
        diagnosisCodes,
        employerName,
        sickLeave
      });
    default:
      throw new Error('Type has wrong value');
  }
};