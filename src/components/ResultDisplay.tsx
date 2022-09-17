import style from '../styles/ResultDisplay.module.css';
import { forwardRef, useEffect } from 'react';
import { useResultsContext } from '../context/ResultsContext';
import { getTotalPayment, getPaymentPerInstallment, getTotalKkdf, getTotalBsmv, formatCurrency } from '../static/util';

const ResultDisplay = forwardRef(({}, ref: React.Ref<HTMLDivElement>) => {
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
    <div className={style.resultsDisplay} ref={ref}>
      <div className={style.highlightSection}>
        <div className={style.highlightTitle}>Aylık taksit tutarı:</div>
        <div className={style.highlightValueDisplay}>{(paymentPerInstallment ? formatCurrency(paymentPerInstallment) : 0) + ' ₺'}</div>
      </div>
      <div className={style.detailSection}>
        <div className={style.row}>
          <div className={`${style.title} ${style.emphasize}`}>Toplam geri ödeme:</div>
          <div className={`${style.valueDisplay} ${style.emphasize}`}>{(totalPayment ? formatCurrency(totalPayment) : 0) + ' ₺'}</div>
        </div>
        <hr />
        <div className={style.row}>
          <div className={style.title}>KKDF tutarı:</div>
          <div className={style.valueDisplay}>{(totalKkdf ? formatCurrency(totalKkdf) : 0) + ' ₺'}</div>
        </div>
        <div className={style.row}>
          <div className={style.title}>BSMV tutarı:</div>
          <div className={style.valueDisplay}>{(totalBsmv ? formatCurrency(totalBsmv) : 0) + ' ₺'}</div>
        </div>
        <div className={style.row}>
          <div className={`${style.title} ${style.emphasize}`}>Toplam vergiler:</div>
          <div className={`${style.valueDisplay} ${style.emphasize}`}>
            {(totalKkdf && totalBsmv ? formatCurrency((parseFloat(totalKkdf) + parseFloat(totalBsmv)).toFixed(2)) : 0) + ' ₺'}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ResultDisplay;
