import { UserInputs } from '../context/UserInputsContext';

//INTERNAL FUNCTIONS

function calculateEffectiveInterestRate(userInputs: UserInputs): string {
  const effectiveInterestRate = (
    parseFloat(calculateInterestRatePerPeriod(userInputs)) *
    (1 + (parseFloat(userInputs.kkdfRate) + parseFloat(userInputs.bsmvRate)))
  ).toFixed(5);
  return effectiveInterestRate;
}

function calculateInterestRatePerPeriod(userInputs: UserInputs): string {
  const interestRate = parseFloat(userInputs.interestRate);
  const compoundsPerPayment = parseInt(userInputs.paymentInterval) / parseInt(userInputs.compoundingPeriod);

  return (Math.pow(1 + interestRate / compoundsPerPayment, compoundsPerPayment) - 1).toFixed(5);
}

//EXPORTED FUNCTIONS

export const calculateInterest = (remainingPrincipal: string, userInputs: UserInputs): string => {
  const interestRatePerPeriod = calculateInterestRatePerPeriod(userInputs);
  return (parseFloat(remainingPrincipal) * (1 + parseFloat(interestRatePerPeriod)) - parseFloat(remainingPrincipal)).toFixed(2);
};

export const calculatePaymentPerInterval = (userInputs: UserInputs): string => {
  const effectiveInterestRate = parseFloat(calculateEffectiveInterestRate(userInputs));
  const numberOfInstallments = parseFloat(userInputs.numberOfInstallments);
  const principal = parseFloat(userInputs.principal);

  return (
    principal *
    ((effectiveInterestRate * Math.pow(1 + effectiveInterestRate, numberOfInstallments)) /
      (Math.pow(1 + effectiveInterestRate, numberOfInstallments) - 1))
  ).toFixed(2);
};
