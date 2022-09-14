import PercentInput from './PercentInput';
import DropDownInput from './DropDownInput';
import { useUserInputsContext } from '../context/UserInputsContext';
import { Switch } from '@mui/material';
import { useDisabledComponentsContext } from '../context/DisabledComponentsContext';

const InputForm = () => {
  const userInputs = useUserInputsContext();
  const disabledContext = useDisabledComponentsContext();
  return (
    <div>
      <PercentInput value={userInputs.interestRate} onChange={(e) => userInputs.setInterestRate(e.target.value)} label="interest" controlled />
      <Switch value={disabledContext.isDisabled} onChange={(e) => disabledContext.setIsDisabled(e.target.checked)} />
    </div>
  );
};

export default InputForm;
