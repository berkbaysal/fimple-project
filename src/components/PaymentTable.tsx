import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material';
import { useResultsContext } from '../context/ResultsContext';
import { formatCurrency } from '../static/util';

interface IProps {
  headers: string[];
}

const PaymentTable = ({ headers }: IProps) => {
  const paymentTable = useResultsContext().paymentTable;

  return (
    <TableContainer sx={{ height: 'min(800px,80vh)', scrollbarWidth: 'thin', m: 3, marginLeft: 4, width: 'auto', borderRadius: 'rem' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell align="right" sx={{ color: '#145cc6', fontWeight: '700', borderBottom: '2px solid #145cc6' }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{ scrollbarWidth: 'thin' }}>
          {paymentTable.map((installment, index) => {
            return (
              <TableRow>
                <TableCell align="right">{index + 1}</TableCell>
                <TableCell align="right">{formatCurrency(installment.payment)}&nbsp;₺</TableCell>
                <TableCell align="right">{formatCurrency(installment.principalPayment)}&nbsp;₺</TableCell>
                <TableCell align="right">{formatCurrency(installment.remainingPrincipal)}&nbsp;₺</TableCell>
                <TableCell align="right">{formatCurrency(installment.interestPayment)}&nbsp;₺</TableCell>
                <TableCell align="right">{formatCurrency(installment.kkdfPayment)}&nbsp;₺</TableCell>
                <TableCell align="right">{formatCurrency(installment.bsmvPayment)}&nbsp;₺</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentTable;
