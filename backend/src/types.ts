export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string,
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
  Other = "other",
  Male = "male",
  Female = "female"
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare"
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface HealthCheckEntryType {
  type: "HealthCheck";
}

export interface HospitalEntryType {
  type: "Hospital";
}

export interface OccupationalHealthcareEntryType {
  type: "OccupationalHealthcare";
}

export interface HealthCheckEntry extends BaseEntry {
  type: HealthCheckEntryType;
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: HospitalEntryType;
  discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: OccupationalHealthcareEntryType;
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


// copied from the material 
// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewBaseEntry = Omit<BaseEntry, 'id'>;
export type NewEntry = UnionOmit<Entry, 'id'>;