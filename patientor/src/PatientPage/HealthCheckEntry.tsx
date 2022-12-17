import React from 'react';
import { HealthCheckEntry } from '../types';
import LocalHospital from '@material-ui/icons/LocalHospital';
import HealthCheckIcon from './HealthCheckIcon';
import EntryDiagnoses from './EntryDiagnoses';

const HealthCheckEntryDisplay: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {

  return (
    <>
      <p>{entry.date}<LocalHospital /></p>
      <p>{entry.description}</p>
      <HealthCheckIcon rating={entry.healthCheckRating} />
      <EntryDiagnoses diagnosisCodes={entry.diagnosisCodes} />
    </>
  );
};

export default HealthCheckEntryDisplay;