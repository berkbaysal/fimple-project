import { TextField, InputAdornment } from '@mui/material';
import { forwardRef, useState, useImperativeHandle } from 'react';
import { useDisabledComponentsContext } from '../context/DisabledComponentsContext';

interface IProps {
  label?: string; //optional label for input field
  controlled?: boolean; //allow control of disabled state of the instance from global context
  value: string; //controling react state
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; //callback function to handle change
}

const InterestInput = forwardRef(({ label, value, onChange, controlled }: IProps, ref) => {
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
    const validInput: RegExp = /^\d+\.?\d*$|^\d*$/; //regex validation for a decimal number

    if (e.target.value.match(validInput)) {
      onChange(e);
      return;
    } else {
      return;
    }
  }

  console.log(error);
  return (
    <>
      <TextField
        disabled={controlled && isDisabled}
        error={error}
        value={value}
        size="small"
        onChange={handleInput}
        variant="outlined"
        sx={{ width: '8rem', margin: '1rem 0', fontSize: '0.85rem' }}
        label={label ? label : ''}
        InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
      ></TextField>
    </>
  );
});

export default InterestInput;
