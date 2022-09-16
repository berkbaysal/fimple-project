import { Installment } from '../context/ResultsContext';
import { UserInputs } from '../context/UserInputsContext';

//INTERNAL FUNCTIONS

function calculateEffectiveInterestRate(userInputs: UserInputs): string {
  const effectiveInterestRate = (
    parseFloat(calculateInterestRatePerPeriod(userInputs)) *
    (1 + (parseFloat(userInputs.kkdfRate) / 100 + parseFloat(userInputs.bsmvRate) / 100))
  ).toFixed(10);
  return effectiveInterestRate;
}

function calculateInterestRatePerPeriod(userInputs: UserInputs): string {
  const timeScale = parseInt(userInputs.paymentInterval) / parseInt(userInputs.interestRatePeriod);
  const interestRate = (parseFloat(userInputs.interestRate) / 100) * timeScale;
  const compoundsPerPayment = userInputs.complexCompoundingEnabled
    ? parseInt(userInputs.paymentInterval) / parseInt(userInputs.compoundingPeriod)
    : 1;
  return (Math.pow(1 + interestRate / compoundsPerPayment, compoundsPerPayment) - 1).toFixed(10);
}

const calculateInterest = (remainingPrincipal: string, userInputs: UserInputs): number => {
  //returned as number and converted to string afterwards to increase accuracy while preventing error carry-over.
  const interestRatePerPeriod = calculateInterestRatePerPeriod(userInputs);
  return parseFloat(remainingPrincipal) * (1 + parseFloat(interestRatePerPeriod)) - parseFloat(remainingPrincipal);
};

const calculatePaymentPerInterval = (userInputs: UserInputs): string => {
  const effectiveInterestRate = parseFloat(calculateEffectiveInterestRate(userInputs));
  const numberOfInstallments = parseFloat(userInputs.numberOfInstallments);
  const principal = parseFloat(userInputs.principal);

  return (
    principal *
    ((effectiveInterestRate * Math.pow(1 + effectiveInterestRate, numberOfInstallments)) /
      (Math.pow(1 + effectiveInterestRate, numberOfInstallments) - 1))
  ).toFixed(2);
};

//EXPORTED FUNCTIONS

export const constructPaymentTable = (userInputs: UserInputs): Installment[] => {
  let paymentTable: Installment[] = [];
  let currentDebt = userInputs.principal;
  let payment = calculatePaymentPerInterval(userInputs);

  for (let i = 0; i < parseInt(userInputs.numberOfInstallments); i++) {
    const interestPayment = calculateInterest(currentDebt, userInputs);
    const kkdfPayment = ((interestPayment * parseFloat(userInputs.kkdfRate)) / 100).toFixed(2);
    const bsmvPayment = ((interestPayment * parseFloat(userInputs.bsmvRate)) / 100).toFixed(2);
    let principalPayment = (parseFloat(payment) - (interestPayment + parseFloat(kkdfPayment) + parseFloat(bsmvPayment))).toFixed(2);
    let remainingPrincipal = (parseFloat(currentDebt) - parseFloat(principalPayment)).toFixed(2);

    if (i + 1 === parseInt(userInputs.numberOfInstallments)) {
      payment = (parseFloat(remainingPrincipal) + parseFloat(payment)).toFixed(2);
      principalPayment = (parseFloat(remainingPrincipal) + parseFloat(principalPayment)).toFixed(2);
      remainingPrincipal = (0).toFixed(2);
    }

    paymentTable.push({
      payment: payment,
      principalPayment: principalPayment,
      remainingPrincipal: remainingPrincipal,
      interestPayment: interestPayment.toFixed(2),
      kkdfPayment: kkdfPayment,
      bsmvPayment: bsmvPayment,
    });

    currentDebt = remainingPrincipal;
  }
  return paymentTable;
};

export const getTotalPayment = (paymentTable: Installment[]) => {
  return paymentTable.length > 0 ? paymentTable.reduce((prevValue, currentValue) => prevValue + parseFloat(currentValue.payment), 0).toFixed(2) : '';
};
export const getPaymentPerInstallment = (paymentTable: Installment[]) => {
  return paymentTable[0] ? paymentTable[0].payment : '';
};
export const getTotalKkdf = (paymentTable: Installment[]) => {
  return paymentTable.length > 0
    ? paymentTable.reduce((prevValue, currentValue) => prevValue + parseFloat(currentValue.kkdfPayment), 0).toFixed(2)
    : '';
};
export const getTotalBsmv = (paymentTable: Installment[]) => {
  return paymentTable.length > 0
    ? paymentTable.reduce((prevValue, currentValue) => prevValue + parseFloat(currentValue.bsmvPayment), 0).toFixed(2)
    : '';
};
export function formatCurrency(value: string) {
  const formatter = new Intl.NumberFormat('de-DE');
  return formatter.format(parseFloat(value));
}
