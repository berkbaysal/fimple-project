import { TextField } from '@mui/material';
import { forwardRef, useState, useImperativeHandle } from 'react';
import { useDisabledComponentsContext } from '../context/DisabledComponentsContext';

interface IProps {
  label?: string; //optional label for input field
  helperText?: string; //sub text for input field
  controlled?: boolean; //allow control of disabled state of the instance from global context
  styleOverride?: React.CSSProperties; //override MUI inline/default styling
  value: string; //controling react state
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; //callback function to handle change
}

const InterestInput = forwardRef(({ label, value, onChange, controlled, helperText = ' ', styleOverride = {} }: IProps, ref) => {
  const [error, setError] = useState<boolean>(false); //internal error state to be controlled by the parent
  const isDisabled = useDisabledComponentsContext().isDisabled;

  useImperativeHandle(
    ref,
    () => {
      return { setError }; //Expose error state setter to parent for simultaneous form validation
    },
    []
  );

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
        disabled={controlled && isDisabled}
        error={error}
        value={value}
        size="small"
        onChange={handleInput}
        variant="outlined"
        sx={{ width: '9rem', margin: '0.5rem 0', fontSize: '0.85rem', ...styleOverride }}
        label={label ? label : ''}
        helperText={helperText}
      ></TextField>
    </>
  );
});

export default InterestInput;
