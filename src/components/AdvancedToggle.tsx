import { FormControl, FormControlLabel, Switch } from '@mui/material';
import { useDisabledComponentsContext } from '../context/DisabledComponentsContext';

interface IProps {
  label?: string; //optional label for input field
  styleOverride?: React.CSSProperties; //override MUI inline/default styling
}

const AdvancedToggle = ({ label, styleOverride }: IProps) => {
  const disabledContext = useDisabledComponentsContext();
  return (
    <FormControl sx={{ m: 1, ...styleOverride }}>
      <FormControlLabel
        control={<Switch value={disabledContext.isDisabled} onChange={(e) => disabledContext.setIsDisabled(e.target.checked)} />}
        label={label}
      />
    </FormControl>
  );
};

export default AdvancedToggle;
