import { createContext, useState, useContext } from 'react';

export interface UserInputs {
  principal: string;
  setPrincipal: React.Dispatch<React.SetStateAction<string>>;
  numberOfInstallments: string;
  setNumberOfInstallments: React.Dispatch<React.SetStateAction<string>>;
  interestRate: string;
  setInterestRate: React.Dispatch<React.SetStateAction<string>>;
  paymentInterval: number;
  setPaymentInterval: React.Dispatch<React.SetStateAction<number>>;
  compoundingPeriod: number;
  setCompoundingPeriod: React.Dispatch<React.SetStateAction<number>>;
  kkdfRate: string;
  setKkdfRate: React.Dispatch<React.SetStateAction<string>>;
  bsmvRate: string;
  setBsmvRate: React.Dispatch<React.SetStateAction<string>>;
}

const UserInputsContext = createContext<UserInputs | undefined>(undefined);

function useUserInputsContext() {
  const context = useContext(UserInputsContext);
  if (context === undefined) {
    throw new Error('context is undefined');
  }
  return context;
}

interface IProps {
  children: JSX.Element;
}

const UserInputsContextProvider = ({ children }: IProps) => {
  const [principal, setPrincipal] = useState<string>('100000');
  const [numberOfInstallments, setNumberOfInstallments] = useState<string>('12');
  const [interestRate, setInterestRate] = useState<string>('0.0228');
  const [paymentInterval, setPaymentInterval] = useState<number>(30);
  const [compoundingPeriod, setCompoundingPeriod] = useState<number>(30);
  const [kkdfRate, setKkdfRate] = useState<string>('0.15');
  const [bsmvRate, setBsmvRate] = useState<string>('0.10');

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
