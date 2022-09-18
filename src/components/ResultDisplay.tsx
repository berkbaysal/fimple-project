import style from '../styles/ResultDisplay.module.css';
import { forwardRef, useEffect } from 'react';
import { useResultsContext } from '../context/ResultsContext';
import { getTotalPayment, getPaymentPerInstallment, getTotalKkdf, getTotalBsmv, formatCurrency } from '../static/util';

const ResultDisplay = forwardRef<HTMLDivElement>((props, ref) => {
  const results = useResultsContext();
  let totalPayment = getTotalPayment(results.paymentTable);
  let paymentPerInstallment = getPaymentPerInstallment(results.paymentTable);
  let totalBsmv = getTotalBsmv(results.paymentTable);
  let totalKkdf = getTotalKkdf(results.paymentTable);

  useEffect(() => {}, [results.paymentTable]); //re-render results when payment table is updated.

  const currency = '₺'; //Currency localization can be added as a future improvement by attaching a state to this variable

  return (
    <div className={style.resultsDisplay} ref={ref}>
      {/* Top Highlight Section */}
      <div className={style.highlightSection}>
        <div className={style.highlightTitle}>Aylık taksit tutarı:</div>
        <div className={style.highlightValueDisplay}>
          {paymentPerInstallment ? formatCurrency(paymentPerInstallment) : 0}
          &nbsp;{currency}
        </div>
      </div>
      {/* Bottom Section */}
      <div className={style.detailSection}>
        <div className={style.row}>
          <div className={`${style.title} ${style.emphasize}`}>Toplam geri ödeme:</div>
          <div className={`${style.valueDisplay} ${style.emphasize}`}>
            {totalPayment ? formatCurrency(totalPayment) : 0}&nbsp;{currency}
          </div>
        </div>
        <hr />
        <div className={style.row}>
          <div className={style.title}>KKDF tutarı:</div>
          <div className={style.valueDisplay}>
            {totalKkdf ? formatCurrency(totalKkdf) : 0}&nbsp;{currency}
          </div>
        </div>
        <div className={style.row}>
          <div className={style.title}>BSMV tutarı:</div>
          <div className={style.valueDisplay}>
            {totalBsmv ? formatCurrency(totalBsmv) : 0}&nbsp;{currency}
          </div>
        </div>
        <div className={style.row}>
          <div className={`${style.title} ${style.emphasize}`}>Toplam vergiler:</div>
          <div className={`${style.valueDisplay} ${style.emphasize}`}>
            {totalKkdf && totalBsmv ? formatCurrency((parseFloat(totalKkdf) + parseFloat(totalBsmv)).toFixed(2)) : 0}&nbsp;{currency}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ResultDisplay;
