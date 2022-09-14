import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useDisabledComponentsContext } from '../context/DisabledComponentsContext';

interface IProps {
  label?: string;
  controlled?: boolean;
  optionsArray: { displayText: string; value: string }[]; //array that holds select options display strings and internal values
  value: string; //controling react state
  onChange: (event: SelectChangeEvent) => void; //callback function to handle change
}

const DropDownInput = ({ label, optionsArray, value, onChange, controlled }: IProps) => {
  const isDisabled = useDisabledComponentsContext().isDisabled;

  return (
    <Select value={value} onChange={onChange} label={label ? label : ''} disabled={controlled && isDisabled}>
      {optionsArray.map((item) => {
        return (
          <MenuItem value={item.value} key={item.value}>
            {item.displayText}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default DropDownInput;
