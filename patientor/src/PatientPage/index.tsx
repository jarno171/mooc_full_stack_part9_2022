import React from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

import { isEmpty } from 'lodash';

import { Patient } from "../types";

import { apiBaseUrl } from "../constants";

import { useStateValue } from "../state";

const PatientPage = () => {

  const [{ visitedPatients }, dispatch] = useStateValue();

  const [patientInfo, setPatientInfo] = React.useState<Patient | null>(null);

  const { id } = useParams<{ id: string }>();

  const fetchPatientInfo = async () => {
      if (id) {
        try {
          const { data: patientInfo } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );

          setPatientInfo(patientInfo);
          dispatch({ type: "ADD_VISITED_PATIENT", payload: patientInfo });
        } catch (e) {
          console.error(e);
        }
      }
  };

  React.useEffect(() => {

    if (!id) {
      return;
    }

    let currentVisitedPatient: Patient | undefined;

    if (!isEmpty(visitedPatients)) {
      currentVisitedPatient = Object.values(visitedPatients).find((patient) => patient.id === id);
    }

    if (!currentVisitedPatient) {
      void fetchPatientInfo();
    } else {
      setPatientInfo(currentVisitedPatient);
    }
  }, [id]);

  if (patientInfo) {
    return (
      <div>
        <h2>{patientInfo.name} ({patientInfo.gender})</h2>
        <p>ssn: {patientInfo.ssn}</p>
        <p>occupation: {patientInfo.occupation}</p>
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