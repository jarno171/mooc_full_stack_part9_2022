import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import Work from '@material-ui/icons/Work';
import EntryDiagnoses from './EntryDiagnoses';

const OccupationalHealthcareEntryDisplay: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <>
      <p>{entry.date} <Work /></p>
      <p>{entry.description}</p>
      <p>diagnosed by {entry.specialist}</p>
      <EntryDiagnoses diagnosisCodes={entry.diagnosisCodes} />
    </>
  );
};

export default OccupationalHealthcareEntryDisplay;