import { Select, MenuItem, SelectChangeEvent, OutlinedInput, InputLabel, FormControl } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useDisabledComponentsContext } from '../context/DisabledComponentsContext';

interface IProps {
  label?: string; //optional label for initial display
  controlled?: boolean; //allow control of disabled state of the instance from global context
  styleOverride?: React.CSSProperties; //override MUI inline/default styling
  optionsArray: { displayText: string; value: number }[]; //array that holds select options display strings and internal values
  value: string; //controling react state
  onChange: (event: SelectChangeEvent) => void; //callback function to handle change
}

const DropDownInput = forwardRef(({ label, optionsArray, value, onChange, controlled, styleOverride = {} }: IProps, ref) => {
  const [error, setError] = useState<boolean>(false);
  const isDisabled = useDisabledComponentsContext().isDisabled;

  useImperativeHandle(
    ref,
    () => {
      return { setError }; //Expose error state setter to parent for simultaneous form validation
    },
    []
  );

  function handleChange(e: SelectChangeEvent<string>) {
    setError(false);
    onChange(e);
  }

  return (
    <FormControl sx={{ minWidth: '9rem', margin: '0.5rem 0', ...styleOverride }} size="small">
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        error={error}
        value={value}
        onChange={(e) => handleChange(e)}
        disabled={controlled && !isDisabled}
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
