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

const PAYMENT_INTERVAL_ARRAY = [
  { displayText: 'Haftalık', value: 7 },
  { displayText: 'Aylık', value: 30 },
  { displayText: 'Yıllık', value: 365 },
];
const COMPOUND_INTERVAL_ARRAY = [{ displayText: 'Günlük', value: 1 }, ...PAYMENT_INTERVAL_ARRAY];

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

  const principalRef = useRef<CustomComponentRef>(null);
  const interestRateRef = useRef<CustomComponentRef>(null);
  const interestRatePeriodRef = useRef<CustomComponentRef>(null);
  const numberOfInstallmentsRef = useRef<CustomComponentRef>(null);
  const paymentIntervalRef = useRef<CustomComponentRef>(null);
  const kkdfRateRef = useRef<CustomComponentRef>(null);
  const bsmvRateRef = useRef<CustomComponentRef>(null);

  const compoundingPeriodRef = useRef<CustomComponentRef>(null);

  const refArray = [principalRef, interestRateRef, interestRatePeriodRef, numberOfInstallmentsRef, paymentIntervalRef, kkdfRateRef, bsmvRateRef];

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
      <div className={style.inputRow}>
        <MoneyInput
          value={userInputs.principal}
          onChange={(e) => userInputs.setPrincipal(e.target.value)}
          label="Ana Para"
          styleOverride={{ width: '100%' }}
          ref={principalRef}
        />
      </div>
      <div className={style.inputRow}>
        <PercentInput
          value={userInputs.interestRate}
          onChange={(e) => userInputs.setInterestRate(e.target.value)}
          label="Kar oranı"
          ref={interestRateRef}
        />
        <DropDownInput
          value={userInputs.interestRatePeriod}
          optionsArray={PAYMENT_INTERVAL_ARRAY}
          label="Oran Cinsi"
          onChange={(e) => userInputs.setInterestRatePeriod(e.target.value)}
          ref={interestRatePeriodRef}
        />
      </div>
      <div className={style.inputRow}>
        <IntegerInput
          value={userInputs.numberOfInstallments}
          onChange={(e) => userInputs.setNumberOfInstallments(e.target.value)}
          label="Taksit Sayısı"
          ref={numberOfInstallmentsRef}
        />
        <DropDownInput
          value={userInputs.paymentInterval}
          optionsArray={PAYMENT_INTERVAL_ARRAY}
          label="Taksit Aralığı"
          onChange={(e) => {
            userInputs.setPaymentInterval(e.target.value);
            userInputs.setCompoundingPeriod('');
          }}
          ref={paymentIntervalRef}
        />
      </div>
      <div className={style.inputRow}>
        <PercentInput value={userInputs.kkdfRate} onChange={(e) => userInputs.setKkdfRate(e.target.value)} label="KKDF Oranı" ref={kkdfRateRef} />
        <PercentInput value={userInputs.bsmvRate} onChange={(e) => userInputs.setBsmvRate(e.target.value)} label="BSMV Oranı" ref={bsmvRateRef} />
      </div>
      <div className={style.inputRow}>
        <BooleanSwitch
          label="Faiz Aralığı*"
          value={userInputs.complexCompoundingEnabled}
          onChange={(e) => userInputs.setComplexCompoundingEnabled(e.target.checked)}
        />
        <DropDownInput
          value={userInputs.compoundingPeriod}
          optionsArray={COMPOUND_INTERVAL_ARRAY.filter((item) => item.value <= parseInt(userInputs.paymentInterval))}
          label="Faiz Aralığı*"
          onChange={(e) => userInputs.setCompoundingPeriod(e.target.value)}
          disabled={!userInputs.complexCompoundingEnabled}
          ref={compoundingPeriodRef}
        />
      </div>
      <div className={style.inputRow}>
        <Button
          variant="contained"
          sx={{ width: '80%', margin: 'auto', marginTop: '2rem' }}
          onClick={() => {
            if (validateAll()) {
              results.setPaymentTable(constructPaymentTable(userInputs));
              resultDisplayRef.current.scrollIntoView();
              console.log(typeof resultDisplayRef);
            }
          }}
        >
          Ödemeyi Hesapla
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
          Ödeme Planı Oluştur
        </Button>
      </div>
    </div>
  );
});

export default InputForm;
