import style from './styles/App.module.css';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';

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
    </div>
  );
}

export default App;
