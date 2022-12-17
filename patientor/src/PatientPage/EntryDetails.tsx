import React from 'react';

import { Entry } from '../types';
import { assertNever } from '../utils';
import HospitalEntry from './HospitalEntryDisplay';
import HealthCheckEntry from './HealthCheckEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntryDisplay';

const EntryDetails: React.FC<{ entry: Entry}> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={ entry } />;
    case "HealthCheck":
      return <HealthCheckEntry entry={ entry } />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={ entry } />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;