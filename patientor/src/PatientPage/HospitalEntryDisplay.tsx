import React from 'react';
import { HospitalEntry } from '../types';
import Healing from '@material-ui/icons/Healing';
import EntryDiagnoses from './EntryDiagnoses';

const HospitalEntryDisplay: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <>
      <p>{entry.date} <Healing /></p>
      <p>{entry.description}</p>
      <EntryDiagnoses diagnosisCodes={entry.diagnosisCodes} />
    </>
  );
};

export default HospitalEntryDisplay;