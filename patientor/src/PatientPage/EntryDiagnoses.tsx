import { useStateValue } from "../state";

const Diagnoses: React.FC<{ diagnosisCodes: string[] | undefined }> = ({ diagnosisCodes }) => {

  const [{ diagnoses },] = useStateValue();

  const nameForDiagnosis = (code: string): string => {
    if (diagnoses[code]) {
      return diagnoses[code].name;
    } else {
      return "no diagnosis name found";
    }
  };

  return (
    <ul>
      {diagnosisCodes?.map((diagnosis) => (
        <li key={diagnosis}>
          {diagnosis}: {nameForDiagnosis(diagnosis)}
        </li>
      ))}
    </ul>
  );
};

export default Diagnoses;