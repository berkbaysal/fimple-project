import { createContext, useState, useContext } from 'react';

interface UserInputs {
  principal: string;
  setPrincipal: React.Dispatch<React.SetStateAction<string>>;
  numberOfInstallments: string;
  setNumberOfInstallments: React.Dispatch<React.SetStateAction<string>>;
  interestRate: string;
  setInterestRate: React.Dispatch<React.SetStateAction<string>>;
  paymentInterval: string;
  setPaymentInterval: React.Dispatch<React.SetStateAction<string>>;
  compoundingPeriod: string;
  setCompoundingPeriod: React.Dispatch<React.SetStateAction<string>>;
  kkdfRate: string;
  setKkdfRate: React.Dispatch<React.SetStateAction<string>>;
  bsmvRate: string;
  setBsmvRate: React.Dispatch<React.SetStateAction<string>>;
}

const UserInputsContext = createContext<UserInputs | undefined>(undefined);

function useUserInputsContext() {
  const context = useContext(UserInputsContext);
  if (context === undefined) {
    throw new Error('UserInputsContext is undefined');
  }
  return context;
}

interface IProps {
  children: JSX.Element;
}

const UserInputsContextProvider = ({ children }: IProps) => {
  const [principal, setPrincipal] = useState<string>('');
  const [numberOfInstallments, setNumberOfInstallments] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [paymentInterval, setPaymentInterval] = useState<string>('');
  const [compoundingPeriod, setCompoundingPeriod] = useState<string>('');
  const [kkdfRate, setKkdfRate] = useState<string>('');
  const [bsmvRate, setBsmvRate] = useState<string>('');

  return (
    <UserInputsContext.Provider
      value={{
        principal: principal,
        setPrincipal: setPrincipal,
        numberOfInstallments: numberOfInstallments,
        setNumberOfInstallments: setNumberOfInstallments,
        interestRate: interestRate,
        setInterestRate: setInterestRate,
        paymentInterval: paymentInterval,
        setPaymentInterval: setPaymentInterval,
        kkdfRate: kkdfRate,
        setKkdfRate: setKkdfRate,
        bsmvRate: bsmvRate,
        setBsmvRate: setBsmvRate,
        compoundingPeriod: compoundingPeriod,
        setCompoundingPeriod: setCompoundingPeriod,
      }}
    >
      {children}
    </UserInputsContext.Provider>
  );
};

export { useUserInputsContext, UserInputsContextProvider };
