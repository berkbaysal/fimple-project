import { createContext, useState, useContext } from 'react';

export interface Installment {
  payment: string;
  principalPayment: string;
  remainingPrincipal: string;
  interestPayment: string;
  kkdfPayment: string;
  bsmvPayment: string;
}

export interface ResultsState {
  paymentTable: Installment[];
  setPaymentTable: React.Dispatch<React.SetStateAction<Installment[]>>;
}

interface IProps {
  children: JSX.Element;
}

const ResultsContext = createContext<ResultsState | undefined>(undefined);

function useResultsContext() {
  const context = useContext(ResultsContext);
  if (context === undefined) {
    throw new Error('ResultsContext is undefined');
  }
  return context;
}

const ResultsContextProvider = ({ children }: IProps) => {
  const [paymentTable, setPaymentTable] = useState<Installment[]>([]);
  return <ResultsContext.Provider value={{ paymentTable: paymentTable, setPaymentTable: setPaymentTable }}>{children}</ResultsContext.Provider>;
};

export { useResultsContext, ResultsContextProvider };
