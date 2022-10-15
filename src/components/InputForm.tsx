import PercentInput from './PercentInput';
import IntegerInput from './IntegerInput';
import DropDownInput from './DropDownInput';
import MoneyInput from './MoneyInput';
import style from '../styles/InputForm.module.css';
import { useUserInputsContext } from '../context/UserInputsContext';
import BooleanSwitch from './BooleanSwitch';
import { Button } from '@mui/material';
import { constructPaymentTable } from '../static/util';
import { useResultsContext } from '../context/ResultsContext';
import { forwardRef, useRef } from 'react';
import content from '../static/localization';
import { useLocalizationContext } from '../context/LocalizationContext';

interface CustomComponentRef {
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
}

interface IProps {
  setTableVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputForm = forwardRef(({ setTableVisible }: IProps, resultDisplayRef: any) => {
  const userInputs = useUserInputsContext();
  const results = useResultsContext();
  const lang = useLocalizationContext().localization;

  //create arrays to define intervals for paying and compounding
  const PAYMENT_INTERVAL_ARRAY = [
    { displayText: content[lang].timeIntervals.weekly, value: 7 },
    { displayText: content[lang].timeIntervals.monthly, value: 30 },
    { displayText: content[lang].timeIntervals.yearly, value: 365 },
  ];
  const COMPOUND_INTERVAL_ARRAY = [{ displayText: content[lang].timeIntervals.daily, value: 1 }, ...PAYMENT_INTERVAL_ARRAY];

  //Define refs for all required fields.

  const principalRef = useRef<CustomComponentRef>(null);
  const interestRateRef = useRef<CustomComponentRef>(null);
  const interestRatePeriodRef = useRef<CustomComponentRef>(null);
  const numberOfInstallmentsRef = useRef<CustomComponentRef>(null);
  const paymentIntervalRef = useRef<CustomComponentRef>(null);
  const kkdfRateRef = useRef<CustomComponentRef>(null);
  const bsmvRateRef = useRef<CustomComponentRef>(null);

  //define refs for optional fields.

  const compoundingPeriodRef = useRef<CustomComponentRef>(null);

  //put all required refs in an array for easier processing.

  const refArray = [
    principalRef,
    interestRateRef,
    interestRatePeriodRef,
    numberOfInstallmentsRef,
    paymentIntervalRef,
    kkdfRateRef,
    bsmvRateRef,
  ];

  //validate all fields, set internal error states.

  function validateAll() {
    let allFieldsValid = true;

    refArray.forEach((ref) => {
      if (ref.current?.value === '') {
        ref.current.setError(true);
        allFieldsValid = false;
      }
    });

    if (interestRateRef.current?.value === '0') {
      interestRateRef.current.setError(true);
      allFieldsValid = false;
    }

    if (userInputs.complexCompoundingEnabled && compoundingPeriodRef.current?.value === '') {
      compoundingPeriodRef.current.setError(true);
      allFieldsValid = false;
    }

    return allFieldsValid;
  }
  return (
    <div className={style.inputFormContainer}>
      {/* Input Field for Principal Loan */}
      <div className={style.inputRow}>
        <MoneyInput
          value={userInputs.principal}
          onChange={(e) => userInputs.setPrincipal(e.target.value)}
          label={content[lang].principal}
          styleOverride={{ width: '100%' }}
          ref={principalRef}
        />
      </div>

      {/* Input Fields for Interest*/}
      <div className={`${style.inputRow} ${style.headingRow}`}>{content[lang].interest}:</div>
      <div className={style.inputRow}>
        <PercentInput
          value={userInputs.interestRate}
          onChange={(e) => userInputs.setInterestRate(e.target.value)}
          label={content[lang].rate}
          ref={interestRateRef}
        />
        <DropDownInput
          value={userInputs.interestRatePeriod}
          optionsArray={PAYMENT_INTERVAL_ARRAY}
          label={content[lang].period}
          onChange={(e) => userInputs.setInterestRatePeriod(e.target.value)}
          ref={interestRatePeriodRef}
        />
      </div>

      {/* Input Fields for Installments*/}
      <div className={`${style.inputRow} ${style.headingRow}`}>{content[lang].installments}:</div>
      <div className={style.inputRow}>
        <IntegerInput
          value={userInputs.numberOfInstallments}
          onChange={(e) => userInputs.setNumberOfInstallments(e.target.value)}
          label={content[lang].count}
          ref={numberOfInstallmentsRef}
        />
        <DropDownInput
          value={userInputs.paymentInterval}
          optionsArray={PAYMENT_INTERVAL_ARRAY}
          label={content[lang].period}
          onChange={(e) => {
            userInputs.setPaymentInterval(e.target.value);
            userInputs.setCompoundingPeriod('');
          }}
          ref={paymentIntervalRef}
        />
      </div>

      {/* Input Fields for Taxes*/}
      <div className={`${style.inputRow} ${style.headingRow}`}>{content[lang].taxes}:</div>
      <div className={style.inputRow}>
        <PercentInput
          value={userInputs.kkdfRate}
          onChange={(e) => userInputs.setKkdfRate(e.target.value)}
          label={content[lang].kkdfRate}
          ref={kkdfRateRef}
        />
        <PercentInput
          value={userInputs.bsmvRate}
          onChange={(e) => userInputs.setBsmvRate(e.target.value)}
          label={content[lang].bsmvRate}
          ref={bsmvRateRef}
        />
      </div>

      {/* Input Fields for Complex Compounding*/}
      <div className={`${style.inputRow} ${style.headingRow}`}>{content[lang].complexCompounding}:</div>
      <div className={style.inputRow}>
        <BooleanSwitch
          label={content[lang].enable}
          value={userInputs.complexCompoundingEnabled}
          onChange={(e) => userInputs.setComplexCompoundingEnabled(e.target.checked)}
        />
        <DropDownInput
          value={userInputs.compoundingPeriod}
          optionsArray={COMPOUND_INTERVAL_ARRAY.filter((item) => item.value <= parseInt(userInputs.paymentInterval))}
          label={content[lang].period}
          onChange={(e) => userInputs.setCompoundingPeriod(e.target.value)}
          disabled={!userInputs.complexCompoundingEnabled}
          ref={compoundingPeriodRef}
        />
      </div>

      {/* Submit Buttons*/}
      <div className={style.inputRow}>
        <Button
          variant="contained"
          sx={{ width: '80%', margin: 'auto', marginTop: '2rem' }}
          onClick={() => {
            if (validateAll()) {
              results.setPaymentTable(constructPaymentTable(userInputs));
              resultDisplayRef.current.scrollIntoView();
            }
          }}
        >
          {content[lang].calculatePayment}
        </Button>
      </div>
      <div className={style.inputRow}>
        <Button
          variant="contained"
          sx={{ width: '80%', margin: 'auto' }}
          onClick={() => {
            if (validateAll()) {
              results.setPaymentTable(constructPaymentTable(userInputs));
              setTableVisible(true);
            }
          }}
        >
          {content[lang].createPaymentPlan}
        </Button>
      </div>
    </div>
  );
});

export default InputForm;
