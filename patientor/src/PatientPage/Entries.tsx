import { Entry } from '../types';
import EntryDetails from './EntryDetails';

import { Table } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableBody } from "@material-ui/core";

const Entries = ({ entries }: { entries: Entry[] }) => {
  return (
    <>
      <Table>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>
                <EntryDetails entry={ entry } />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Entries;