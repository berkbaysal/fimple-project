import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material';
import { useResultsContext } from '../context/ResultsContext';
import { formatCurrency } from '../static/util';

interface IProps {
  headers: string[];
}

const PaymentTable = ({ headers }: IProps) => {
  const paymentTable = useResultsContext().paymentTable;

  const currency = '₺'; //Currency localization can be added as a future improvement by attaching a state to this variable

  return (
    <TableContainer sx={{ m: 3, marginLeft: 4, width: 'auto', height: '100%', scrollbarWidth: 'thin' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell align="right" sx={{ color: '#145cc6', fontWeight: '700', borderBottom: '2px solid #145cc6' }} key={header}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{ scrollbarWidth: 'thin', overflow: 'scroll' }}>
          {paymentTable.map((installment, index) => {
            return (
              <TableRow key={index}>
                <TableCell align="right">{index + 1}</TableCell>
                <TableCell align="right">
                  {formatCurrency(installment.payment)}&nbsp;{currency}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(installment.principalPayment)}&nbsp;{currency}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(installment.remainingPrincipal)}&nbsp;{currency}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(installment.interestPayment)}&nbsp;{currency}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(installment.kkdfPayment)}&nbsp;{currency}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(installment.bsmvPayment)}&nbsp;{currency}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentTable;
