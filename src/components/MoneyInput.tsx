import { TextField, InputAdornment } from '@mui/material';
import { forwardRef, useState, useImperativeHandle } from 'react';
import { useDisabledComponentsContext } from '../context/DisabledComponentsContext';

interface IProps {
  label?: string; //optional label for input field
  helperText?: string; //sub text for input field
  controlled?: boolean; //allow control of disabled state of the instance from global context
  styleOverride?: React.CSSProperties; //override MUI inline/default styling
  currencyOverwrite?: string; //allow currency abbreviation or symbol to be overwritten, (DEFAULTS TO TURKISH LIRA (₺))
  value: string; //controling react state
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; //callback function to handle change
}

const InterestInput = forwardRef(
  ({ label, value, onChange, controlled, helperText = ' ', currencyOverwrite = '₺', styleOverride = {} }: IProps, ref) => {
    const [error, setError] = useState<boolean>(false); //internal error state to be controlled by the parent
    const [isFocused, setIsFocused] = useState(false);
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

    const DEFAULT_COMPONENT_STYLE = { marginLeft: '1rem' };

    return (
      <>
        <TextField
          disabled={controlled && isDisabled}
          error={error}
          value={value}
          size="small"
          onChange={handleInput}
          variant="outlined"
          sx={{ ...DEFAULT_COMPONENT_STYLE, ...styleOverride }}
          label={label ? label : ''}
          helperText={helperText ? helperText : ''}
          InputProps={{ endAdornment: value !== '' || isFocused ? <InputAdornment position="end">{currencyOverwrite}</InputAdornment> : <></> }}
          onBlur={(e) => setIsFocused(false)}
          onFocus={(e) => setIsFocused(true)}
        ></TextField>
      </>
    );
  }
);

export default InterestInput;
