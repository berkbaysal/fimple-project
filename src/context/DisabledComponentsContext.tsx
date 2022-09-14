import { createContext, useState, useContext } from 'react';

interface DisabledComponents {
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisabledComponentsContext = createContext<DisabledComponents | undefined>(undefined);

function useDisabledComponentsContext() {
  const context = useContext(DisabledComponentsContext);
  if (context === undefined) {
    throw new Error('DisabledComponentsContext is undefined');
  }
  return context;
}

interface IProps {
  children: JSX.Element;
}
const DisabledComponentsContextProvider = ({ children }: IProps) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  return (
    <DisabledComponentsContext.Provider value={{ isDisabled: isDisabled, setIsDisabled: setIsDisabled }}>
      {children}
    </DisabledComponentsContext.Provider>
  );
};

export { useDisabledComponentsContext, DisabledComponentsContextProvider };
