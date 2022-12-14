import { Entry } from '../types';

const Entries = ({ entries }: { entries: Entry[] }) => {
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