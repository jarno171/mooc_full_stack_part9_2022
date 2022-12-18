import React from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, addVisitedPatient } from "../state";
import Entries from './Entries';
import { Button } from "@material-ui/core";
import AddEntryModal from '../AddPatientModal/AddEntryModal';
import { EntryFormValues } from '../AddPatientModal/AddEntryModal/AddEntryForm';

const PatientPage = () => {

  const [{ patients, visitedPatients }, dispatch] = useStateValue();
  const [patientInfo, setPatientInfo] = React.useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
  const submitNewEntry = async (values: EntryFormValues) => {
    if (!id) {
      return;
    }

    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      const patientToAddEntry: Patient = patients[id];
      patientToAddEntry.entries.push(newEntry);

      setPatientInfo(patientToAddEntry);
      dispatch(addVisitedPatient(patientToAddEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const fetchPatientInfo = async () => {
      if (id) {
        try {
          const { data: patientInfo } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );

          setPatientInfo(patientInfo);
          dispatch(addVisitedPatient(patientInfo));
        } catch (e) {
          console.error(e);
        }
      }
  };

  React.useEffect(() => {

    const currentVisitedPatient = Object.values(patients).find((patient) => patient.id === id);

    const visited = visitedPatients.find((visitedId) => visitedId === id);

    if (!visited) {
      void fetchPatientInfo();
    } else if (currentVisitedPatient) {
      setPatientInfo(currentVisitedPatient);
    }
  }, [id]);

  if (patientInfo) {
    return (
      <div>
        <h2>{patientInfo.name} ({patientInfo.gender})</h2>
        <p>ssn: {patientInfo.ssn}</p>
        <p>occupation: {patientInfo.occupation}</p>
        <h3>entries</h3>
        <Entries entries={patientInfo.entries} />
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        Loading
      </div>
    );
  }
};

export default PatientPage;