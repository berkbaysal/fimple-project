import style from '../styles/ResultDisplay.module.css';
import { useEffect } from 'react';
import { useResultsContext } from '../context/ResultsContext';
import { getTotalPayment, getPaymentPerInstallment, getTotalKkdf, getTotalBsmv } from '../static/util';

const ResultDisplay = () => {
  const results = useResultsContext();
  let totalPayment = getTotalPayment(results.paymentTable);
  let paymentPerInstallment = getPaymentPerInstallment(results.paymentTable);
  let totalBsmv = getTotalBsmv(results.paymentTable);
  let totalKkdf = getTotalKkdf(results.paymentTable);

  useEffect(() => {
    totalPayment = getTotalPayment(results.paymentTable);
    paymentPerInstallment = getPaymentPerInstallment(results.paymentTable);
    totalBsmv = getTotalBsmv(results.paymentTable);
    totalKkdf = getTotalKkdf(results.paymentTable);
  }, [results.paymentTable]);

  return (
    <div className={style.resultsDisplay}>
      <div className={style.title}>Ödeme Tutarları:</div>
      <div className={style.subtitle}>Toplam geri ödeme:</div>
      <div className={style.valueDisplay}>{(totalPayment ? totalPayment : 0) + ' ₺'}</div>
      <div className={style.subtitle}>Aylık taksit tutarı:</div>
      <div className={style.valueDisplay}>{(paymentPerInstallment ? paymentPerInstallment : 0) + ' ₺'}</div>
      <div className={style.title}>Vergi tutarları:</div>
      <div className={style.subtitle}>KKDF tutarı:</div>
      <div className={style.valueDisplay}>{(totalKkdf ? totalKkdf : 0) + ' ₺'}</div>
      <div className={style.subtitle}>BSMV tutarı:</div>
      <div className={style.valueDisplay}>{(totalBsmv ? totalBsmv : 0) + ' ₺'}</div>
      <div className={style.subtitle}>Toplam vergiler:</div>
      <div className={style.valueDisplay}>{(totalKkdf && totalBsmv ? (parseFloat(totalKkdf) + parseFloat(totalBsmv)).toFixed(2) : 0) + ' ₺'}</div>
    </div>
  );
};

export default ResultDisplay;
