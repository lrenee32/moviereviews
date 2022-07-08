import { FunctionComponent } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { capitalize } from '../../utils/utils';

interface Props {
  columns: Array<any>,
  rows: Array<any>,
  actions?: Array<any>,
};

export const GenericTable: FunctionComponent<Props> = (props: Props) => {
  const { columns, rows, actions } = props;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => {
              return (
                <TableCell key={index}>{capitalize(column.text)}</TableCell>
              );
            })}
            {(actions && actions.length > 0) &&
              <TableCell style={{width: '1px', whiteSpace: 'nowrap'}}/>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            return (
              <TableRow key={index}>
                {columns.map((column, cIndex) => {
                  return (
                    <TableCell key={cIndex}>{row[column.text]}</TableCell>
                  );
                })}
                <TableCell style={{width: '1px', whiteSpace: 'nowrap'}}>
                  {(actions && actions.length > 0) && actions}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};