import PercentInput from './PercentInput';
import IntegerInput from './IntegerInput';
import DropDownInput from './DropDownInput';
import MoneyInput from './MoneyInput';
import style from '../styles/InputForm.module.css';
import { useUserInputsContext } from '../context/UserInputsContext';
import AdvancedToggle from './AdvancedToggle';
import { Button } from '@mui/material';

const PAYMENT_INTERVAL_ARRAY = [
  { displayText: 'Haftalık', value: 7 },
  { displayText: 'Aylık', value: 30 },
  { displayText: 'Yıllık', value: 365 },
];
const COMPOUND_INTERVAL_ARRAY = [{ displayText: 'Günlük', value: 7 }, ...PAYMENT_INTERVAL_ARRAY];

const InputForm = () => {
  const userInputs = useUserInputsContext();
  return (
    <div className={style.inputFormContainer}>
      <div className={style.inputRow}>
        <MoneyInput
          value={userInputs.principal}
          onChange={(e) => userInputs.setPrincipal(e.target.value)}
          label="Ana Para"
          helperText="Türk lirası cinsinden borç verilen ana para"
          styleOverride={{ width: '100%' }}
        />
      </div>
      <div className={style.inputRow}>
        <PercentInput value={userInputs.interestRate} onChange={(e) => userInputs.setInterestRate(e.target.value)} label="Kar oranı" />
        <DropDownInput
          value={userInputs.paymentInterval}
          optionsArray={PAYMENT_INTERVAL_ARRAY}
          label="Oran Cinsi"
          onChange={(e) => userInputs.setPaymentInterval(e.target.value)}
        />
      </div>
      <div className={style.inputRow}>
        <IntegerInput
          value={userInputs.numberOfInstallments}
          onChange={(e) => userInputs.setNumberOfInstallments(e.target.value)}
          label="Taksit Sayısı"
        />
        <DropDownInput
          value={userInputs.paymentInterval}
          optionsArray={PAYMENT_INTERVAL_ARRAY}
          label="Ödeme Aralığı"
          onChange={(e) => userInputs.setPaymentInterval(e.target.value)}
        />
      </div>
      <div className={style.inputRow}>
        <PercentInput value={userInputs.kkdfRate} onChange={(e) => userInputs.setKkdfRate(e.target.value)} label="KKDF Oranı" />
        <PercentInput value={userInputs.bsmvRate} onChange={(e) => userInputs.setBsmvRate(e.target.value)} label="BSMV Oranı" />
      </div>
      <div className={style.inputRow}>
        <AdvancedToggle label="Bileşik Faiz" value={userInputs.isDisabled} onChange={(e) => userInputs.setIsDisabled(e.target.checked)} />
        <DropDownInput
          value={userInputs.paymentInterval}
          optionsArray={PAYMENT_INTERVAL_ARRAY}
          label="Taksit Aralığı"
          onChange={(e) => userInputs.setPaymentInterval(e.target.value)}
          disabled={!userInputs.isDisabled}
        />
      </div>
      <div className={style.inputRow}>
        <Button variant="contained" sx={{ width: '100%', marginTop: '2rem' }}>
          Ödemeyi Hesapla
        </Button>
      </div>
      <div className={style.inputRow}>
        <Button variant="contained" sx={{ width: '100%' }}>
          Ödeme Planı Oluştur
        </Button>
      </div>
    </div>
  );
};

export default InputForm;
