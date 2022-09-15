import { createContext, useState, useContext } from 'react';

interface Results {
  totalPayback: string;
  monthlyPayment: string;
  totalTax: string;
}

export interface ResultsState {
  results: Results;
  setResults: React.Dispatch<React.SetStateAction<Results>>;
}

const INITIAL_STATE = {
  totalPayback: '',
  monthlyPayment: '',
  totalTax: '',
};

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
  const [results, setResults] = useState<Results>(INITIAL_STATE);
  return <ResultsContext.Provider value={{ results: results, setResults: setResults }}>{children}</ResultsContext.Provider>;
};

export { useResultsContext, ResultsContextProvider };
