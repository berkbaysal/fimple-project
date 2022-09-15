import { FormControl, FormControlLabel, Switch } from '@mui/material';

interface IProps {
  label?: string; //optional label for input field
  styleOverride?: React.CSSProperties; //override MUI inline/default styling
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DEFAULT_COMPONENT_STYLE = { marginLeft: '1rem' };

const AdvancedToggle = ({ label, styleOverride, value, onChange }: IProps) => {
  return (
    <FormControl sx={{ ...DEFAULT_COMPONENT_STYLE, ...styleOverride }}>
      <FormControlLabel control={<Switch value={value} onChange={(e) => onChange(e)} />} label={label} />
    </FormControl>
  );
};

export default AdvancedToggle;
