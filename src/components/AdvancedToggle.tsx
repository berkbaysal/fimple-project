import { FormControl, FormControlLabel, Switch } from '@mui/material';
import { useDisabledComponentsContext } from '../context/DisabledComponentsContext';

interface IProps {
  label?: string; //optional label for input field
  styleOverride?: React.CSSProperties; //override MUI inline/default styling
}

const DEFAULT_COMPONENT_STYLE = { marginLeft: '1rem' };

const AdvancedToggle = ({ label, styleOverride }: IProps) => {
  const disabledContext = useDisabledComponentsContext();
  return (
    <FormControl sx={{ ...DEFAULT_COMPONENT_STYLE, ...styleOverride }}>
      <FormControlLabel
        control={<Switch value={disabledContext.isDisabled} onChange={(e) => disabledContext.setIsDisabled(e.target.checked)} />}
        label={label}
      />
    </FormControl>
  );
};

export default AdvancedToggle;
