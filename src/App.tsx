import style from './styles/App.module.css';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import PaymentTable from './components/PaymentTable';

function App() {
  return (
    <div className={style.appContainer}>
      <div className={style.uiWrapper}>
        <div className={style.inputFormWrapper}>
          <InputForm />
        </div>
        <div className={style.resultDisplayWrapper}>
          <ResultDisplay />
        </div>
      </div>
      <PaymentTable headers={['Taksit No', 'Taksit Tutarı', 'Ödenen Ana Para', 'Kalan Ana Para', 'Ödenen Faiz', 'KKDF', 'BSMV']} />
    </div>
  );
}

export default App;
