import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material';
import { useResultsContext } from '../context/ResultsContext';

interface IProps {
  headers: string[];
}

const PaymentTable = ({ headers }: IProps) => {
  const paymentTable = useResultsContext().paymentTable;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell align="right">{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{ maxHeight: 800 }}>
          {paymentTable.map((installment, index) => {
            return (
              <TableRow>
                <TableCell align="right">{index + 1}</TableCell>
                <TableCell align="right">{installment.payment}</TableCell>
                <TableCell align="right">{installment.principalPayment}</TableCell>
                <TableCell align="right">{installment.remainingPrincipal}</TableCell>
                <TableCell align="right">{installment.interestPayment}</TableCell>
                <TableCell align="right">{installment.kkdfPayment}</TableCell>
                <TableCell align="right">{installment.bsmvPayment}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentTable;
