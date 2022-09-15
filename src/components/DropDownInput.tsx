import { Select, MenuItem, SelectChangeEvent, OutlinedInput, InputLabel, FormControl } from '@mui/material';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

interface IProps {
  label?: string; //optional label for initial display
  disabled?: boolean; //allow control of disabled state of the instance
  styleOverride?: React.CSSProperties; //override MUI inline/default styling
  optionsArray: { displayText: string; value: number }[]; //array that holds select options display strings and internal values
  value: string; //controling react state
  onChange: (event: SelectChangeEvent) => void; //callback function to handle change
}

const DropDownInput = forwardRef(({ label, optionsArray, value, onChange, disabled = false, styleOverride = {} }: IProps, ref) => {
  const [error, setError] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    () => {
      return { setError, value }; //Expose error state setter and value reference to parent for simultaneous form validation
    },
    [value]
  );

  const DEFAULT_COMPONENT_STYLE = { width: '9rem', marginLeft: '1rem' };

  function handleChange(e: SelectChangeEvent<string>) {
    setError(false);
    onChange(e);
  }

  useEffect(() => {
    if (value !== '') {
      setError(false);
    }
  }, [value]);

  return (
    <FormControl sx={{ ...DEFAULT_COMPONENT_STYLE, ...styleOverride }} size="small">
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        error={error}
        value={value}
        onChange={(e) => handleChange(e)}
        disabled={disabled}
        input={<OutlinedInput label={label} />}
        size="small"
        labelId="select-label"
      >
        {optionsArray.map((item) => {
          return (
            <MenuItem value={item.value} key={item.value}>
              {item.displayText}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
});

export default DropDownInput;
