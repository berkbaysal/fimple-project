import style from '../styles/ResultDisplay.module.css';
import { forwardRef, useEffect } from 'react';
import { useResultsContext } from '../context/ResultsContext';
import { getTotalPayment, getPaymentPerInstallment, getTotalKkdf, getTotalBsmv, formatCurrency } from '../static/util';
import { useLocalizationContext } from '../context/LocalizationContext';
import content from '../static/localization';

const ResultDisplay = forwardRef<HTMLDivElement>((props, ref) => {
  const results = useResultsContext();
  let totalPayment = getTotalPayment(results.paymentTable);
  let paymentPerInstallment = getPaymentPerInstallment(results.paymentTable);
  let totalBsmv = getTotalBsmv(results.paymentTable);
  let totalKkdf = getTotalKkdf(results.paymentTable);
  const lang = useLocalizationContext().localization;

  useEffect(() => {}, [results.paymentTable]); //re-render results when payment table is updated.

  const currency = '₺'; //Currency localization can be added as a future improvement by attaching a state to this variable

  return (
    <div className={style.resultsDisplay} ref={ref}>
      {/* Top Highlight Section */}
      <div className={style.highlightSection}>
        <div className={style.highlightTitle}>{content[lang].monthlyPayment}:</div>
        <div className={style.highlightValueDisplay}>
          {paymentPerInstallment ? formatCurrency(paymentPerInstallment) : 0}
          &nbsp;{currency}
        </div>
      </div>
      {/* Bottom Section */}
      <div className={style.detailSection}>
        <div className={style.row}>
          <div className={`${style.title} ${style.emphasize}`}>{content[lang].totalPayment}:</div>
          <div className={`${style.valueDisplay} ${style.emphasize}`}>
            {totalPayment ? formatCurrency(totalPayment) : 0}&nbsp;{currency}
          </div>
        </div>
        <hr />
        <div className={style.row}>
          <div className={style.title}>{content[lang].kkdfAmount}:</div>
          <div className={style.valueDisplay}>
            {totalKkdf ? formatCurrency(totalKkdf) : 0}&nbsp;{currency}
          </div>
        </div>
        <div className={style.row}>
          <div className={style.title}>{content[lang].bsmvAmount}:</div>
          <div className={style.valueDisplay}>
            {totalBsmv ? formatCurrency(totalBsmv) : 0}&nbsp;{currency}
          </div>
        </div>
        <div className={style.row}>
          <div className={`${style.title} ${style.emphasize}`}>{content[lang].totalTaxes}:</div>
          <div className={`${style.valueDisplay} ${style.emphasize}`}>
            {totalKkdf && totalBsmv ? formatCurrency((parseFloat(totalKkdf) + parseFloat(totalBsmv)).toFixed(2)) : 0}&nbsp;
            {currency}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ResultDisplay;
