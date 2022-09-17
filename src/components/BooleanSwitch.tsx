import { FormControl, FormControlLabel, Switch } from '@mui/material';

interface IProps {
  label?: string; //optional label for input field
  styleOverride?: React.CSSProperties; //override MUI inline/default styling
  value: boolean; //controling react state
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; //callback function to handle change
}

const DEFAULT_COMPONENT_STYLE = { marginLeft: '1rem' };

const BooleanSwitch = ({ label, styleOverride, value, onChange }: IProps) => {
  return (
    <FormControl sx={{ ...DEFAULT_COMPONENT_STYLE, ...styleOverride }}>
      <FormControlLabel control={<Switch value={value} onChange={(e) => onChange(e)} />} label={label} />
    </FormControl>
  );
};

export default BooleanSwitch;
