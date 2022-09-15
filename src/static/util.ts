import { Installment } from '../context/ResultsContext';
import { UserInputs } from '../context/UserInputsContext';

//INTERNAL FUNCTIONS

function calculateEffectiveInterestRate(userInputs: UserInputs): string {
  const effectiveInterestRate = (
    parseFloat(calculateInterestRatePerPeriod(userInputs)) *
    (1 + (parseFloat(userInputs.kkdfRate) / 100 + parseFloat(userInputs.bsmvRate) / 100))
  ).toFixed(5);
  console.log(effectiveInterestRate);
  return effectiveInterestRate;
}

function calculateInterestRatePerPeriod(userInputs: UserInputs): string {
  const timeScale = parseFloat(userInputs.paymentInterval) / parseFloat(userInputs.interestRatePeriod);
  const interestRate = (parseFloat(userInputs.interestRate) / 100) * timeScale;
  const compoundsPerPayment = userInputs.complexCompoundingEnabled
    ? parseInt(userInputs.paymentInterval) / parseInt(userInputs.compoundingPeriod)
    : 1;
  return (Math.pow(1 + interestRate / compoundsPerPayment, compoundsPerPayment) - 1).toFixed(5);
}

const calculateInterest = (remainingPrincipal: string, userInputs: UserInputs): string => {
  const interestRatePerPeriod = calculateInterestRatePerPeriod(userInputs);
  return (parseFloat(remainingPrincipal) * (1 + parseFloat(interestRatePerPeriod)) - parseFloat(remainingPrincipal)).toFixed(2);
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
    const kkdfPayment = (parseFloat(interestPayment) * parseFloat(userInputs.kkdfRate)).toFixed(2);
    const bsmvPayment = (parseFloat(interestPayment) * parseFloat(userInputs.bsmvRate)).toFixed(2);
    let principalPayment = (parseFloat(payment) - (parseFloat(interestPayment) + parseFloat(kkdfPayment) + parseFloat(bsmvPayment))).toFixed(2);
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
      interestPayment: interestPayment,
      kkdfPayment: kkdfPayment,
      bsmvPayment: bsmvPayment,
    });

    currentDebt = remainingPrincipal;
  }
  return paymentTable;
};

export const getTotalPayment = (paymentTable: Installment[]) => {
  return paymentTable[0]?.payment;
  //return paymentTable.reduce((prevValue, currentValue) => prevValue + parseFloat(currentValue.payment), 0).toFixed(2);
};
