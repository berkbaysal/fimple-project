import { useEffect } from 'react';
import { useResultsContext } from '../context/ResultsContext';
import { getTotalPayment } from '../static/util';

const ResultDisplay = () => {
  const results = useResultsContext();
  let totalPayment = getTotalPayment(results.paymentTable);

  useEffect(() => {
    totalPayment = getTotalPayment(results.paymentTable);
  }, [results.paymentTable]);

  return <div>{totalPayment}</div>;
};

export default ResultDisplay;
