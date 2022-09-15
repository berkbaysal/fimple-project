import { TextField } from '@mui/material';
import { forwardRef, useState, useImperativeHandle } from 'react';

interface IProps {
  label?: string; //optional label for input field
  helperText?: string; //sub text for input field
  disabled?: boolean; //allow control of disabled state of the instance
  styleOverride?: React.CSSProperties; //override MUI inline/default styling
  value: string; //controling react state
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; //callback function to handle change
}

const InterestInput = forwardRef(({ label, value, onChange, disabled = false, helperText = ' ', styleOverride = {} }: IProps, ref) => {
  const [error, setError] = useState<boolean>(false); //internal error state to be controlled by the parent

  useImperativeHandle(
    ref,
    () => {
      return { setError }; //Expose error state setter to parent for simultaneous form validation
    },
    []
  );

  const DEFAULT_COMPONENT_STYLE = { width: '9rem', marginLeft: '1rem' };

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const validInput: RegExp = /^\d*$/; //regex validation for a integer number
    if (e.target.value.match(validInput)) {
      onChange(e);
      return;
    } else {
      return;
    }
  }

  return (
    <>
      <TextField
        disabled={disabled}
        error={error}
        value={value}
        size="small"
        onChange={handleInput}
        variant="outlined"
        sx={{ ...DEFAULT_COMPONENT_STYLE, ...styleOverride }}
        label={label ? label : ''}
        helperText={helperText}
      ></TextField>
    </>
  );
});

export default InterestInput;
