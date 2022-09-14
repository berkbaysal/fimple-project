import PercentInput from './PercentInput';
import IntegerInput from './IntegerInput';
import DropDownInput from './DropDownInput';
import MoneyInput from './MoneyInput';
import style from '../styles/InputForm.module.css';
import { useUserInputsContext } from '../context/UserInputsContext';
import { Switch } from '@mui/material';
import { useDisabledComponentsContext } from '../context/DisabledComponentsContext';
import AdvancedToggle from './AdvancedToggle';

const PAYMENT_INTERVAL_ARRAY = [
  { displayText: 'Haftalık', value: 7 },
  { displayText: 'Aylık', value: 30 },
  { displayText: 'Yıllık', value: 365 },
];
const COMPOUND_INTERVAL_ARRAY = [{ displayText: 'Günlük', value: 7 }, ...PAYMENT_INTERVAL_ARRAY];

const InputForm = () => {
  const userInputs = useUserInputsContext();
  const disabledContext = useDisabledComponentsContext();
  return (
    // <Switch value={disabledContext.isDisabled} onChange={(e) => disabledContext.setIsDisabled(e.target.checked)} />
    <div className={style.inputFormContainer}>
      <div className={style.inputFieldsContainer}>
        <div className={style.basicInterestSection}>
          <div className={style.twoCellWhitespace}></div>
          <MoneyInput value={userInputs.principal} onChange={(e) => userInputs.setPrincipal(e.target.value)} label="Ana Para" />
          <PercentInput
            value={userInputs.interestRate}
            onChange={(e) => userInputs.setInterestRate(e.target.value)}
            label="Kar oranı"
            helperText="(Aylık)"
          />
          <IntegerInput
            value={userInputs.numberOfInstallments}
            onChange={(e) => userInputs.setNumberOfInstallments(e.target.value)}
            label="Taksit Sayısı"
          />
          <DropDownInput
            value={userInputs.paymentInterval}
            optionsArray={PAYMENT_INTERVAL_ARRAY}
            label="Taksit Aralığı"
            onChange={(e) => userInputs.setPaymentInterval(e.target.value)}
          />
          <PercentInput value={userInputs.kkdfRate} onChange={(e) => userInputs.setKkdfRate(e.target.value)} label="KKDF Oranı" />
          <PercentInput value={userInputs.bsmvRate} onChange={(e) => userInputs.setBsmvRate(e.target.value)} label="BSMV Oranı" />
        </div>
        <div className={style.compoundInterestSection}>
          <AdvancedToggle label="Bileşik Faiz" />
          <DropDownInput
            value={userInputs.paymentInterval}
            optionsArray={PAYMENT_INTERVAL_ARRAY}
            label="Taksit Aralığı"
            onChange={(e) => userInputs.setPaymentInterval(e.target.value)}
            controlled
          />
          <DropDownInput
            value={userInputs.paymentInterval}
            optionsArray={PAYMENT_INTERVAL_ARRAY}
            label="Taksit Aralığı"
            onChange={(e) => userInputs.setPaymentInterval(e.target.value)}
            controlled
          />
        </div>
      </div>
    </div>
  );
};

export default InputForm;
