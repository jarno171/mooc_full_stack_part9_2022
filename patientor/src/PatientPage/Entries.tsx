import { Entry } from '../types';
import { useStateValue } from "../state";

const Entries = ({ entries }: { entries: Entry[] }) => {
  const [{ diagnoses },] = useStateValue();

  // continue from here
  console.log(diagnoses);

  return (
    <>
    {entries.map((entry) => (
      <div key={entry.id}>
        {entry.date} <i>{entry.description}</i>
        <ul>
          {entry.diagnosisCodes?.map((diagnosis) => (
            <li key={diagnosis}>
              {diagnosis}
            </li>
          ))}
        </ul>
      </div>
    ))}
    </>
  );
};

export default Entries;